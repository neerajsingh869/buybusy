import { Order as OrderType } from "../../types";

type Props = {
  order: OrderType;
}

const Order = ({ order }: Props) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-xl font-bold mb-4 text-violet-600 dark:text-violet-400">Ordered On:- {order.orderedOn}</p>
      <table className="border-none ">
        <thead>
          <tr className="bg-zinc-100 dark:bg-neutral-800 dark:text-white">
            <th className="border-b-2 border-black dark:border-white p-4">Title</th>
            <th className="border-b-2 border-black dark:border-white p-4">Price</th>
            <th className="border-b-2 border-black dark:border-white p-4">Quantity</th>
            <th className="border-b-2 border-black dark:border-white p-4">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product) => {
            return (
              <tr className="bg-zinc-100 dark:bg-neutral-800 dark:text-white" key={product.id}>
                <td className="p-4">{product.title}</td>
                <td className="p-4">&#8377; {product.price}</td>
                <td className="p-4">{product.qty}</td>
                <td className="p-4">&#8377; {product.price * product.qty}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-zinc-100 dark:bg-neutral-800 text-right dark:text-white">
            <td className="p-4" colSpan={4}>&#8377; {order.totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Order;
