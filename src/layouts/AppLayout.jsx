import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CartDrawer from "../components/CartDrawer";

const AppLayout = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to={"login"} replace />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <CartDrawer />
    </>
  );
};

export default AppLayout;
