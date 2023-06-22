import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDrawerOpen: false,
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        openCloseDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen
        },
    }
})

export const { openCloseDrawer } = globalSlice.actions
export const selectGlobal = ({ global }) => global
export default globalSlice.reducer