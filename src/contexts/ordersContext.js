import { createContext, useContext, useEffect, useState } from "react";
import { useCartContextValue } from "./cartContext";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../configs/firebase";
import { useUserAuthContextValue } from "./userAuthContext";

const ordersContext = createContext();

const useOrdersContextValue = () => {
    return useContext(ordersContext);
}

const CustomOrdersContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const { total, resetCartPage } = useCartContextValue();
    const { userUid } = useUserAuthContextValue();

    useEffect(() => {
        const fetchData = async () => {
            if (userUid) {
                const docRef = doc(db, "usersOrders", userUid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrders(docSnap.data().orders);
                } else {
                    // docSnap.data() will be undefined in this case
                    setOrders([]);
                }
            }
        }

        fetchData();
    }, [userUid]);

    const purchaseProductsFromCart = async (cart) => {
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

        const usersOrdersRef = collection(db, "usersOrders");
        await setDoc(doc(usersOrdersRef, userUid), {
            orders: newOrders
        });

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