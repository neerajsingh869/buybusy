import { app } from "./configs/firebase";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/nav/Navbar";
import Page404 from "./pages/error/Page404";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Orders from "./pages/orders/Orders";
import PrivateRoute from "./components/secure/PrivateRoute";
import { userActions, userSelector } from "./redux/reducers/userReducer";
import { getInitialOrdersAsync } from "./redux/reducers/ordersReducer";
import { getInitialCartAsync } from "./redux/reducers/cartReducer";
import NonPrivateRoute from "./components/secure/NonPrivateRoute";
import Loader from "./components/loader/Loader";

const Cart = lazy(() => import("./pages/cart/Cart"));

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Navbar />} errorElement={<Page404 />}>
      <Route index={true} element={<Home />} />
      <Route 
        path="signin" 
        element={
          <NonPrivateRoute>
            <Login />
          </NonPrivateRoute>
        } 
      />
      <Route 
        path="signup" 
        element={
          <NonPrivateRoute>
            <Register />
          </NonPrivateRoute>
        } 
      />
      <Route
        path="myorders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="cart"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </PrivateRoute>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <Init />
      <RouterProvider router={router} />
    </>
  );
}

function Init() {
  // representation of authenticated user
  const auth = getAuth();

  const dispatch = useDispatch();
  const { userUid } = useSelector(userSelector);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(userActions.updateUserUid(user.uid));
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (userUid) {
        dispatch(getInitialCartAsync(userUid));
      }
    };

    fetchData();
  }, [userUid, dispatch]);

  useEffect(() => {
    if (userUid) {
      dispatch(getInitialOrdersAsync(userUid));
    }
  }, [userUid, dispatch]);
}

export default App;
