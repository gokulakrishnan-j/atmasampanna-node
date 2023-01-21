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
