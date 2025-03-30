import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-700">Category</h2>
        <button 
          className="text-primary text-sm font-medium hover:underline"
          onClick={() => onSelectCategory('all')}
        >
          See All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <div 
            key={category.key}
          
            className={`category-item flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border ${
              selectedCategory === category._id ? 'border-primary' : 'border-gray-100'
            } hover:border-primary cursor-pointer transition-all min-w-[70px]`}
            onClick={() => onSelectCategory(category._id)}
          >
            <div className="w-10 h-10 flex items-center justify-center mb-2">
              <img src={category.icon} alt={category.name} className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
