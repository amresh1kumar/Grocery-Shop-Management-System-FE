const Grocery_Products = [
  {
    id: 1,
    name: "Basmati Rice (5kg)",
    category: "grains",
    old_price: 600,
    new_price: 549,
    image: "https://images.unsplash.com/photo-1631515243343-d9d64fb0d008?auto=format&fit=crop&w=600"
  },
  {
    id: 2,
    name: "Wheat Flour (10kg)",
    category: "grains",
    old_price: 450,
    new_price: 420,
    image: "https://images.unsplash.com/photo-1635882686820-497d33ff7a57?auto=format&fit=crop&w=600"
  },
  {
    id: 3,
    name: "Sugar (1kg)",
    category: "grains",
    old_price: 48,
    new_price: 44,
    image: "https://images.unsplash.com/photo-1630394884174-bd9cc1ae228e?auto=format&fit=crop&w=600"
  },
  {
    id: 4,
    name: "Salt (1kg)",
    category: "grains",
    old_price: 20,
    new_price: 18,
    image: "https://images.unsplash.com/photo-1585238342070-8ef1e3597d2e?auto=format&fit=crop&w=600"
  },
  {
    id: 5,
    name: "Toor Dal (1kg)",
    category: "grains",
    old_price: 130,
    new_price: 120,
    image: "https://images.unsplash.com/photo-1625913902936-3c2b80a4d4fa?auto=format&fit=crop&w=600"
  },

  // Vegetables
  {
    id: 6,
    name: "Tomatoes (1kg)",
    category: "vegetables",
    old_price: 40,
    new_price: 30,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg"
  },
  {
    id: 7,
    name: "Onions (1kg)",
    category: "vegetables",
    old_price: 35,
    new_price: 28,
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSlIiDCjGIOyma8lNDqCJOHaJkuO77JuQ1zfjBlziRw03AYXPgTsRLdjlInfIrUQ7BbpEF38xx7r3XuBUNKzbGAGg"
  },
  {
    id: 8,
    name: "Potatoes (1kg)",
    category: "vegetables",
    old_price: 30,
    new_price: 25,
    image: "https://i.pinimg.com/564x/d9/56/9d/d9569de4ea78a5635e4d5577a2b0fd69.jpg"
  },
  {
    id: 9,
    name: "Garlic (250g)",
    category: "vegetables",
    old_price: 50,
    new_price: 45,
    image: "https://media.post.rvohealth.io/wp-content/uploads/2016/08/Garlic_732x549-thumbnail-732x549.jpg"
  },
  {
    id: 10,
    name: "Ginger (250g)",
    category: "vegetables",
    old_price: 40,
    new_price: 35,
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSzQua1eko_eZnRTXbz3Yb-JHQF4ksw3s4nCM9NkzK8lKpZPkvqZrQV7mStwwncI84kHewK5g7Hn2oN106aQBvD7C6VOY2_WuMv3GCGhQ"
  },

  // Fruits
  {
    id: 11,
    name: "Apples (1kg)",
    category: "fruits",
    old_price: 150,
    new_price: 135,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600"
  },
  {
    id: 12,
    name: "Bananas (1 dozen)",
    category: "fruits",
    old_price: 60,
    new_price: 50,
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=600"
  },
  {
    id: 13,
    name: "Oranges (1kg)",
    category: "fruits",
    old_price: 90,
    new_price: 80,
    image: "https://images.unsplash.com/photo-1572451472217-d6bdc2fbe9ec?auto=format&fit=crop&w=600"
  },
  {
    id: 14,
    name: "Mangoes (1kg)",
    category: "fruits",
    old_price: 120,
    new_price: 110,
    image: "https://images.unsplash.com/photo-1608032077018-5d57d6c65d0b?auto=format&fit=crop&w=600"
  },
  {
    id: 15,
    name: "Pineapple (1pc)",
    category: "fruits",
    old_price: 80,
    new_price: 70,
    image: "https://images.unsplash.com/photo-1616512579334-951c443ef196?auto=format&fit=crop&w=600"
  },

  // Dairy
  {
    id: 16,
    name: "Milk (1L)",
    category: "dairy",
    old_price: 60,
    new_price: 55,
    image: "https://images.unsplash.com/photo-1587728643654-0ec6cd246a56?auto=format&fit=crop&w=600"
  },
  {
    id: 17,
    name: "Eggs (12pcs)",
    category: "dairy",
    old_price: 90,
    new_price: 80,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600"
  },
  {
    id: 18,
    name: "Butter (500g)",
    category: "dairy",
    old_price: 250,
    new_price: 230,
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600"
  },
  {
    id: 19,
    name: "Paneer (200g)",
    category: "dairy",
    old_price: 90,
    new_price: 80,
    image: "https://images.unsplash.com/photo-1594041682298-b8e73cf0c4ae?auto=format&fit=crop&w=600"
  },
  {
    id: 20,
    name: "Yogurt (500g)",
    category: "dairy",
    old_price: 70,
    new_price: 65,
    image: "https://images.unsplash.com/photo-1590080876031-0cddc2bdc977?auto=format&fit=crop&w=600"
  },

  // Snacks
  {
    id: 21,
    name: "Biscuits (500g)",
    category: "snacks",
    old_price: 60,
    new_price: 50,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600"
  },
  {
    id: 22,
    name: "Chips (200g)",
    category: "snacks",
    old_price: 50,
    new_price: 45,
    image: "https://images.unsplash.com/photo-1613145991794-72c36d0e4a04?auto=format&fit=crop&w=600"
  },
  {
    id: 23,
    name: "Popcorn (Microwave)",
    category: "snacks",
    old_price: 60,
    new_price: 55,
    image: "https://images.unsplash.com/photo-1630417498130-89b7e6d79e2c?auto=format&fit=crop&w=600"
  },
  {
    id: 24,
    name: "Bread (400g)",
    category: "snacks",
    old_price: 40,
    new_price: 35,
    image: "https://images.unsplash.com/photo-1604908554192-081e109b15f9?auto=format&fit=crop&w=600"
  },
  {
    id: 25,
    name: "Coconut Oil (500ml)",
    category: "snacks",
    old_price: 180,
    new_price: 165,
    image: "https://images.unsplash.com/photo-1606761568499-6d2a18c88580?auto=format&fit=crop&w=600"
  }
];

export default Grocery_Products;
