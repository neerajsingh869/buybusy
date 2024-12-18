import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";

import ProductCard from "../components/ProductCard";
import { db } from "../configs/firebase";
import { Product } from "../types";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Home = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [searchInputState, setSearchInputState] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"));

      const querySnapshot = await getDocs(q);
      const data: Product[] = [];

      querySnapshot.forEach((doc) => {
        const currentData = {
          id: doc.id,
          ...doc.data(),
        };

        data.push(currentData as Product);
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

  const handleCategoryFilterChange = (category: string) => {
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

  return (
    <div className="py-8">
      <form className="relative mx-auto w-[300px] lg:w-[400px] dark:text-white">
        <input
          type="text"
          className="dark:bg-neutral-800 w-full h-12 p-3 text-xl outline-none bg-zinc-100 rounded-xl text-violet-600 border border-violet-600 dark:border-violet-400 dark:text-violet-400"
          placeholder="Search By Name"
          value={searchInputState}
          onChange={(e) => setSearchInputState(e.target.value)}
        />
        {searchInputState && (
          <X
            className="cursor-pointer absolute right-2 top-3"
            onClick={() => setSearchInputState("")}
          />
        )}
      </form>
      <aside className="fixed top-60 bg-zinc-100 dark:bg-neutral-800 rounded-lg text-center p-3 w-60 -left-52 md:left-0 transition-all duration-500 hover:left-0 text-violet-600 border border-violet-600 dark:border-violet-400 dark:text-violet-400 z-10">
        <h2 className="text-xl font-bold my-4 text-violet-600 dark:text-violet-400">
          Filter
        </h2>
        <form>
          <label htmlFor="price" className="text-lg">
            {" "}
            Price: {totalPrice}
          </label>
          <input
            type="range"
            className="cursor-pointer w-4/5 mt-2"
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
          <h2 className="text-lg mb-2">Category</h2>
          <div className="flex flex-col items-start justify-center gap-2 text-base">
            <div>
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
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
                className="w-4 h-4 mr-2"
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
                className="w-4 h-4 mr-2"
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
                className="w-4 h-4 mr-2"
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ml-16 md:ml-[272px] pt-8 gap-4 pr-4">
        {!loading
          ? filteredProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  homeOrCart="home"
                />
              );
            })
          : [...Array(20)].map((_, index) => (
              <ProductCardSkeleton key={index} homeOrCart="home" />
            ))}
      </div>
    </div>
  );
};

export default Home;
