import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Order from "../components/Order";
import { ordersSelector } from "../redux/slices/ordersSlice";
import { userSelector } from "../redux/slices/userSlice";
import { showNotification } from "../utility/showNotifications";
import { useAppSelector } from "../hook";
import OrderSkeleton from "../components/OrderSkeleton";

const Orders = () => {
  const { orders, loading } = useAppSelector(ordersSelector);
  const { userUid } = useAppSelector(userSelector);

  const navigate = useNavigate();
  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (!hasRunEffect.current) {
      if (!userUid) {
        showNotification("Please Sign in or Sign up to view your Orders.");
        navigate("/signin");
      }
      hasRunEffect.current = true;
    }
  }, [userUid, navigate]);

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
