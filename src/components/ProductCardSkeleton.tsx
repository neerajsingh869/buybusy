import { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { LIGHT_THEME } from "../constants";
import { ThemeContext } from "../contexts/themeContext";

type HomeOrCart = "home" | "cart";

type Props = {
  homeOrCart: HomeOrCart;
};

const ProductCardSchema = ({ homeOrCart }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 xl:p-6 rounded-xl shadow-xl min-w-56 dark:bg-neutral-800">
      <div className="h-56">
        <Skeleton className="h-full" />
      </div>
      <div>
        <Skeleton />
      </div>
      <div className="flex items-center justify-between">
        <p>
          <Skeleton className="w-12 h-4" />
        </p>
        {homeOrCart === "cart" && (
          <Skeleton
            containerClassName="flex gap-1 items-center w-[60%]"
            className="flex-1 h-4"
            count={3}
          />
        )}
      </div>
      <button className="h-10 rounded-lg cursor-pointer">
        <Skeleton className="h-full" />
      </button>
    </div>
  );
};

const ProductCardLoader = ({ homeOrCart }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {theme === LIGHT_THEME ? (
        <SkeletonTheme>
          <ProductCardSchema homeOrCart={homeOrCart} />
        </SkeletonTheme>
      ) : (
        <SkeletonTheme baseColor="#333" highlightColor="#666">
          <ProductCardSchema homeOrCart={homeOrCart} />
        </SkeletonTheme>
      )}
    </>
  );
};

export default ProductCardLoader;
