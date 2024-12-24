const express = require("express")
// const app = express();
const connectDb = require("./utils/db.js")
require('dotenv').config()
const cookieparser = require("cookie-parser")
const cors = require('cors')
const morgan = require("morgan")
const companyRouter = require('./Router/company_router.js')
const userRouter = require('./Router/userRouter.js');
const connectionRouter = require("./Router/connectionRouter.js")
const jobRouter = require("./Router/job-router.js")
const applicationRouter = require("./Router/application_router.js")
const messageRouter = require("./Router/messageRouter.js")
const { passportconfig } = require("./utils/passport.js");
const session = require("express-session")
const {server,app} = require("./socketio/socketio.js")
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: '@#$%^&',
  resave: false,
  saveUninitialized: false
}))
 


app.use(cookieparser())
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
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", (applicationRouter))
app.use("/api/v1/message", (messageRouter))
app.use("/api/v1/company", (companyRouter))

const PORT = process.env.PORT || 5000
connectDb().then(() => {


  server.listen(PORT, () => {
    console.log(`server connection seccessfully at port ${PORT}`)
  });
});


const path = require("path")
app.use(express.static(path.resolve("./public")));

app.get('/', function (req, res) {
  res.sendFile('public/index.js')
})



