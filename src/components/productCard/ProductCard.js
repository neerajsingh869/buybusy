import { useNavigate } from "react-router-dom";
// import { useCartContextValue } from "../../contexts/cartContext";
// import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./ProductCard.module.css";
import plusButtonImage from "../../assets/plus.png";
import minusButtonImage from "../../assets/minus.png";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/userReducer";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";
import toast from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../configs/firebase";

const ProductCard = ({ product, homeOrCart }) => {
    // const { handleAddToCart, handleRemoveFromCart, 
    //         incrementCartProductCount, decrementCartProductCount } = useCartContextValue();
    const { cart } = useSelector(cartSelector);

    // const { isSignedIn } = useUserAuthContextValue();
    const { userUid } = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = async (product) => {
        const isCartExists = cart.find(item => item.id === product.id);

        if (isCartExists) {
            toast.success('Increase Product Count!', {
                duration: 1000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });

            const updatedCart = cart.map(item => {
                let copiedObj = {...item};
                if (copiedObj.id === isCartExists.id) {
                    copiedObj.qty = copiedObj.qty + 1;
                }
                return copiedObj;
            });

            // setCart(updatedCart);
            dispatch(cartActions.replaceOrders(updatedCart));

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        } else {
            toast.success('Product Added Successfully!', {
                duration: 1000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });

            const cartProduct = {
                ...product,
                qty: 1
            };

            const updatedCart = [cartProduct, ...cart];

            // setCart(updatedCart);
            dispatch(cartActions.replaceOrders(updatedCart));

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        }

    }

    const handleRemoveFromCart = async (product) => {
        toast.success('Product Removed Successfully!', {
            duration: 1000,
            style: {
                minWidth: "18rem",
                minHeight: "3.5rem",
                marginTo: "2rem"
            }
        });

        const updatedCart = cart.filter(item => item.id !== product.id);

        // setCart(updatedCart);
        dispatch(cartActions.replaceOrders(updatedCart));

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const incrementCartProductCount = async (product) => {
        toast.success('Product Count Incremented!', {
            duration: 1000,
            style: {
                minWidth: "18rem",
                minHeight: "3.5rem",
                marginTo: "2rem"
            }
        });

        const updatedCart = cart.map(item => {
            let copiedObj = {...item};
            if (copiedObj.id === product.id) {
                copiedObj.qty = copiedObj.qty + 1;
            }
            return copiedObj;
        });

        // setCart(updatedCart);
        dispatch(cartActions.replaceOrders(updatedCart));

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

        toast.success('Product Count Decremented!', {
            duration: 1000,
            style: {
                minWidth: "18rem",
                minHeight: "3.5rem",
                marginTo: "2rem"
            }
        });
        
        const updatedCart = cart.map(item => {
            let copiedObj = {...item};
            if (copiedObj.id === product.id) {
                copiedObj.qty = copiedObj.qty - 1;
            }
            return copiedObj;
        });

        // setCart(updatedCart);
        dispatch(cartActions.replaceOrders(updatedCart));

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const handleAddOrRemoveProduct = (product) => {
        if (!userUid) {
            navigate("/signin");
            return;
        }

        if (homeOrCart === "home") {
            handleAddToCart(product);
        } else {
            handleRemoveFromCart(product);
        }
    }

    return (
        <div key={ product.id } className={ styles.productContainer }>
            <div className={ styles.productImageContainer }>
                <img src={ product.image } alt="Product"/>
            </div>
            <div className={ styles.productTitleContainer }>
                { product.title }
            </div>
            <div className={ styles.productPriceContainer }>
                <p>&#8377; { product.price }</p>
                { homeOrCart === "cart" && (
                    <div className={ styles.productQtyChangerContainer }>
                        <img src={ minusButtonImage } alt="Minus Button" 
                            onClick={ () => decrementCartProductCount(product) } />
                        <span>{ product.qty }</span>
                        <img src={ plusButtonImage } alt="Plus Button" 
                            onClick={ () => incrementCartProductCount(product) } />
                    </div>
                ) }
            </div>
            <button className={ styles.productActionBtn }
                onClick={ () => handleAddOrRemoveProduct(product) }>
                { homeOrCart === "home" ? "Add to Cart" : "Remove from Cart" }
            </button>
        </div>
    )
};

export default ProductCard;