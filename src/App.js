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
import CustomUserAuthContextProvider from './contexts/userAuthContext';
import CustomCartContextProvider from './contexts/cartContext';
import CustomOrdersContextProvider from './contexts/ordersContext';

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
    <CustomUserAuthContextProvider>
      <CustomCartContextProvider>
        <CustomOrdersContextProvider>
          <RouterProvider router={ router } />
        </CustomOrdersContextProvider>
      </CustomCartContextProvider>
    </CustomUserAuthContextProvider>
  );
}

export default App;
