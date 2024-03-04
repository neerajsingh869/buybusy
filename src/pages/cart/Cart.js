import { useCartContextValue } from "../../contexts/cartContext";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useOrdersContextValue } from "../../contexts/ordersContext";
import { DotLoader } from "react-spinners";

const Cart = () => {
    const { cart, total, loading } = useCartContextValue();
    const { purchaseProductsFromCart } = useOrdersContextValue();

    const navigate = useNavigate();

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