import express from 'express'
import { auth,jwt,genHashedPassword,bcrypt} from '../index.js'
import { createuser, getingUser, userToken, getingToken, logoutUser, getingUserDetails } from '../service/user.service.js'

// routing
const router = express.Router()

// storing user details
async function createUser(userDetails){
    const user = await createuser(userDetails)
   // returning boolean value
    return user
   }
   


   //getting username from database
   async function getUserName(email){
       const users = await getingUser(email)
       //returning a username
       return users
   }
   
   // signup user
router.post("/signup",async function (request,response){
      const {username,password,email} = request.body
   
     
      // getting username from database to check it already exit
      const userFromDB = await getUserName(email)
   
      //validating if username is already exit
      if(userFromDB){
       response.status(400).send("username alreay exists")
      }
      //validating is password is not lesser then 8 character
      else if(password.length < 8){
       response.status(400).send("password must be 8 characters")
      }
      
      else{
       // getting send and geting hash password
       const hashedPassword=await genHashedPassword(password)
       
       //creating a user by name and hash password
       const result = await createUser({
           username:username,
           password:hashedPassword,
           email:email
       })
       response.send(result)
      }
   })

   // login user
router.post("/login",async function (request,response){
    const {email,password}=request.body

    // getting username from database to check it already exit
    const userFromDB = await getUserName(email)

    if(! userFromDB){
        response.status(401).send("Invalid credentials")
    }
    else{
        const storedDBPassword = userFromDB.password

        const isPasswordMatch= await bcrypt.compare(password,storedDBPassword)

        if(isPasswordMatch){
            const token = jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)

            const storeTokenInDB = await userToken(userFromDB, token)
            response.send({message : "successful login",
        token:token})


        }
        else{
            response.status(401).send("Invalid credentials")
        }


    }
})

//getting user token
router.get("/token/:email",async function(request,response){

    const {email} = request.params
            
    const getToken = await getingToken(email)
    
   
    response.send(getToken)
})

// logouting user
router.delete("/logout/:email",auth,async function(request,response){

    const {email} = request.params
            
    const logout = await logoutUser(email)
    
   
    response.send({msg:"done"})
})

//getting user details
router.get('/:email',auth,async function(request,response){
    const {email} = request.params
    const getUser = await getingUserDetails(email)
    response.send(getUser)
    })

export default router

