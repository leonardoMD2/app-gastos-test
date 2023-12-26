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

const getSumatory = async (req, res) => {
    const persona = req.params.persona
    console.log("persona: ", persona)

    const totales = {
        Total:0,
        Varios:2,
        Regalos:0,
        Comida:0,
        Servicios:0,
        Tarjeta:0
        }
  
    try {
        const allGastosPersona = await Gastos.find({realizado:persona})

        for (const gasto of allGastosPersona) {
          console.log("here: ",gasto)
            switch (gasto.tipo) {
              case "Varios":
                totales.Varios += gasto.monto;
                break;
              case "Regalos":
                totales.Regalos += gasto.monto;
                break;
              case "Comida":
                totales.Comida += gasto.monto;
                break;
              case "Servicios":
                totales.Servicios += gasto.monto;
                break;
              case "Tarjeta":
                totales.Tarjeta += gasto.monto;
                break;
            }
            totales.Total += gasto.monto
          }
       

        res.json({totales})

    } catch (error) {
        res.send({msg:error})
    }
    

}
export{
    getAllGastos,
    postGasto,
    getSumatory
}