const db = require('../models')
const response = require('../response/res')
const product = db.product
//addUser....................................................................
const addProduct = async (req, res) => {
    try {
        const{title,price,description,slug,quantity} = req.body;
            let info = {
                    title: title,
                    price: price,
                    description: description,
                    slug:slug,
                    quantity:quantity
            }
            const productData = await product.create(info)
            if(productData){
            response.Message ="product Add Successfully",
            response.success=true,
            response.data=productData
            res.status(200).send(response)
            }else{
            response.Message ="Product Don't Add",
            response.success=false,
            response.data=null
            res.status(400).send(response)
            }
    } catch (error) {
        response.Message ="Something Went wrong"
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}

const GetProduct = async (req, res) => {
    try {
        let users = await product.findAll();
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=users
            res.status(200).send(response)
        }else{
            response.Message ="Not Found Data",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
const deleteProduct = async (req, res) => {
    try {
        const {id} = req.body;
        let users = await product.destroy({where: { id: id }});
        if(users ===1){
            response.Message ="product Delete Successfully",
            response.success=true,
            response.data=null
            res.status(200).send(response)
        }else{
            response.Message ="Not Product  Delete",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
  }
  //updateProduct.................................
  const updateProduct = async (req, res) => {
    try {
        const{productId,price,quantity} = req.body;
        const updateAddress = await product.update({
             slug:req.body.slug,
             price:price,
             quantity:quantity,
             image:"https://websitetransfereval.herokuapp.com/uploads/"+req.file.filename},{where: { id:productId }});
            if(updateAddress && updateAddress.length>0){
                response.Message ="product Update  Successfully",
                response.success=true,
                response.data=null
                res.status(200).send(response) 
            }else{
                response.Message ="Product Don't Update",
                response.success=false,
                response.data=null
                res.status(400).send(response)
            }
      
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}
//getProductId
const GetProductDetails = async (req, res) => {
    try {
        const{slug} = req.query
        let users = await product.findAll({where:{slug:slug}});
        if(users && users.length>0){
            response.Message ="Data Get Successfully",
            response.success=true,
            response.data=users
            res.status(200).send(response)
        }else{
            response.Message ="Not Found Data",
            response.success=false,
            response.data=null
            res.status(400).send(response)
    }
      } catch (error) {
        response.Message ="Something Went wrong",
        response.success=false,
        response.data=null
        res.status(400).send(response)
        
    }
}


module.exports = {
    addProduct,
    GetProduct,
    deleteProduct,
    updateProduct,
    GetProductDetails
}
  