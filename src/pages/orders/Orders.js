import { DotLoader } from "react-spinners";
import { useSelector } from "react-redux";

import Order from "../../components/order/Order";
import { ordersSelector } from "../../redux/reducers/ordersReducer";

const Orders = () => {
  const { orders, loading } = useSelector(ordersSelector);

  if (loading) {
    return (
      <div className="pageLoader">
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
      <div className="m-4 text-xl text-center">
        <h2>No orders found!</h2>
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-start items-center flex-col">
      <h1>Your Orders</h1>
      {orders.map((order) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
};

export default Orders;
