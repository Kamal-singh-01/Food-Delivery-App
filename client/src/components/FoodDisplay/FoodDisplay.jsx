import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

export const FoodDisplay = ({ category }) => {
  const { food_list, search } = useContext(StoreContext); 

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near to you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {

          // ✅ Filter by category AND search
          const matchesCategory = category === "All" || category === item.category;
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

          if (matchesCategory && matchesSearch) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};