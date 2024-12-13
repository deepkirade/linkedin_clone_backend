const express = require("express")
const app = express();
const connectDb = require("./utils/db.js")
require('dotenv').config()
app.use(express.urlencoded({ extended: false }));
const cors = require('cors')
const morgan = require("morgan")
const userRouter = require('./Router/userRouter.js');
const connectionRouter = require("./Router/connectionRouter.js")
const { passportconfig } = require("./utils/passport.js");
const session = require("express-session")

app.use(session({
  secret: '@#$%^&',
  resave: false,
  saveUninitialized: false
}))

app.use(morgan("dev"))
app.use(express.json());
app.use(cors())

app.use(passportconfig.initialize())
app.use(passportconfig.session())

//google streategy use
const Googleprovider = require("./utils/googlestrategy.js")
passportconfig.use(Googleprovider)

app.use("/api/v1/user", userRouter)
app.use("/api/v1/connection", connectionRouter)

const PORT = process.env.PORT || 5000
connectDb().then(() => {

  app.listen(PORT, () => {
    console.log(`server connection seccessfully at port ${PORT}`)
  });
});





