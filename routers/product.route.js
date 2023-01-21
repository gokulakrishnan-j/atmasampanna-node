import express from 'express'
import { auth } from '../index.js'
import { getingProducts, getingSearchedProducts } from '../service/product.service.js'

// routing 
const router = express.Router()

// geting product details
router.get('/',auth,async function(request,response){
    const getProducts = await getingProducts()
    response.send(getProducts)
    })  
    
    //getting searched product details
router.get('/:name',auth,async function(request,response){
        const {name} = request.params
        const getProducts = await getingSearchedProducts(name)
        response.send(getProducts)
        }) 
    
export default router


