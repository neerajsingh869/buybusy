import { createContext, useContext, useState } from "react";

const productContext = createContext();

const useProductContextValue = () => {
    return useContext(productContext);
}

const CustomProductContext = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [orders, setOrders] = useState([]);

    const handleAddToCart = (product) => {
        const isCartExists = cart.find(item => item.id === product.id);

        if (isCartExists) {
            const updatedCart = cart.map(item => {
                if (item.id === isCartExists.id) {
                    item.qty++;
                }
                return item;
            });

            setCart(updatedCart);
        } else {
            const cartProduct = {
                ...product,
                qty: 1
            };

            const updatedCart = [cartProduct, ...cart];

            setCart(updatedCart);
        }

        setTotal(total + product.price);
    }

    const handleRemoveFromCart = (product) => {
        const itemToRemoveFromCart = cart.find(item => item.id === product.id);
        const updatedCart = cart.filter(item => item.id !== product.id);

        setCart(updatedCart);
        setTotal(total - itemToRemoveFromCart.qty * itemToRemoveFromCart.price);
    }

    const incrementCartProductCount = (product) => {
        const updatedCart = cart.map(item => {
            if (item.id === product.id) {
                item.qty++;
            }
            return item;
        });

        setCart(updatedCart);
        setTotal(total + product.price);
    }

    const decrementCartProductCount = (product) => {
        if (product.qty === 1) {
            handleRemoveFromCart(product);
            return;
        }
        
        const updatedCart = cart.map(item => {
            if (item.id === product.id) {
                item.qty--;
            }
            return item;
        });

        setCart(updatedCart);
        setTotal(total - product.price);
    }

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
    }

    return (
        <productContext.Provider value={{ cart, 
                                            setCart, 
                                            handleAddToCart, 
                                            handleRemoveFromCart,
                                            incrementCartProductCount,
                                            decrementCartProductCount,
                                            total,
                                            setTotal,
                                            purchaseProductsFromCart,
                                            orders }}>
            { children }
        </productContext.Provider>
    )
}

export { useProductContextValue };
export default CustomProductContext;