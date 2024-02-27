import { createContext, useContext, useState } from "react";

const productContext = createContext();

const useProductContextValue = () => {
    return useContext(productContext);
}

const CustomProductContext = ({ children }) => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {const isCartExists = cart.find(item => item.id === product.id);
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
    }

    const handleRemoveFromCart = (product) => {

    }

    return (
        <productContext.Provider value={{ cart, setCart, handleAddToCart, handleRemoveFromCart }}>
            { children }
        </productContext.Provider>
    )
}

export { useProductContextValue };
export default CustomProductContext;