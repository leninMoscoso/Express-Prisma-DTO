import express from "express";
import morgan from 'morgan'
import actorRoutes from './routes/actor.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())

app.use(actorRoutes)
app.use(userRoutes)


app.get('/', (req, res) => {
  res.send("<h1>It's working!</h1>")
})

app.listen(PORT, () => {
  console.log(`API is listening on http://localhost:${PORT}`);
});
