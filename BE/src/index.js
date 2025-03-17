import express from 'express';
import postRouter from './routes/post-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import cors from 'cors';
import { notFoundHandler, errorHandler } from './middlewares/error-handler.js';


const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(cors());
app.use('/', express.static('src/public'));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);


// 404 virheitä varten
app.use(notFoundHandler);



app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// yleinen virhevastausten lähettäjä kaikkia virhetilanteita varten
app.use(errorHandler);