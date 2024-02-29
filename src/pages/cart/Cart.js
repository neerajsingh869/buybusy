import { useProductContextValue } from "../../contexts/productContext";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, total, purchaseProductsFromCart } = useProductContextValue();
    const navigate = useNavigate();

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