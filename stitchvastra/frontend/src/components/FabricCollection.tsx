import { useState } from "react";
import FabricCard from "../components/FabricCard";

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

const FabricCollection = () => {
  // Define the cart state with the Fabric type
  const [cart, setCart] = useState<Fabric[]>([]);

  const fabricData: Fabric[] = [
    {
      image: "https://m.media-amazon.com/images/I/91Oi1ZMTp4L.jpg",
      name: "Satin Fabric",
      description: "High-quality silk fabric",
      price: 1599,
      originalPrice: 4999,
      discount: 68,
      rating: 4.3,
      reviews: 1500,
    },
    {
        image: "https://www.fabvoguestudio.com/cdn/shop/files/pr-pg-0-ta08834p18-110-coffee-floral-printed-pure-georgette-fabric-material-1.jpg?v=1687257047",
        name: "Georgette Fabric",
        description: "High-quality silk fabric",
        price: 780,
        originalPrice: 1500,
        discount: 48,
        rating: 4.3,
        reviews: 1500,
      },
      {
        image:"https://fabricdekho.com/cdn/shop/products/010_63c6adfb-30ba-4f33-b550-6819bbf98c3c.jpg?v=1661359461" ,
        name: "Denim Fabric",
        description: "High-quality silk fabric",
        price: 1200,
        originalPrice: 2400,
        discount: 50,
        rating: 4.3,
        reviews: 1500,
      },
      {
        image: "https://regalfabricgallery.com/cdn/shop/products/test_5f8adc26-fa6b-4c5b-81b9-4a2cec819601.jpg?crop=center&height=537&v=1709301800&width=430",
        name: "Silk Fabric",
        description: "High-quality silk fabric",
        price: 1599,
        originalPrice: 4999,
        discount: 68,
        rating: 4.3,
        reviews: 1500,
      },
      {
        image: "https://5.imimg.com/data5/SELLER/Default/2024/1/377534697/QA/FE/JP/2588326/wool-fur-fabric-500x500.jpg",
        name: "Wool Fabric",
        description: "High-quality silk fabric",
        price: 999,
        originalPrice: 1998,
        discount: 50,
        rating: 4.3,
        reviews: 1500,
      },
    {
      image: "https://justfabric.in/cdn/shop/files/Khadi-Cotton-Fabric-44-Inch-Width-Ready-to-Dye-Fabrics-JUST-FABRIC-204.jpg?v=1685790142",
      name: "Cotton Fabric",
      description: "Soft and breathable cotton",
      price: 1979,
      originalPrice: 3000,
      discount: 66,
      rating: 4.5,
      reviews: 1200,
    }
  ];

  // Explicitly type the fabric parameter in the function
  const handleAddToCart = (fabric: Fabric) => {
    setCart((prevCart) => [...prevCart, fabric]);  // Use functional update for state
    alert(`${fabric.name} added to cart!`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Fabric Collection</h2>
      <div className="grid grid-cols-3 gap-6">
        {fabricData.map((fabric, index) => (
          <FabricCard key={index} fabric={fabric} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default FabricCollection;