import './App.css';
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

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={ <Navbar /> } errorElement={ <Page404 /> }>
      <Route index={ true } element={ <Home /> } />
      <Route path="signin" element={ <Login /> } />
      <Route path="signup" element={ <Register /> } />
      <Route path="myorders" element={ <Orders /> } />
      <Route path="cart" element={ <Cart /> } />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={ router } />
  );
}

export default App;
