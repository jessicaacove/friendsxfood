const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const PairSchema = new Schema(
{
  restaurantId: {
    type: String
  },
  user1Id: {
    type: String
  },
  user2Id: {
    type: String
  }
});



const PairModel = mongoose.model('Pair', PairSchema);

module.exports = PairModel;
