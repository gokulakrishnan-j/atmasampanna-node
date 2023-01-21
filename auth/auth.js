// using jwt for authorization
import jwt from "jsonwebtoken"

export const auth = (request,response,next)=>{
    try{
        //geting token from api request
        const token = request.header("my_token");
        // using jwt to verify token
        jwt.verify(token,process.env.SECRET_KEY);
        //next is use to call next function
        next();
    }catch (err) {
        response.status(401).send(err.message)
    }
}