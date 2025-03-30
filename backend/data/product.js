const menuItems = [
    {
      id: 1,
      name: "Floating islands",
      category: "desserts",
      price: 18.99,
      originalPrice: 25.99,
      available: 12,
      sold: 13,
      discount: "25% Off",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.6, count: 212 }
    },
    {
      id: 2,
      name: "Peach Melba pie",
      category: "desserts",
      price: 15.99,
      originalPrice: 20.99,
      available: 9,
      sold: 15,
      image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.3, count: 317 }
    },
    {
      id: 3,
      name: "Raspberry brûlée",
      category: "desserts",
      price: 24.99,
      originalPrice: 30.99,
      available: 16,
      sold: 9,
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.8, count: 155 }
    },
    {
      id: 4,
      name: "Blackberry & lemon fool",
      category: "desserts",
      price: 19.20,
      originalPrice: 25.99,
      available: 20,
      sold: 15,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.5, count: 198 }
    },
    {
      id: 5,
      name: "Cherry & almond",
      category: "desserts",
      price: 20.99,
      originalPrice: 25.99,
      available: 7,
      sold: 25,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.7, count: 322 }
    },
    {
      id: 6,
      name: "Chocolate tiffin",
      category: "desserts",
      price: 17.99,
      originalPrice: 23.99,
      available: 12,
      sold: 13,
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.4, count: 290 }
    },
    {
      id: 7,
      name: "Cappuccino",
      category: "coffee",
      price: 4.99,
      originalPrice: 6.99,
      available: 30,
      sold: 45,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.9, count: 356 }
    },
    {
      id: 8,
      name: "Espresso",
      category: "coffee",
      price: 3.49,
      originalPrice: 4.99,
      available: 25,
      sold: 38,
      image: "https://images.unsplash.com/photo-1510707577719-ae7afe3e6a58?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.3, count: 274 }
    },
    {
      id: 9,
      name: "Orange Juice",
      category: "juice",
      price: 5.99,
      originalPrice: 7.99,
      available: 18,
      sold: 22,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.2, count: 193 }
    },
    {
      id: 10,
      name: "Mixed Berry Smoothie",
      category: "juice",
      price: 6.99,
      originalPrice: 8.99,
      available: 15,
      sold: 19,
      image: "https://images.unsplash.com/photo-1553530666-ba11a90bb802?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.6, count: 235 }
    },
    {
      id: 11,
      name: "Pretzel Bites",
      category: "snack",
      price: 8.99,
      originalPrice: 10.99,
      available: 22,
      sold: 28,
      image: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.1, count: 151 }
    },
    {
      id: 12,
      name: "Vegetable Spring Rolls",
      category: "snack",
      price: 9.49,
      originalPrice: 11.99,
      available: 16,
      sold: 24,
      image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.5, count: 276 }
    },
    {
      id: 13,
      name: "Vegetarian Fried Rice",
      category: "rice",
      price: 12.99,
      originalPrice: 15.99,
      available: 20,
      sold: 32,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.7, count: 298 }
    },
    {
      id: 14,
      name: "Shrimp Rice Bowl",
      category: "rice",
      price: 14.99,
      originalPrice: 18.99,
      available: 14,
      sold: 26,
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: { rate: 4.6, count: 342 }
    }
  ];
  
module.exports = menuItems
  