const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const Restaurant = require('../models/restaurant-model.js');

const restaurantInfoArray = [
  {
    restaurantName: "La Moon",
    cuisine: "Colombian",
    logoPhoto: "images/restaurant-logos/lamoonlogo.jpg",
    dishes: {
      dish1: {
        dishPhoto: "/images/food-images/lamoon/lamoonarepa.jpg",
        dishName: "Crazy Moon Arepa",
        dishDescription: "with ham, fried egg, bacon, potato sticks, and six different sauces"
      },
      dish2: {
        dishPhoto: "/images/food-images/lamoon/salchipapas.jpeg",
        dishName: "Salchipapas",
        dishDescription: "French fries with sausage and signature sauce"
      },
      dish3: {
        dishPhoto: "/images/food-images/lamoon/supermoonperro.jpg",
        dishName: "Super Moon Perro",
        dishDescription: "Hot dog with smoked sausage, bacon, and quail egg"
      },
      dish4: {
        dishPhoto: "/images/food-images/lamoon/sancochoderes.jpg",
        dishName: "Sancocho de Res",
        dishDescription: "Beef Soup served with Cornmeal Pancake"
      }
    }
  },
  {
    restaurantName: "Blue Tree Juice",
    cuisine: "Juice Bar",
    logoPhoto: "images/restaurant-logos/bluetreelogo.jpeg"
  },
  {
    restaurantName: "Stanzione 87",
    cuisine: "Pizza",
    logoPhoto: "images/restaurant-logos/stanzione87logo.jpg",
    dishes: {
      dish1: {
        dishPhoto: "/images/food-images/stanzione87/truffle.jpeg",
        dishName: "Tartufo",
        dishDescription: "Homemade mozzarella, black truffle puree, white truffle oil"
      },
      dish2: {
        dishPhoto: "/images/food-images/stanzione87/neapolitan.jpeg",
        dishName: "Margherita",
        dishDescription: "Homemade mozzarella, basil, parmigiano, olive oil"
      },
      dish3: {
        dishPhoto: "/images/food-images/stanzione87/sandaniele.jpg",
        dishName: "San Daniele",
        dishDescription: "san daniele prosciutto, mozzarella, arugula, parmigiano"
      },
      dish4: {
        dishPhoto: "/images/food-images/stanzione87/fungi.jpg",
        dishName: "Funghi",
        dishDescription: "cream, mushrooms, smoked mozzarella, arugula"
      }
    }
  },
  {
    restaurantName: "Doraku",
    cuisine: "Sushi",
    logoPhoto: "images/restaurant-logos/dorakulogo.jpg"
  },
  {
    restaurantName: "Burger and Beer",
    cuisine: "Burgers",
    logoPhoto: "images/restaurant-logos/burgerandbeerlogo.jpg"
  },
  {
    restaurantName: "La Sandwicherie",
    cuisine: "Sandwiches and Salads",
    logoPhoto: "images/restaurant-logos/lasandwicherielogo.jpg"
  },
  {
    restaurantName: "American Harvest",
    cuisine: "New American",
    logoPhoto: "images/restaurant-logos/americanharvestlogo.png"
  },
  {
    restaurantName: "Pubbelly Sushi",
    cuisine: "Sushi",
    logoPhoto: "images/restaurant-logos/pubbellysushilogo.png",
    dishes: {
      dish1: {
        dishPhoto: "/images/food-images/pubbellysushi/tunapizza.jpg",
        dishName: "Tuna Pizza",
        dishDescription: "Crispy tortilla, garlic aioli, truffle oil"
      },
      dish2: {
        dishPhoto: "/images/food-images/pubbellysushi/snowcrabroll.jpg",
        dishName: "Butter Krab Roll",
        dishDescription: "Goma soy paper, kanikama, ponzu, warm clarified butter"
      },
      dish3: {
        dishPhoto: "/images/food-images/pubbellysushi/yellowtailroll.jpg",
        dishName: "Yellowtail",
        dishDescription: "Green soy paper, truffled yuzu, kanikama, nori tempura"
      },
      dish4: {
        dishPhoto: "/images/food-images/pubbellysushi/bigeyetuna.jpeg",
        dishName: "Bigeye Tuna",
        dishDescription: "Spicy tuna, arroz pegao, truffle oil, sea salt"
      }
    }
  },
];



Restaurant.create(
  restaurantInfoArray,               // 1st arg -> array of product info objects
  (err, restaurantResults) => {      // 2nd arg -> callback
    if (err) {
      console.log('Database error.');
      return;
    }

    restaurantResults.forEach((oneRestaurant) => {
      console.log('New Restaurant! ' + oneRestaurant.restaurantName);
    });
  }
);
