const express = require('express')
const router = express.Router()
const itemController = require('../controller/itemController')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//FOR GETTING ITEMS WITHOUT CATEGORY
router.get('/item', itemController.getItem)

// FOR GETTING ITEM WITH CATEGORY
router.get('/item/:catId', itemController.getItemWithCategory)

// FOR GETTING PRICE SORTED
router.get('/priceSort', itemController.getItemPriceSorted)

// FOR GETTING PRICE SORTED WITH CATEGORY
router.get('/priceSort/:catId', itemController.getItemPriceSortedWithCategory)

// For Adding Favourites
router.post('/favourite', itemController.addToFavourite)

// For Deleting Favourite
router.delete('/deleteFavourite', itemController.deleteFromFavourite)

// FOR GETTING FAVOURITES
router.get('/item/favourite/:userId', itemController.getUserFavourite)

//for getting info about item
router.get('/item/:id/:cid',itemController.singleitem)

module.exports = router