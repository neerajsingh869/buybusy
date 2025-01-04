import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Order from "../components/Order";
import { ordersSelector } from "../redux/slices/ordersSlice";
import { showNotification } from "../utility/showNotifications";
import { useAppSelector } from "../hook";
import OrderSkeleton from "../components/OrderSkeleton";
import { ThemeContext } from "../contexts/themeContext";

const Orders = () => {
  const { orders, loading } = useAppSelector(ordersSelector);

  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthChecked(true);

      if (!user) {
        showNotification(
          "Please Sign in or Sign up to view your Orders.",
          "error",
          theme
        );
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate, theme]);

  // Show loading state while checking auth
  if (!authChecked) {
    return (
      <div className="p-4 sm:p-8 flex justify-start items-center flex-col">
        <h1 className="text-2xl font-bold dark:text-white">Your Orders</h1>
        {[...Array(5)].map((_, index) => (
          <OrderSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="m-4 text-xl text-center dark:text-white">
        <h2>No orders found!</h2>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 flex justify-start items-center flex-col">
      <h1 className="text-2xl font-bold dark:text-white">Your Orders</h1>
      {!loading
        ? orders.map((order) => {
            return <Order key={order.id} order={order} />;
          })
        : [...Array(5)].map((_, index) => <OrderSkeleton key={index} />)}
    </div>
  );
};

export default Orders;
