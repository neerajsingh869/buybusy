import Order from "../../components/order/Order";
import { useOrdersContextValue } from "../../contexts/ordersContext";
import styles from "./Orders.module.css";
import { DotLoader } from "react-spinners";

const Orders = () => {
    const { orders, loading } = useOrdersContextValue();

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
        )
    }

    if (orders.length === 0) {
        return (
            <div className={ styles.emptyOrdersPage }>
                <h2>No orders found!</h2>
            </div>
        )
    }

    return (
        <div className={ styles.ordersContainer }>
            <h1>Your Orders</h1>
            {
                orders.map(order => {
                    return (
                        <Order key={ order.id } order={ order } />
                    )
                })
            }
        </div>
    )
};

export default Orders;