const Order = ({ order }) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-xl font-bold mb-4 text-sky-900">Ordered On:- {order.orderedOn}</p>
      <table className="border-none">
        <thead>
          <tr className="bg-slate-50">
            <th className="border-b-2 border-black p-4">Title</th>
            <th className="border-b-2 border-black p-4">Price</th>
            <th className="border-b-2 border-black p-4">Quantity</th>
            <th className="border-b-2 border-black p-4">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product) => {
            return (
              <tr className="bg-slate-50" key={product.id}>
                <td className="p-4">{product.title}</td>
                <td className="p-4">&#8377; {product.price}</td>
                <td className="p-4">{product.qty}</td>
                <td className="p-4">&#8377; {product.price * product.qty}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 text-right">
            <td className="p-4" colSpan={4}>&#8377; {order.totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Order;
