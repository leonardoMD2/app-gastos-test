import  Express  from "express";
import { getAllGastos, postGasto } from "../controller/moviesController.js";


const router = Express.Router()

router.get('/gastos', getAllGastos)
router.post('/gastos', postGasto)

export {
    router
}