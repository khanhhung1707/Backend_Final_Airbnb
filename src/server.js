import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import CommentRouter from './routes/commentRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';


const app = express();

app.use(cors())
app.use(express.json());


app.use(authRouter)
app.use(CommentRouter)
app.use(bookingRouter)


app.listen(8080)
