import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Home.module.css";
import { db } from "../../configs/firebase";
import clearImage from "../../assets/clear.png";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchInputState, setSearchInputState] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"));

      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach((doc) => {
        const currentData = {
          id: doc.id,
          ...doc.data(),
        };

        data.push(currentData);
      });

      setProductsData(data);
      setFilteredProducts(data);
      setLoading(false);
      setTotalPrice(75000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply search filter
    const filteredBySearch = productsData.filter((product) =>
      product.title.toLowerCase().includes(searchInputState.toLowerCase())
    );

    // Apply category filter
    const filteredByCategory =
      categoryFilters.length > 0
        ? filteredBySearch.filter((product) =>
            categoryFilters.includes(product.category)
          )
        : filteredBySearch;

    // Apply price filter
    const filteredByPrice = filteredByCategory.filter(
      (product) => product.price <= totalPrice
    );

    setFilteredProducts(filteredByPrice);
  }, [searchInputState, totalPrice, productsData, categoryFilters]);

  const handleCategoryFilterChange = (category) => {
    const updatedFilters = [...categoryFilters];

    if (updatedFilters.includes(category)) {
      // Remove category filter if already present
      updatedFilters.splice(updatedFilters.indexOf(category), 1);
    } else {
      // Add category filter if not present
      updatedFilters.push(category);
    }

    setCategoryFilters(updatedFilters);
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <form className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchInputState}
          onChange={(e) => setSearchInputState(e.target.value)}
        />
        {searchInputState && (
          <img
            style={{
              cursor: "pointer",
              width: "25px",
              position: "absolute",
              marginLeft: "-32px",
              top: "25%",
            }}
            src={clearImage}
            alt="Clear Search"
            onClick={() => setSearchInputState("")}
          />
        )}
      </form>
      <aside className={styles.filterAside}>
        <h2>Filter</h2>
        <form>
          <label htmlFor="price"> Price: {totalPrice}</label>
          <input
            type="range"
            id="price"
            name="price"
            min="1"
            max="100000"
            step="10"
            value={totalPrice}
            onChange={(e) => {
              setTotalPrice(Number(e.target.value));
              setFilteredProducts(
                productsData.filter(
                  (product) => product.price <= Number(e.target.value)
                )
              );
            }}
          />
          <h2>Category</h2>
          <div className={styles.categoryContainer}>
            <div>
              <input
                type="checkbox"
                id="men"
                name="men"
                onChange={() => {
                  handleCategoryFilterChange("men");
                }}
              />
              <label htmlFor="men">Men's Clothing</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="women"
                name="women"
                onChange={() => {
                  handleCategoryFilterChange("women");
                }}
              />
              <label htmlFor="women">Women's Clothing</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="jewelery"
                name="jewelery"
                onChange={() => {
                  handleCategoryFilterChange("jewelery");
                }}
              />
              <label htmlFor="jewelery">Jewelery</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="electronics"
                name="electronics"
                onChange={() => {
                  handleCategoryFilterChange("electronics");
                }}
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
        </form>
      </aside>
      <div className={styles.prductsContainer}>
        {filteredProducts.map((product) => {
          return (
            <ProductCard key={product.id} product={product} homeOrCart="home" />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
