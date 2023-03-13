import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Datbase.js";
import SequelizeStore from "connect-session-sequelize";
import  UserRoute from "./routes/UserRoute.js";
import  ProductRoute from "./routes/ProductRoute.js";
import ViewsRoute from "./routes/ViewsRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import bodyParser from 'body-parser';
import ServicesRoute from "./routes/ServicesRoute.js";


dotenv.config();

const app= express();

const sessionStore =SequelizeStore(session.Store);
const store =new sessionStore({
    db: db
});
//(async()=>{
//    await  db.sync();
//    }
//)();
app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }
}))
app.use(cors({
    credentials:true,
    origins: 'http://localhost:5000'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(ViewsRoute);
app.use(AuthRoute);
app.use(ServicesRoute);
app.set('view engine', 'ejs');
app.use('public', express.static(new URL('./public', import.meta.url).pathname));
app.use(express.static('public', { extensions: ['html', 'css','js'],  }));

app.get('/', function(req, res) {
    res.render('pages/login', { title: 'Mi aplicación Node.js' });
});
app.use((req, res, next) => {
    res.status(404).redirect('/');
});
//s

//store.sync();
app.listen(process.env.APP_PORT,()=>{
    console.log('prendio esta monda')
});

