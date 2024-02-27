import { useProductContextValue } from "../../contexts/productContext";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Cart.module.css";

const Cart = () => {
    const { cart } = useProductContextValue();

    return (
        <div>
            <aside className={ styles.filterAside }>
                <h2>Total Price:- </h2>
                <form>

                </form>
            </aside>
            <div className={ styles.prductsContainer }>
                {
                    cart.map(product => {
                        return (
                            <ProductCard key={ product.id } product={ product } homeOrCart="cart" />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Cart;