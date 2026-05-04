import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';
import './FoodList.css';

const FoodList = () => {
  const { token } = useContext(StoreContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all foods
  const fetchFoods = async () => {
    try {
      const response = await axios.get('/foods');
      setFoods(response.data.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete food
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food?')) return;

    try {
      const response = await axios.delete(`/foods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Remove from UI instantly
        setFoods(foods.filter((food) => food._id !== id));
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <p className='loading'>Loading foods...</p>;

  return (
    <div className='food-list'>
      <h2>Food List</h2>
      <p className='food-count'>Total: {foods.length} foods</p>

      <div className='food-list-table'>
        {/* Table Header */}
        <div className='food-list-header'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <hr />

        {/* Table Rows */}
        {foods.map((food) => (
          <div key={food._id} className='food-list-row'>
            <img src={food.image} alt={food.name} />
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>${food.price}</p>
            <p
              className='delete-btn'
              onClick={() => handleDelete(food._id)}
            >
              ❌ Delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;