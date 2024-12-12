import { app } from "./configs/firebase";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/nav/Navbar";
import Page404 from "./pages/error/Page404";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Orders from "./pages/orders/Orders";
import { userActions, userSelector } from "./redux/reducers/userReducer";
import { getInitialOrdersAsync } from "./redux/reducers/ordersReducer";
import { getInitialCartAsync } from "./redux/reducers/cartReducer";
import NonPrivateRoute from "./components/secure/NonPrivateRoute";
import Loader from "./components/loader/Loader";
import { useAppDispatch, useAppSelector } from "./hook";

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
