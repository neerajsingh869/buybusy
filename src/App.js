import './App.css';
import { app } from "./configs/firebase";
import { 
  createRoutesFromElements, 
  createBrowserRouter, 
  RouterProvider,
  Route
} from "react-router-dom";
import Navbar from './components/nav/Navbar';
import Page404 from './pages/error/Page404';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Orders from './pages/orders/Orders';
import Cart from './pages/cart/Cart';
import PrivateRoute from './components/secure/PrivateRoute';
// import CustomUserAuthContextProvider from './contexts/userAuthContext';
import CustomCartContextProvider from './contexts/cartContext';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelector } from './redux/reducers/userReducer';
import { getInitialOrdersAsync } from './redux/reducers/ordersReducer';

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={ <Navbar /> } errorElement={ <Page404 /> }>
      <Route index={ true } element={ <Home /> } />
      <Route path="signin" element={ <Login /> } />
      <Route path="signup" element={ <Register /> } />
      <Route path="myorders" element={ 
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
       } />
       <Route path="cart" element={ 
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
       } />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <CustomCartContextProvider>
        <Init />
        <RouterProvider router={ router } />
    </CustomCartContextProvider>
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
            // setIsSignedIn(true);
            // setUserUid(user.uid);
            // dispatch(userActions.changeSignedInStatus(true));
            dispatch(userActions.updateUserUid(user.uid));
        }});
  }, [auth, dispatch]);

  useEffect(() => {
    if (userUid) {
      dispatch(getInitialOrdersAsync(userUid));
    }
  }, [userUid, dispatch]);
}

export default App;
