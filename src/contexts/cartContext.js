import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../configs/firebase";
import { useUserAuthContextValue } from "./userAuthContext";

const cartContext = createContext();

const useCartContextValue = () => {
    return useContext(cartContext);
}

const CustomCartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
    const { userUid } = useUserAuthContextValue();

    useEffect(() => {
        const fetchData = async () => {
            if (userUid) {
                const docRef = doc(db, "usersCarts", userUid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCart(docSnap.data().cart);
                } else {
                    // docSnap.data() will be undefined in this case
                    setCart([]);
                }
            }
        }

        fetchData();
    }, [userUid]);

    const handleAddToCart = async (product) => {
        const isCartExists = cart.find(item => item.id === product.id);

        if (isCartExists) {
            const updatedCart = cart.map(item => {
                if (item.id === isCartExists.id) {
                    item.qty++;
                }
                return item;
            });

            setCart(updatedCart);

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        } else {
            const cartProduct = {
                ...product,
                qty: 1
            };

            const updatedCart = [cartProduct, ...cart];

            setCart(updatedCart);

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        }

    }

    const handleRemoveFromCart = async (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);

        setCart(updatedCart);

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const incrementCartProductCount = async (product) => {
        const updatedCart = cart.map(item => {
            if (item.id === product.id) {
                item.qty++;
            }
            return item;
        });

        setCart(updatedCart);

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const decrementCartProductCount = async (product) => {
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

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const resetCartPage = async () => {
        setCart([]);
        
        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: []
        });
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