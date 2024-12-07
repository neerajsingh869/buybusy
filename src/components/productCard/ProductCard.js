import { CircleMinus, CirclePlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";

import { userSelector } from "../../redux/reducers/userReducer";
import { cartActions, cartSelector } from "../../redux/reducers/cartReducer";
import { db } from "../../configs/firebase";
import { showNotification } from "../../utility/showNotifications";

const ProductCard = ({ product, homeOrCart }) => {
  const { cart } = useSelector(cartSelector);
  const { userUid } = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    const isCartExists = cart.find((item) => item.id === product.id);

    if (isCartExists) {
      showNotification("Increase Product Count!");

      const updatedCart = cart.map((item) => {
        let copiedObj = { ...item };
        if (copiedObj.id === isCartExists.id) {
          copiedObj.qty = copiedObj.qty + 1;
        }
        return copiedObj;
      });

      dispatch(cartActions.replaceOrders(updatedCart));

      if (userUid) {
        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
          cart: updatedCart,
        });
      }
    } else {
      showNotification("Product Added Successfully!");

      const cartProduct = {
        ...product,
        qty: 1,
      };

      const updatedCart = [cartProduct, ...cart];

      dispatch(cartActions.replaceOrders(updatedCart));

      if (userUid) {
        const usersCartsRef = collection(db, "usersCarts");
        await setDoc(doc(usersCartsRef, userUid), {
          cart: updatedCart,
        });
      }
    }
  };

  const handleRemoveFromCart = async (product) => {
    showNotification("Product Removed Successfully!");

    const updatedCart = cart.filter((item) => item.id !== product.id);

    dispatch(cartActions.replaceOrders(updatedCart));

    if (userUid) {
      const usersCartsRef = collection(db, "usersCarts");
      await setDoc(doc(usersCartsRef, userUid), {
        cart: updatedCart,
      });
    }
  };

  const incrementCartProductCount = async (product) => {
    showNotification("Product Count Incremented!");

    const updatedCart = cart.map((item) => {
      let copiedObj = { ...item };
      if (copiedObj.id === product.id) {
        copiedObj.qty = copiedObj.qty + 1;
      }
      return copiedObj;
    });

    dispatch(cartActions.replaceOrders(updatedCart));

    if (userUid) {
      const usersCartsRef = collection(db, "usersCarts");
      await setDoc(doc(usersCartsRef, userUid), {
        cart: updatedCart,
      });
    }
  };

  const decrementCartProductCount = async (product) => {
    if (product.qty === 1) {
      handleRemoveFromCart(product);
      return;
    }

    showNotification("Product Count Decremented!");

    const updatedCart = cart.map((item) => {
      let copiedObj = { ...item };
      if (copiedObj.id === product.id) {
        copiedObj.qty = copiedObj.qty - 1;
      }
      return copiedObj;
    });

    dispatch(cartActions.replaceOrders(updatedCart));

    if (userUid) {
      const usersCartsRef = collection(db, "usersCarts");
      await setDoc(doc(usersCartsRef, userUid), {
        cart: updatedCart,
      });
    }
  };

  const handleAddOrRemoveProduct = (product) => {
    if (homeOrCart === "home") {
      handleAddToCart(product);
    } else {
      handleRemoveFromCart(product);
    }
  };

  return (
    <div
      key={product.id}
      className="flex flex-col justify-between gap-4 p-4 xl:p-8 rounded-xl shadow-xl min-w-56 dark:bg-neutral-800"
    >
      <div className="h-56">
        <img
          className="h-full w-full object-contain mix-blend-multiply"
          src={product.image}
          alt="Product"
        />
      </div>
      <div className="font-medium text-xl dark:text-white">{product.title}</div>
      <div className="flex items-center justify-between font-bold text-xl dark:text-white">
        <p>&#8377; {product.price}</p>
        {homeOrCart === "cart" && (
          <div className="flex gap-2 items-center">
            <CircleMinus
              className="cursor-pointer"
              onClick={() => decrementCartProductCount(product)}
            />
            <span>{product.qty}</span>
            <CirclePlus
              className="cursor-pointer"
              onClick={() => incrementCartProductCount(product)}
            />
          </div>
        )}
      </div>
      <button
        className="text-xl dark:text-black dark:hover:text-white h-12 text-white bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-400 border-2 rounded-lg cursor-pointer transition-all hover:text-violet-600  hover:bg-white dark:hover:bg-black"
        onClick={() => handleAddOrRemoveProduct(product)}
      >
        {homeOrCart === "home" ? "Add to Cart" : "Remove from Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
