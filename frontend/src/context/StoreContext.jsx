import { createContext, useEffect, useState } from "react";
import { getAllFoodItems } from "../services/foodItemService";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getAllFoodItems();
        const updatedFoodItems = response.data.foodItems.map(item => ({
          ...item,
          image: `http://localhost:5000/images/${item.image}` // Prepend base URL
        }));
        console.log('Food items fetched:', updatedFoodItems);
        setFoodList(updatedFoodItems);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    
    fetchFoodItems();
  }, []);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount
  };

  const contextValue = {
    food_list,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
