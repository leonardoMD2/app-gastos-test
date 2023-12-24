import { Gastos } from "../db/db.js"
const getAllGastos = async (req,res) => {

    const allGastos = await Gastos.find({})
    console.log(allGastos)
    res.json(allGastos)
}

const postGasto = async (req,res) => {
    console.log(req.body)
    try {
        await Gastos.create(req.body)
        res.send("OK")
    } catch (error) {
        console.log(error.message)
    }
        
   
   
}

export{
    getAllGastos,
    postGasto
}