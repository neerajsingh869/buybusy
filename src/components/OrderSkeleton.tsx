import { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ThemeContext } from "../contexts/themeContext";
import { LIGHT_THEME } from "../constants";

const OrderSchema = () => {
  return (
    <div className="mt-8 text-center w-full sm:w-[60vw] md:w-[40vw] xl:w-[35vw]">
      <p className="mb-4 h-8">
        <Skeleton className="h-full" />
      </p>
      <table className="border-none w-full">
        <thead>
          <tr className="bg-zinc-100 dark:bg-neutral-800">
            <th className="border-b-2 border-black dark:border-white dark:text-white p-4 px-2 sm:px-4">
              Title
            </th>
            <th className="border-b-2 border-black dark:border-white dark:text-white p-4 px-2 sm:px-4">
              Price
            </th>
            <th className="border-b-2 border-black dark:border-white dark:text-white p-4 px-2 sm:px-4">
              Quantity
            </th>
            <th className="border-b-2 border-black dark:border-white dark:text-white p-4 px-2 sm:px-4">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => {
            return (
              <tr className="bg-zinc-100 dark:bg-neutral-800" key={index}>
                <td className="p-4 px-2 sm:px-4">
                  <Skeleton />
                </td>
                <td className="p-4 px-2 sm:px-4">
                  <Skeleton />
                </td>
                <td className="p-4 px-2 sm:px-4">
                  <Skeleton />
                </td>
                <td className="p-4 px-2 sm:px-4">
                  <Skeleton />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-zinc-100 dark:bg-neutral-800">
            <td className="p-4 px-2 sm:px-4" colSpan={4}>
              <Skeleton />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const OrderLoader = () => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {theme === LIGHT_THEME ? (
        <SkeletonTheme>
          <OrderSchema />
        </SkeletonTheme>
      ) : (
        <SkeletonTheme baseColor="#333" highlightColor="#666">
          <OrderSchema />
        </SkeletonTheme>
      )}
    </>
  );
};

export default OrderLoader;
