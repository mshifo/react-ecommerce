import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios.config'
import { createStandaloneToast } from '@chakra-ui/react'
import CookieService from '../../services/CookieService';

const { toast } = createStandaloneToast();

const initialState = {
  loading: false,
  data: null,
  error: null
}

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
      const { data } = await axiosInstance.post('/auth/local', user)
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 3);
        CookieService.set('jwt', action.payload.jwt, { path: "/", expires: date })
        toast({
          title: "You are now logged in",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        location.href = "/"
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [],
          toast({
            title: action.payload.response.data.error.message,
            description: "Make sure email and password are correct",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
      });
  }
})

export const selectLogin = ({ login }) => login
export default loginSlice.reducer