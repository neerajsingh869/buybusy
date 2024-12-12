import { CartItem } from "../types";

export const mergeCartItems = (
  guestCartItems: CartItem[],
  dbCartItems: CartItem[]
): CartItem[] => {
  // 1. Create a map to store merged item using item id as key
  const mergedItemsMap = new Map<string, CartItem>();

  // 2. Add all DB items to map
  dbCartItems.forEach((item) => {
    mergedItemsMap.set(item.id, { ...item });
  });

  // 3. Merge guest cart items
  guestCartItems.forEach((item) => {
    if (mergedItemsMap.has(item.id)) {
      // Item exists - update quantity
      const existingItem = mergedItemsMap.get(item.id) as CartItem;
      existingItem.qty += item.qty;
    } else {
      // New item - add to map
      mergedItemsMap.set(item.id, { ...item });
    }
  });

  // 4. Convert map back to array
  return Array.from(mergedItemsMap.values());
};
