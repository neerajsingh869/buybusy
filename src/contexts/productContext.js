import { createContext, useContext, useState } from "react";

const productContext = createContext();

const useProductContextValue = () => {
    return useContext(productContext);
}

const CustomProductContext = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    return (
        <productContext.Provider value={{ cart, 
                                            setCart, 
                                            handleAddToCart, 
                                            handleRemoveFromCart,
                                            incrementCartProductCount,
                                            decrementCartProductCount }}>
            { children }
        </productContext.Provider>
    )
}

export { useProductContextValue };
export default CustomProductContext;