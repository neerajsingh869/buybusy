import { useNavigate } from "react-router-dom";
import { useProductContextValue } from "../../contexts/productContext";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./ProductCard.module.css";
import plusButtonImage from "../../assets/plus.png";
import minusButtonImage from "../../assets/minus.png";

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
                <p>&#8377; { product.price }</p>
                { homeOrCart === "cart" && (
                    <div className={ styles.productQtyChangerContainer }>
                        <img src={ plusButtonImage } alt="Plus Button" />
                        <span>{ product.qty }</span>
                        <img src={ minusButtonImage } alt="Minus Button" />
                    </div>
                ) }
            </div>
            <button className={ styles.productActionBtn }
                onClick={ () => handleAddOrRemoveProduct(product) }>
                { homeOrCart === "home" ? "Add to Cart" : "Remove from Cart" }
            </button>
        </div>
    )
};

export default ProductCard;