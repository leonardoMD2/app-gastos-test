import  Express  from "express";
import { getAllGastos, postGasto, getSumatory } from "../controller/moviesController.js";


const router = Express.Router()

router.get('/gastos', getAllGastos)
router.get('/gastos/:persona', getSumatory)
router.post('/gastos', postGasto)

export {
    router
}