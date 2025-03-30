const menuItems = [
    {
      "name": "Vanilla Cheesecake",
      "price": 14.99,
      "originalPrice": 19.99,
      "available": 10,
      "sold": 20,
      "discount": "25% Off",
      "description": "Classic creamy cheesecake with a hint of vanilla.",
      "category": "desserts",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.6,
        "count": 120
      }
    },
    {
      "name": "Caramel Latte",
      "price": 5.99,
      "originalPrice": 7.99,
      "available": 15,
      "sold": 25,
      "discount": "20% Off",
      "description": "Rich coffee with a caramel swirl, topped with whipped cream.",
      "category": "coffee",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.8,
        "count": 95
      }
    },
    {
      "name": "Mango Smoothie",
      "price": 6.49,
      "originalPrice": 8.49,
      "available": 18,
      "sold": 22,
      "discount": "23% Off",
      "description": "Refreshing blend of ripe mangoes and creamy yogurt.",
      "category": "juice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.5,
        "count": 75
      }
    },
    {
      "name": "Spicy Chicken Wrap",
      "price": 9.99,
      "originalPrice": 12.99,
      "available": 12,
      "sold": 18,
      "discount": "23% Off",
      "description": "Delicious chicken wrap with a spicy twist and fresh veggies.",
      "category": "snack",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.3,
        "count": 65
      }
    },
    {
      "name": "Egg Fried Rice",
      "price": 11.49,
      "originalPrice": 14.99,
      "available": 20,
      "sold": 30,
      "discount": "23% Off",
      "description": "Perfectly cooked rice tossed with eggs and veggies.",
      "category": "rice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.7,
        "count": 110
      }
    },
    {
      "name": "Strawberry Tart",
      "price": 13.99,
      "originalPrice": 18.99,
      "available": 14,
      "sold": 20,
      "discount": "26% Off",
      "description": "A buttery crust filled with creamy custard and topped with fresh strawberries.",
      "category": "desserts",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.5,
        "count": 90
      }
    },
    {
      "name": "Hazelnut Cappuccino",
      "price": 4.99,
      "originalPrice": 6.49,
      "available": 20,
      "sold": 35,
      "discount": "23% Off",
      "description": "Creamy coffee with a hint of hazelnut, topped with frothy milk.",
      "category": "coffee",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.6,
        "count": 105
      }
    },
    {
      "name": "Pineapple Juice",
      "price": 5.99,
      "originalPrice": 8.49,
      "available": 18,
      "sold": 20,
      "discount": "29% Off",
      "description": "Freshly squeezed pineapple juice, bursting with tropical flavor.",
      "category": "juice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.4,
        "count": 88
      }
    },
    {
      "name": "BBQ Chicken Wings",
      "price": 10.99,
      "originalPrice": 14.99,
      "available": 15,
      "sold": 22,
      "discount": "26% Off",
      "description": "Juicy chicken wings coated in a smoky BBQ sauce.",
      "category": "snack",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.5,
        "count": 75
      }
    },
    {
      "name": "Beef Fried Rice",
      "price": 13.99,
      "originalPrice": 18.99,
      "available": 10,
      "sold": 28,
      "discount": "26% Off",
      "description": "Savory fried rice with tender beef strips and veggies.",
      "category": "rice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.7,
        "count": 120
      }
    },
    {
      "name": "Chocolate Mousse",
      "price": 12.99,
      "originalPrice": 16.99,
      "available": 8,
      "sold": 18,
      "discount": "24% Off",
      "description": "Rich and creamy chocolate mousse topped with whipped cream.",
      "category": "desserts",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.9,
        "count": 140
      }
    },
    {
      "name": "Pumpkin Spice Latte",
      "price": 6.49,
      "originalPrice": 8.49,
      "available": 12,
      "sold": 22,
      "discount": "23% Off",
      "description": "Seasonal favorite with a perfect mix of pumpkin and spices.",
      "category": "coffee",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.7,
        "count": 85
      }
    },
    {
      "name": "Guava Juice",
      "price": 5.49,
      "originalPrice": 7.49,
      "available": 16,
      "sold": 20,
      "discount": "27% Off",
      "description": "Fresh guava juice packed with tropical goodness.",
      "category": "juice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.6,
        "count": 70
      }
    },
    {
      "name": "Mozzarella Sticks",
      "price": 9.49,
      "originalPrice": 11.49,
      "available": 20,
      "sold": 25,
      "discount": "17% Off",
      "description": "Crispy on the outside, gooey melted mozzarella on the inside.",
      "category": "snack",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.8,
        "count": 95
      }
    },
    {
      "name": "Garlic Fried Rice",
      "price": 12.99,
      "originalPrice": 15.99,
      "available": 18,
      "sold": 30,
      "discount": "19% Off",
      "description": "Fragrant fried rice with the perfect touch of garlic.",
      "category": "rice",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqA9IZ5xEcMnB0URh74j08EU_hG9u9MD-0uo04TR5fJeH1ck7Bh4Ack8XOkF3MIAVbzc&usqp=CAU",
      "rating": {
        "rate": 4.7,
        "count": 110
      }
    }
  ];
  
  export default menuItems;
