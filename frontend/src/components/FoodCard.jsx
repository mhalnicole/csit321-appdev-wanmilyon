import '../css/FoodCard.css';

function FoodCard({ name, price, image, description, onAddToCart }) {
  return (
    <div className='foodcard-grid'>
      <div className="food-card">
        <img src={image} alt={name} className="food-image" />
        <div className="food-info">
          <h3>{name}</h3>
          <p className="food-description">{description}</p>
          <div className="food-price-row">
            <p className="price">₱{price.toFixed(2)}</p>
            <button className="add-cart-btn" onClick={onAddToCart}>
              Ibutang sa cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
