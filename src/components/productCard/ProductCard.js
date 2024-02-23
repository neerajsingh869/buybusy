import styles from "./ProductCard.module.css";

const ProductCard = ({ product, homeOrCart }) => {
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
            <button className={ styles.productActionBtn }>
                { homeOrCart === "home" ? "Add to Cart" : "Remove from Cart" }
            </button>
        </div>
    )
};

export default ProductCard;