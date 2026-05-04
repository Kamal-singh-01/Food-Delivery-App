import React, { useState, useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import axios from '../../../api/axios';
import './AddFood.css';

const AddFood = () => {
  const { token } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Check image selected
    if (!image) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    try {
      // ✅ Use FormData to send image + text together
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('image', image);

      const response = await axios.post('/foods', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('✅ Food added successfully!');
        // Reset form
        setFormData({ name: '', description: '', price: '', category: '' });
        setImage(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add-food'>
      <h2>Add New Food</h2>
      <form onSubmit={handleSubmit} className='add-food-form'>

        {/* Image Upload */}
        <div className='add-food-image'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            {image
              ? <img src={URL.createObjectURL(image)} alt='preview' />
              : <div className='image-placeholder'>📷 Click to upload</div>
            }
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Food Name */}
        <div className='add-food-field'>
          <p>Food Name</p>
          <input
            type='text'
            name='name'
            placeholder='Enter food name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className='add-food-field'>
          <p>Description</p>
          <textarea
            name='description'
            placeholder='Enter food description'
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        {/* Price & Category */}
        <div className='add-food-row'>
          <div className='add-food-field'>
            <p>Price ($)</p>
            <input
              type='number'
              name='price'
              placeholder='Enter price'
              value={formData.price}
              onChange={handleChange}
              required
              min='1'
            />
          </div>

          <div className='add-food-field'>
            <p>Category</p>
            <select
              name='category'
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value=''>Select category</option>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
        </div>

        {/* Error & Success messages */}
        {error && <p className='error-msg'>{error}</p>}
        {success && <p className='success-msg'>{success}</p>}

        <button type='submit' disabled={loading}>
          {loading ? 'Adding Food...' : 'Add Food'}
        </button>

      </form>
    </div>
  );
};

export default AddFood;