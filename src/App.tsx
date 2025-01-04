import { app } from "./configs/firebase";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import { userActions, userSelector } from "./redux/slices/userSlice";
import { getInitialOrdersAsync } from "./redux/slices/ordersSlice";
import { getInitialCartAsync } from "./redux/slices/cartSlice";
import NonPrivateRoute from "./components/NonPrivateRoute";
import Loader from "./components/Loader";
import { useAppDispatch, useAppSelector } from "./hook";
import ForgotPassword from "./pages/ForgotPassword";

const Cart = lazy(() => import("./pages/Cart"));

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
        path="forgot-password"
        element={
          <NonPrivateRoute>
            <ForgotPassword />
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
      <Route path="myorders" element={<Orders />} />
      <Route
        path="cart"
        element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
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

  const dispatch = useAppDispatch();
  const { userUid } = useAppSelector(userSelector);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(userActions.updateUserUid(user.uid));
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getInitialCartAsync(userUid));
    };

    fetchData();
  }, [userUid, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getInitialOrdersAsync(userUid));
    };

    fetchData();
  }, [userUid, dispatch]);

  return <></>;
}

export default App;
