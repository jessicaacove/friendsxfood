const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const RestaurantSchema = new Schema(
{
  restaurantName: {
    type: String
  },
  cuisine: {
    type: String
  },
  logoPhoto: {
    type: String
  },
  dishes: {
    dish1: {
      dishPhoto: {type: String},
      dishName: {type: String},
      dishDescription: {type: String}
    },
    dish2: {
      dishPhoto: {type: String},
      dishName: {type: String},
      dishDescription: {type: String}
    },
    dish3: {
      dishPhoto: {type: String},
      dishName: {type: String},
      dishDescription: {type: String}
    },
    dish4: {
      dishPhoto: {type: String},
      dishName: {type: String},
      dishDescription: {type: String}
    }
  }
});



const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

module.exports = RestaurantModel;
