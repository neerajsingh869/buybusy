import { useNavigate } from "react-router-dom";
import { useProductContextValue } from "../../contexts/productContext";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, homeOrCart }) => {
    const { handleAddToCart, handleRemoveFromCart } = useProductContextValue();
    const { isSignedIn } = useUserAuthContextValue();
    const navigate = useNavigate();

    const handleAddOrRemoveProduct = (product) => {
        if (!isSignedIn) {
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
                &#8377; { product.price }
            </div>
            <button className={ styles.productActionBtn }
                onClick={ () => handleAddOrRemoveProduct(product) }>
                { homeOrCart === "home" ? "Add to Cart" : "Remove from Cart" }
            </button>
        </div>
    )
};

export default ProductCard;