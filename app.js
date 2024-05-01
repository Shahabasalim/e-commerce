const express=require("express")
const app=express()
const session = require('express-session');
const flash = require('express-flash');
const port=3000
const loginSignupRouter = require('./router/loginsignup')
const adminRouter = require('./router/adminrouter')
const userRouter = require('./router/userrouter')
const mongo=require("./config/db")

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

mongo().then(()=>{
  app.listen(port, () => {
    console.log(`Server started:${port}`);
  });
}).catch((error)=>{
  console.log(error)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',"views")
app.use('/',loginSignupRouter)
app.use('/',adminRouter)
app.use('/',userRouter)



