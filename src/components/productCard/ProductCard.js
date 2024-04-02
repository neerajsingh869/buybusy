import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import plusButtonImage from "../../assets/plus.png";
import minusButtonImage from "../../assets/minus.png";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/userReducer";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../configs/firebase";
import { showNotification } from "../../utility/showNotifications";

const ProductCard = ({ product, homeOrCart }) => {
    const { cart } = useSelector(cartSelector);

    const { userUid } = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = async (product) => {
        const isCartExists = cart.find(item => item.id === product.id);

        if (isCartExists) {
            showNotification('Increase Product Count!');

            const updatedCart = cart.map(item => {
                let copiedObj = {...item};
                if (copiedObj.id === isCartExists.id) {
                    copiedObj.qty = copiedObj.qty + 1;
                }
                return copiedObj;
            });

            dispatch(cartActions.replaceOrders(updatedCart));

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        } else {
            showNotification('Product Added Successfully!');

            const cartProduct = {
                ...product,
                qty: 1
            };

            const updatedCart = [cartProduct, ...cart];

            dispatch(cartActions.replaceOrders(updatedCart));

            const usersCartsRef = collection(db, "usersCarts");
            await setDoc(doc(usersCartsRef, userUid), {
                cart: updatedCart
            });
        }

    }

    const handleRemoveFromCart = async (product) => {
        showNotification('Product Removed Successfully!');

        const updatedCart = cart.filter(item => item.id !== product.id);

        dispatch(cartActions.replaceOrders(updatedCart));

        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
            cart: updatedCart
        });
    }

    const incrementCartProductCount = async (product) => {
        showNotification('Product Count Incremented!');

        const updatedCart = cart.map(item => {
            let copiedObj = {...item};
            if (copiedObj.id === product.id) {
                copiedObj.qty = copiedObj.qty + 1;
            }
            return copiedObj;
        });

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

        showNotification('Product Count Decremented!');
        
        const updatedCart = cart.map(item => {
            let copiedObj = {...item};
            if (copiedObj.id === product.id) {
                copiedObj.qty = copiedObj.qty - 1;
            }
            return copiedObj;
        });

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