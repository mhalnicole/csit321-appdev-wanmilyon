export default function OrderHistoryRow({key, order, onViewReceipt}){
    return (
            <tr key={order.id}>
                <td className="history-order-id-col">#{order.id}</td>
                <td>{order.itemName}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="history-amount-col">₱{order.price.toFixed(2)}</td>
                <td>
                    <span className={`history-status-badge ${order.status ? order.status.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'pending'}`}>
                        {order.status}
                    </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                    <button className="history-view-btn" onClick={onViewReceipt}>
                        View
                    </button>
                </td>
            </tr>)
}