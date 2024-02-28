const Order = ({ order }) => {
    return (
        <div>
            <p>Ordered On:- { order.orderedOn}</p>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.products.map(product => {
                            return (
                               <tr key={ product.id }>
                                <td>{ product.title }</td>
                                <td>{ product.price }</td>
                                <td>{ product.qty }</td>
                                <td>{ product.price * product.qty }</td>
                               </tr> 
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>{ order.totalPrice }</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
};

export default Order;