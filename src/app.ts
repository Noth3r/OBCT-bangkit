import dotenv from 'dotenv';
import express, {Express} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './utils/swagger';
import router from './routes';

dotenv.config();

const app:Express = express();
app.use(helmet())
app.use(express.json())
app.use(cors())

const swaggerOptions = swaggerJsdoc(options)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions, {
    explorer: true
}))

app.use(router)

app.use((req, res) => {
    res.status(404).json({message: 'Not Found'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})