import express from 'express';
import cors from 'cors';
import publicRouter from './routes/publicRoutes';
import dbConnect from './utils/db';
const app = express();
const PORT = process.env.PORT || 3000;

dbConnect()
app.use(express.json());
app.use(cors());
app.use(publicRouter);
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.info('Server running on port', PORT);
});
