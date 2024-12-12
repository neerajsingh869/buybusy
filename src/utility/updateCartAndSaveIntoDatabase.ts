import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import { CartItem } from "../types";
import { db } from "../configs/firebase";
import { mergeCartItems } from "./mergeCartItems";

export const updateCartAndSaveIntoDatabase = async (
  userUid: string,
  cart: CartItem[]
): Promise<CartItem[]> => {
  // 1. Get cart items associated with userUid from database
  let dbCartItems: CartItem[] = [];
  const docRef = doc(db, "usersCarts", userUid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    dbCartItems = docSnap.data().cart;
  }

  // 2. Get cart items stored in app state
  const guestCartItems = cart;

  // 3. Get updated cart items after merging guest and db cart items
  const updatedCartItems = mergeCartItems(guestCartItems, dbCartItems);

  // 4. Store updated cart items into database against logged in user id
  const usersCartsRef = collection(db, "usersCarts");
  await setDoc(doc(usersCartsRef, userUid), {
    cart: updatedCartItems,
  });

  return updatedCartItems;
};
