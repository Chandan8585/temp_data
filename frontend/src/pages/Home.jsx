import React, { useState, useEffect, useCallback } from 'react';
// import Sidebar from '../components/Sidebar';
import CategoryFilter from '../components/CategoryFilter';
import MenuList from '../components/MenuList';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import PaymentMethods from '../components/PaymentMethods';
import { useCart } from '../context/CartContext2';
import { useSidebar } from '../context/SidebarContext';
import { fetchData } from '../lib/api';

// Fallback to local data if API is unavailable
// import categoriesFallback from '../data/Categories';
// import menuItemsFallback from '../data/data';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useCart();
  const { expanded } = useSidebar();

  // Function to fetch menu data based on filters
  const fetchMenuData = useCallback(async (category = 'all', search = '') => {
    setLoading(true);
    try {
      // Fetch categories from your API
      const categoriesData = await fetchData('/category');
     
      setCategories(categoriesData );
      
      // Build the query string for filtering
      let endpoint = '/product';
      const params = [];
      
      if (category !== 'all') {
        params.push(`category=${category}`);
      }
      
      if (search) {
        params.push(`search=${encodeURIComponent(search)}`);
      }
      
      if (params.length > 0) {
        endpoint = `${endpoint}?${params.join('&')}`;
      }
      
      // Fetch filtered menu items from your API
      const productsData = await fetchData(endpoint);
     
      setMenuItems(productsData );
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from API. Using local data instead.');
      // Fallback to local data in case of error
      // setCategories(categoriesData);
      // setMenuItems(productsData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  // Refetch when category or search changes
  useEffect(() => {
    // Add a small delay to prevent too many API calls while typing
    const timer = setTimeout(() => {
      fetchMenuData(selectedCategory, searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, fetchMenuData]);

  const handleCategorySelect = (categoryId) => {
    const selected = categories.find(cat=> cat._id === categoryId);
    if(selected?.key==='all'){
      setSelectedCategory('all');
    }else{
      setSelectedCategory(categoryId);
    }
  
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-secondary">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className={`flex-1 p-4 transition-all duration-300 ${
        expanded ? 'sm:ml-56' : 'sm:ml-16'
      }`}>
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Menu Section */}
            <div className="lg:w-2/3">
              {/* Search Bar */}
              <div className="w-full mb-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search menu..." 
                    className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading menu items...</p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg mb-4 text-sm">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {/* Categories */}
                  <CategoryFilter 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    onSelectCategory={handleCategorySelect} 
                  />

                  {/* Menu Items */}
                  <MenuList 
                    items={menuItems} 
                    selectedCategory={selectedCategory} 
                  />
                </>
              )}
            </div>

            {/* Order Details Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-bell text-gray-500"></i>
                    </div>
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="User Profile" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <h2 className="text-lg font-semibold">Details Items</h2>
                </div>

                {/* Cart Items */}
                {cart.length > 0 ? (
                  cart.map(item => (
                    <CartItem key={item.name} item={item} />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <i className="fas fa-shopping-cart text-3xl mb-2"></i>
                    <p>Your cart is empty</p>
                  </div>
                )}

                {/* Order Summary */}
                <OrderSummary />

                {/* Payment Methods */}
                <PaymentMethods />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
