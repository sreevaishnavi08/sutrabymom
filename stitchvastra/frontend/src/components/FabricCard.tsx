// Define the Fabric type globally
interface Fabric {
    image: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviews: number;
  }
  
  // Define the FabricCardProps interface for the props of FabricCard component
  interface FabricCardProps {
    fabric: Fabric;
    onAddToCart: (fabric: Fabric) => void;
  }
  
  const FabricCard: React.FC<FabricCardProps> = ({ fabric, onAddToCart }) => {
    return (
      <div className="border p-4 rounded-lg shadow-lg">
        <img src={fabric.image} alt={fabric.name} className="w-full h-56 object-cover rounded-md" />
        <h3 className="text-lg font-bold mt-2">{fabric.name}</h3>
        <p className="text-gray-600">{fabric.description}</p>
        <p className="text-red-500 font-bold">
          Rs. {fabric.price} <span className="line-through text-gray-500">Rs. {fabric.originalPrice}</span> ({fabric.discount}% OFF)
        </p>
        <p className="text-green-600">⭐ {fabric.rating} ({fabric.reviews} reviews)</p>
  
        {/* Add to Cart Button */}
        <button 
          className="mt-3 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          onClick={() => onAddToCart(fabric)}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default FabricCard;