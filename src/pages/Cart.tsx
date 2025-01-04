import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";

import ProductCard from "../components/ProductCard";
import { db } from "../configs/firebase";
import { userSelector } from "../redux/slices/userSlice";
import { ordersActions, ordersSelector } from "../redux/slices/ordersSlice";
import { cartActions, cartSelector } from "../redux/slices/cartSlice";
import { showNotification } from "../utility/showNotifications";
import { useAppDispatch, useAppSelector } from "../hook";
import { CartItem } from "../types";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { ThemeContext } from "../contexts/themeContext";

const Cart = () => {
  const { cart, loading } = useAppSelector(cartSelector);
  const { orders } = useAppSelector(ordersSelector);
  const { userUid } = useAppSelector(userSelector);

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const theme = useContext(ThemeContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetCartPage = async () => {
    dispatch(cartActions.reset());

    const usersCartsRef = collection(db, "usersCarts");
    await setDoc(doc(usersCartsRef, userUid as string | undefined), {
      cart: [],
    });
  };

  const purchaseProductsFromCart = async (cart: CartItem[]) => {
    if (!userUid) {
      showNotification(
        "Please Sign in or Sign up to purchase products.",
        "error",
        theme
      );
      navigate("/signin");
      return;
    }

    showNotification("Orders Purchased Successfully!", "success", theme);

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

  if (cart.length === 0) {
    return (
      <div className="text-center text-xl m-4 dark:text-white">
        <h2>Cart is Empty!</h2>
      </div>
    );
  }

  return (
    <div>
      <aside className="flex justify-center align-center flex-col h-40 rounded-xl align-center fixed w-52 bg-zinc-100 dark:bg-neutral-800 p-4 gap-8 top-1/3 -left-40 md:left-0 transition-all duration-500 hover:left-0 text-violet-600 border border-violet-600 dark:border-violet-400 dark:text-violet-400 z-10">
        <h2 className="text-lg font-bold">Total Price:- {total}</h2>
        <button
          className="ease-in-out duration-300 h-9 text-lg rounded-md dark:text-black dark:hover:text-white text-white bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-400 border-2 hover:text-violet-600  hover:bg-white dark:hover:bg-black mx-auto w-full"
          onClick={(e) => {
            e.preventDefault();

            purchaseProductsFromCart(cart);
            navigate("/myorders");
          }}
        >
          Purchase
        </button>
      </aside>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ml-16 md:ml-56 py-9 pr-4">
        {!loading
          ? cart.map((product: CartItem) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  homeOrCart="cart"
                />
              );
            })
          : [...Array(15)].map((_, index) => (
              <ProductCardSkeleton key={index} homeOrCart="cart" />
            ))}
      </div>
    </div>
  );
};

export default Cart;
