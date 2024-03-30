import { useCartContextValue } from "../../contexts/cartContext";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
// import { useOrdersContextValue } from "../../contexts/ordersContext";
import { DotLoader } from "react-spinners";
import toast from "react-hot-toast";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/userReducer";
import { ordersActions, ordersSelector } from "../../redux/reducers/ordersReducer";

const Cart = () => {
    const { cart, total, loading, resetCartPage } = useCartContextValue();
    // const { purchaseProductsFromCart } = useOrdersContextValue();
    // const { orders } = useOrdersContextValue();
    const { orders } = useSelector(ordersSelector);
    const { userUid } = useSelector(userSelector);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const purchaseProductsFromCart = async (cart) => {
        toast.success('Orders Purchases Successfull.', {
            duration: 1000,
            style: {
                minWidth: "18rem",
                minHeight: "3.5rem",
                marginTo: "2rem"
            }
        });

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

        // setOrders(newOrders);
        console.log("==================inside purchaseProductsFromCart START==================");
        console.log("[LOG] dispatched replaceOrders payload: ");
        console.log(newOrders);
        dispatch(ordersActions.replaceOrders(newOrders));
        console.log("==================inside purchaseProductsFromCart END==================");

        const usersOrdersRef = collection(db, "usersOrders");
        await setDoc(doc(usersOrdersRef, userUid), {
            orders: newOrders
        });
        console.log("Purchased orders stored in database");

        resetCartPage();
    }

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

    if (cart.length === 0) {
        return (
            <div className={ styles.emptyCartPage }>
                <h2>Cart is Empty!</h2>
            </div>
        )
    }

    return (
        <div>
            <aside className={ styles.filterAside }>
                <h2>Total Price:- { total }</h2>
                <button className={ styles.purchaseBtn }
                        onClick={ (e) => {
                            e.preventDefault();

                            purchaseProductsFromCart(cart);
                            navigate("/myorders");
                        } }>
                    Purchase
                </button>
            </aside>
            <div className={ styles.prductsContainer }>
                {
                    cart.map(product => {
                        return (
                            <ProductCard 
                                key={ product.id } 
                                product={ product } 
                                homeOrCart="cart" />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Cart;