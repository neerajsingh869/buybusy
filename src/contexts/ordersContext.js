import { createContext, useContext, useState } from "react";
import { useCartContextValue } from "./cartContext";

const ordersContext = createContext();

const useOrdersContextValue = () => {
    return useContext(ordersContext);
}

const CustomOrdersContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const { total, resetCartPage } = useCartContextValue();

    const purchaseProductsFromCart = (cart) => {
        const orderToPlace = {
            id: new Date().getTime(),
            orderedOn: new Date().toISOString().split('T')[0],
            products: [
                ...cart
            ],
            totalPrice: total
        };

        const newOrders = [
            orderToPlace, 
            ...orders
        ];

        console.log(newOrders);

        setOrders(newOrders);
        resetCartPage();
    }
    
    return (
        <ordersContext.Provider value={{ purchaseProductsFromCart, orders }}>
            { children }
        </ordersContext.Provider>
    )
}

export { useOrdersContextValue };
export default CustomOrdersContextProvider;