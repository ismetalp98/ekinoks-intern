import express from 'express';
import VendorRouter from './controllers/vendor.controller';
import FoodRouter from './controllers/food.controller';
import CustomerRouter from './controllers/customer.controller';
import AuthRouter from './controllers/auth.controller';
import { responseHandlerMiddleware } from './middlewares/responseHandler.middleware';
import KnexDB from './db/knex';
import config from './config';

export class App {
    app: express.Application;

    constructor() {
        this.app = express();
        this.init();
    };

    init() {
        
        KnexDB.init();
        this.listen();
        this.bind();
    };

    listen() {
        try {
            this.app.listen(config.APP_PORT, () => {
                console.log('Server started on port 8000');
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    };

    bind() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.app.use('/login', AuthRouter);
        this.app.use('/vendor', VendorRouter);
        this.app.use('/customer', CustomerRouter);
        this.app.use('/', FoodRouter);
        
        this.app.use(responseHandlerMiddleware);

    };
};

const app = new App();
