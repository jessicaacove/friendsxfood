const express = require('express');

const RestaurantModel = require('../models/restaurant-model.js');
const PairModel = require('../models/pair-model.js');

const router = express.Router();



router.get('/restaurantlist', (req, res, next) => {
  if (req.user === undefined) {
      res.redirect('/login');
      return;
    }

    RestaurantModel.find(
      {},
      (err, restaurantResults) => {
        if (err) {
          next(err);
          return;
        }

        res.locals.restaurantList = restaurantResults;

        res.render('restaurant-views/restaurant-list-view.ejs');
      }
    );
});



router.get('/selected-restaurant/:id', (req, res, next) => {
  RestaurantModel.findById(
    req.params.id,
    (err, restaurantFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.restaurant = restaurantFromDb;
      res.render('restaurant-views/selected-restaurant-view.ejs');
    }
  );
});



router.get('/pairing/:id', (req, res, next) => {
  console.log("got here");
  RestaurantModel.findById(
    req.params.id,
    (err, restaurantFromDb) => {
      if(err) {
        next(err);
        return;
      }
      console.log(restaurantFromDb);

      PairModel.find({
        restaurantId: restaurantFromDb._id,
        user2Id: null
      },
      (err, pairFromDb) => {
        if(err) {
          next(err);
          return;
        }
        console.log(pairFromDb);

        if(pairFromDb.length === 0) {
          console.log("pair from db is empty");
          const thePair = new PairModel({
            restaurantId: restaurantFromDb._id,
            user1Id: req.user._id
          });
          console.log(thePair);
          thePair.save((err) => {
            if (err) {
              next(err);
              return;
            }
            res.render('pairing-views/pairing-view.ejs');
          });
        }
        else {
          pairFromDb[0].user2Id = req.user._id;
          pairFromDb[0].save((err) => {
            if (err) {
              next(err);
              return;
            }
            res.locals.pairInformation = pairFromDb[0];
            res.render('pairing-views/paired-view.ejs');
          });
        }
      });
    });
});





module.exports = router;
