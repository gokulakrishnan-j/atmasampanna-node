import { client } from '../index.js';

//getting user details 
export function getingUserDetails(email) {
    return client
        .db('atmasampanna')
        .collection('sign up/in')
        .findOne({ email: email });
}

// logout user
export function logoutUser(email) {
    return client
        .db("atmasampanna")
        .collection("token")
        .deleteOne({ email: email });
}

// getting token
export function getingToken(email) {
    return client
        .db("atmasampanna")
        .collection("token")
        .findOne({ email: email });
}

// storing token
export function userToken(userFromDB, token) {
    return client
        .db("atmasampanna")
        .collection("token")
        .insertOne({
            email: userFromDB.email,
            my_token: token
        });
}

//geting user details
export function getingUser(email) {
    return client
        .db("atmasampanna")
        .collection("sign up/in")
        .findOne({ email: email });
}

// creating user
export function createuser(userDetails) {
    return client
        .db("atmasampanna")
        .collection("sign up/in")
        .insertOne(userDetails);
}
