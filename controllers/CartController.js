const models = require("../models")
const db = require('../models/index')


module.exports = {
    //Add Item TO Cart / Update Item Quantity in Cart 
    addToCart: async (req, res) => {
        const {userId, itemId} = req.body
        try{

            //Check If Item Already Exists in Cart
            const itemExistsInCart = await models.cart.findOne({
                where:{
                    userId:userId,
                    dishId:itemId
                }
            })
            //If Item Is Present In Cart Then Increase The Item Quantity By One
            if(itemExistsInCart){
               const result = await models.cart.update({quantity:itemExistsInCart.quantity+1},{where:{
                    userId:userId,
                    dishId:itemId
                    
            }})
            return res.status(200).json({updatedQuantity:result.quantity,message:"Item Quantity Updated"})
            }

            //If Item Is Not Present In Cart Then Add The Item To The Cart
            else{
                const result = await models.cart.create({userId:userId,dishId:itemId,quantity:1})
              return  res.status(200).json({message:"Item Added To Cart Successfully"})
            }


        }
        catch(err){
            console.log({err})
            return res.status(400).json({"message":"Something Went Wrong","error":err})
        }
        return res.status(200).json({dishes})
    },

    //Get all the Items Present in a User's Cart along with the CartTotal
    getCartItems: async (req,res)=>{
        
        const id = req.params.id
        const result = await db.sequelize.query(`select carts."userId", carts."quantity",  dishes."id" , dishes."name" , dishes."price"from carts INNER JOIN dishes ON carts."dishId"=dishes."id" where carts."userId"=?`,{replacements: [id]
            ,type: db.Sequelize.QueryTypes.SELECT
        });
        const cartData = {items:result,CartTotal:result.reduce((sum,i)=>{return sum + i.price*i.quantity},0)}
        return res.status(200).json(cartData)
    }
}