import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Home.module.css";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useEffect, useState } from "react";

const Home = () => {
    const [productsData, setProductsData] = useState([]);

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
        }

        fetchData();
    }, []);

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
                    productsData.map(product => {
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