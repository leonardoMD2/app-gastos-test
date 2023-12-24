import  Express  from "express";
import morgan from "morgan";
import { router } from "./routes/router.js";
import cors from "cors"

const PORT = 4000 ?? process.env.PORT
const app = Express()
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(morgan())
app.use(Express.json()); 
app.use(router)

app.listen(PORT, () => {
    console.log("Listen")
})