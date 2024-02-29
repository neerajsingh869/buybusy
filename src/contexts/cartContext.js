import { createContext, useContext, useState } from "react";

const cartContext = createContext();

const useCartContextValue = () => {
    return useContext(cartContext);
}

const CustomCartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

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

    }

    const handleRemoveFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);

        setCart(updatedCart);
    }

    const incrementCartProductCount = (product) => {
        const updatedCart = cart.map(item => {
            if (item.id === product.id) {
                item.qty++;
            }
            return item;
        });

        setCart(updatedCart);
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
    }

    const resetCartPage = () => {
        setCart([]);
    }
    
    return (
        <cartContext.Provider value={{ cart, 
                                            handleAddToCart, 
                                            handleRemoveFromCart,
                                            incrementCartProductCount,
                                            decrementCartProductCount,
                                            total,
                                            resetCartPage }}>
            { children }
        </cartContext.Provider>
    )
}

export { useCartContextValue };
export default CustomCartContextProvider;