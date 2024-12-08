import { useEffect, useRef } from "react";
import { DotLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Order from "../../components/order/Order";
import { ordersSelector } from "../../redux/reducers/ordersReducer";
import { userSelector } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";

const Orders = () => {
  const { orders, loading } = useSelector(ordersSelector);
  const { userUid } = useSelector(userSelector);

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

  if (loading) {
    return (
      <div className="pageLoader flex-1 flex items-center justify-center">
        <DotLoader
          color="#7064e5"
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
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
    <div className="p-8 flex justify-start items-center flex-col">
      <h1 className="text-2xl font-bold dark:text-white">Your Orders</h1>
      {orders.map((order) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
};

export default Orders;
