import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import CommentRouter from './routes/commentRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import userRouter from './routes/userRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import locationRouter from './routes/locationRoutes.js';


const app = express();

app.use(cors())
app.use(express.json());


app.use(authRouter)
app.use(CommentRouter)
app.use(bookingRouter)
app.use(userRouter)
app.use(roomRouter)
app.use(locationRouter)


app.listen(8080)
