import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Home.module.css";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useEffect, useState } from "react";
import clearImage from "../../assets/clear.png";
import { DotLoader } from "react-spinners";

const Home = () => {
    const [productsData, setProductsData] = useState([]);
    const [searchInputState, setSearchInputState] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);
            const data = [];

            querySnapshot.forEach((doc) => {
                const currentData = {
                    id: doc.id,
                    ...doc.data()
                };

                data.push(currentData);
            });

            setProductsData(data);
            setFilteredProducts(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredProducts(productsData
                                .filter(product => 
                                        product.title.toLowerCase().includes(searchInputState.toLowerCase())));
    }, [searchInputState, productsData]);

    if (loading) {
        return (
            <div className={ styles.pageLoader }>
                <DotLoader
                    color="#7064e5"
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div>
            <form className={ styles.searchForm }>
                <input 
                    type="text" 
                    placeholder="Search By Name"
                    value={ searchInputState }
                    onChange={ (e) => setSearchInputState(e.target.value) } />
                { searchInputState && <img  style={{ 
                                                cursor: "pointer",
                                                width:"25px",
                                                position: "absolute",
                                                marginLeft: "-32px",
                                                top: "25%"   
                                            }}
                                            src={ clearImage } 
                                            alt="Clear Search"
                                            onClick={ () => setSearchInputState("") } /> }
                
            </form>
            <aside className={ styles.filterAside }>
                <h2>Filter</h2>
                <form>

                </form>
            </aside>
            <div className={ styles.prductsContainer }>
                {
                    filteredProducts.map(product => {
                        return (
                            <ProductCard key={ product.id } product={ product } homeOrCart="home" />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Home;