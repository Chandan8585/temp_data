import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ items, selectedCategory }) => {
  // Since filtering is now done at the API level through Home component,
  // we'll just display the items as they come
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-700">Select Menu</h2>
        <div className="text-sm text-primary">
          {items.length} items found
        </div>
      </div>
      
      {items.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <i className="fas fa-search text-3xl mb-3"></i>
          <p>No menu items found</p>
          <p className="text-sm">Try changing your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
