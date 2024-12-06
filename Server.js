const express = require("express")
const app = express();
// const userrouter = require("./Router/user-router")
// const jobrouter = require("./Router/job-router")
// const application = require("./Router/application_router")
const connectDb = require("./utils/db.js")
// app.use("/route",userrouter, jobrouter,application);
require('dotenv').config()
const cors = require('cors')
const morgan = require("morgan")
const userRouter = require('./Router/userRouter.js');
const { passportconfig } = require("./utils/passport.js");
const session = require("express-session")
app.use(session({
  secret:'@#$%^&',
  resave:false,
  saveUninitialized:false
}))
app.use(morgan("dev"))
app.use(express.json());
app.use(cors())
app.use(passportconfig.initialize())
app.use(passportconfig.session())

//streategy use
const Googleprovider = require("./utils/googlestrategy.js")
passportconfig.use(Googleprovider)


app.use(express.urlencoded({extended:false}));



app.use("/api/v1/user", userRouter)


  const PORT = process.env.PORT || 5000
 



connectDb().then(()=>{
    
app.listen(PORT,()=>{
    console.log(`server connection seccessfully at port ${PORT}`)
});
});



app.get("/",(req,res)=>{

    res.status(200).send("welcome by Server1");

});

