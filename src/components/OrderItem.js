import './OrderItem.css';
import * as settings from '../config/settings';

function OrderItem({orderItem, no}) {

    console.log(orderItem);
    
  return (
    <div className="order-item">
        <div className="order-item__header">
            <div className="order-item__img-no-contanier">
                <div className="order-item__no">
                    {no}
                </div>
                <img src={`${settings.BASE_URL}/${orderItem.foodItem.image}`} className="order-item__img" />
            </div>
            <div className="order-item__title">{orderItem.quantity} <span style={{
                fontWeight: 'bold'
            }}>x</span> {orderItem.foodItem.title}</div>
            <div className="order-item__price">Rs. {orderItem.foodItem.price * orderItem.quantity}</div>
            <div className="order-item__food-category">{orderItem.foodItem.foodCategory.title}</div>
        </div>
        {orderItem.user?.userAddress && <div className="order-item__center">
            <div className="order-item-user">
                <div className="order-item-user__info">{orderItem.user.name}</div>
                <div className="order-item-user__info">{orderItem.user.userAddress.phoneNumber}</div>
                <div className="order-item-user__info">{orderItem.user.email}</div>
                <div className="order-item-user__info">{orderItem.user.userAddress.address1}</div>
                {orderItem.user.userAddress.address2 && <div className="order-item-user__info">Address 2 : {orderItem.user.userAddress.address2}</div>}
                <div className="order-item-user__info">{orderItem.user.userAddress.pinCode}</div>
                <div className="order-item-user__info">{orderItem.user.userAddress.city}</div>
                <div className="order-item-user__info">{orderItem.user.userAddress.state}</div>
                <div className="order-item-user__info">{orderItem.user.userAddress.country}</div>
            </div>
        </div>}
        
        {/*<div className="order-item__action-contanier">             
            <button className="order-item__action" onClick={handleDelete} disabled={deleteOrderItem.data && deleteOrderItem.data.id === orderItem.id && deleteOrderItem.loading}>
                <DeleteForeverIcon />
                {deleteOrderItem.data && deleteOrderItem.data.id === orderItem.id && deleteOrderItem.loading ? 
                'Deleting...' : 'Delete'}
            </button>
        </div> */}
    </div>
  );
}

export default OrderItem;