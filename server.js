import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config'
import connect from './database/conn.js';
import router from './router/route.js';
import bodyParser from 'body-parser';


const app = express();

/** middlewares */
//app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const port = process.env.PORT;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
});


/** api routes */
app.use('/api', router)


/** start server only when we have a valid connection*/
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected to https://localhost:${port}`)
        }) 
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})

