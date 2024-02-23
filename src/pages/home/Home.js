import ProductCard from "../../components/productCard/ProductCard";
import productsData from "../../data/data.json";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div>
            <form className={ styles.searchForm }>
                <input type="text" placeholder="Search By Name" />
            </form>
            <aside className={ styles.filterAside }>
                <h2>Filter</h2>
                <form>

                </form>
            </aside>
            <div className={ styles.prductsContainer }>
                {
                    productsData.map((product, index) => {
                        return (
                            <ProductCard product={ product } homeOrCart="home" />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Home;