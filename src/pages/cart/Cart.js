import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";

import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Cart.module.css";
import { db } from "../../configs/firebase";
import { userSelector } from "../../redux/reducers/userReducer";
import {
  ordersActions,
  ordersSelector,
} from "../../redux/reducers/ordersReducer";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";
import { showNotification } from "../../utility/showNotifications";

const Cart = () => {
  const { cart, loading } = useSelector(cartSelector);
  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const { orders } = useSelector(ordersSelector);
  const { userUid } = useSelector(userSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetCartPage = async () => {
    dispatch(cartActions.reset());

    const usersCartsRef = collection(db, "usersCarts");
    await setDoc(doc(usersCartsRef, userUid), {
      cart: [],
    });
  };

  const purchaseProductsFromCart = async (cart) => {
    showNotification("Orders Purchased Successfully!");

    const orderToPlace = {
      id: new Date().getTime(),
      orderedOn: new Date().toISOString().split("T")[0],
      products: [...cart],
      totalPrice: total,
    };

    const newOrders = [orderToPlace, ...orders];

    dispatch(ordersActions.replaceOrders(newOrders));

    const usersOrdersRef = collection(db, "usersOrders");
    await setDoc(doc(usersOrdersRef, userUid), {
      orders: newOrders,
    });

    resetCartPage();
  };

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
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCartPage}>
        <h2>Cart is Empty!</h2>
      </div>
    );
  }

  return (
    <div>
      <aside className={styles.filterAside}>
        <h2>Total Price:- {total}</h2>
        <button
          className={styles.purchaseBtn}
          onClick={(e) => {
            e.preventDefault();

            purchaseProductsFromCart(cart);
            navigate("/myorders");
          }}
        >
          Purchase
        </button>
      </aside>
      <div className={styles.prductsContainer}>
        {cart.map((product) => {
          return (
            <ProductCard key={product.id} product={product} homeOrCart="cart" />
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
