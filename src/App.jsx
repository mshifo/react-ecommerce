import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import LoginPage from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import CookieService from "./services/CookieService";

const App = () => {
  const token = CookieService.get('jwt')
  return (
    <>
      <Routes>
        <Route element={<AppLayout isLoggedIn={token} />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<ProductsPage />} path="/products" />
          <Route element={<ProductPage />} path="/products/:id" />
          <Route element={<AboutPage />} path="/about" />
        </Route>

        <Route element={<LoginPage isLoggedIn={token} />} path="/login" />
      </Routes>
    </>
  );
};

export default App;