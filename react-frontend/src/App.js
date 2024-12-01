import React from "react";
import CategoriesList from "./component/CategoriesList";
import AddCategory from "./component/AddCategory";
import Home from "./component/Home";
import Shop from "./component/Shop";
import ProductDetails from "./component/ProductDetails";
import Login from "./component/Login";
import Register from "./component/Register";
import OrderHistory from "./component/OrderHistory";
import Cart from "./component/Cart";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

const App = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddCategory />
      <CategoriesList />
      <Home />
      <Shop />
      <ProductDetails productId={1} /> {/* Pass the desired product ID */}
      <h1>Auth System</h1>
      <Login />
      <Register />
      <h1>Order Management</h1>
      <OrderHistory />
      <h1>Burikantu Shop</h1>
      <Cart />
      <h1>Burikantu Shop Password Reset</h1>
      <ForgotPassword />
      <hr />
      <ResetPassword />
    </div>
  );
};

export default App;
