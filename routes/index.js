const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))

//Get all Dishes
router.get('/dish', controllers.Dish.findAll)

//Get All Users
router.get('/User',controllers.User.findAll)

// Create new User in the Db
router.post('/User/signUp',controllers.User.create)

//Authenticate and Sign In User
router.post('/User/signIn',controllers.User.signIn)

//Post Request To add Item TO Cart / Update Item Quantity
router.post('/addTocart',controllers.CartController.addToCart)

//Get Cart Details Of the Logged In User
router.get('/cart/:id',controllers.CartController.getCartItems)

module.exports = router