import { ObjectId } from 'mongodb';
import { client } from '../index.js';

// getting searched products
export function getingSearchedProducts(name) {
    return client
        .db('atmasampanna')
        .collection('products')
        .find({ name: { $regex: name.replace(/yes/g, '') } })
        .toArray();
}

//getting products
export function getingProducts() {
    return client
        .db('atmasampanna')
        .collection('products')
        .find({})
        .toArray();
}

export function getingIndividualProduct(id) {
    return client
        .db('atmasampanna')
        .collection('products')
        .findOne({_id:ObjectId(id)})
       
}
