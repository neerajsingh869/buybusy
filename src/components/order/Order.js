import styles from "./Order.module.css";

const Order = ({ order }) => {
    return (
        <div className={ styles.orderContainer }>
            <p>Ordered On:- { order.orderedOn}</p>
            <table className={ styles.orderTable }>
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
                                <td>&#8377; { product.price }</td>
                                <td>{ product.qty }</td>
                                <td>&#8377; { product.price * product.qty }</td>
                               </tr> 
                            )
                        })
                    }
                </tbody>
                <tfoot className={ styles.orderTableFooter }>
                    <tr>
                        <td colSpan={4}>&#8377; { order.totalPrice }</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
};

export default Order;