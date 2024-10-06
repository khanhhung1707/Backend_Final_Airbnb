import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import CommentRouter from './routes/commentRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import userRouter from './routes/userRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import locationRouter from './routes/locationRoutes.js';


const app = express();

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Information",
            contact: {
                name: "Developer",
            },
            servers: ["http://localhost:8080"],
        },
    },
    apis: ["src/swagger/index.js"], 
};
const specs = swaggerJsDoc(options);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/swagger", swaggerUi.serve, (req, res, next) => {
    console.log("Swagger route accessed");
    next();
}, swaggerUi.setup(specs));

app.use(cors())
app.use(express.json());


app.use(authRouter)
app.use(CommentRouter)
app.use(bookingRouter)
app.use(userRouter)
app.use(roomRouter)
app.use(locationRouter)


app.listen(8080)
