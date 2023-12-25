import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 

import { ChartsGastos,tiposDeGastos, API, listaPersonas } from './utils/utils';

import './App.css'


function Post() {
  const [nombre, setNombre] = useState("")
  const [mes, setMes] = useState("")
  const [monto, setMonto] = useState(0.0)
  const [fecha, setFecha] = useState("")
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)
  const [realizado, setRealizado] = useState("Leo")
  const [tipo2, setTipo2] = useState("Varios")

  const styleAlertError = error === true ? "flex" : "none"
  const styleAlertDone = done === true ? "flex" : "none"
 
  const req = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ nombre:nombre, tipo:tipo2, mes:mes, monto:monto, fecha:fecha, realizado:realizado})
  } 

const handleAll = () => {

  if (nombre != "" && tipo2 != "" && mes != "" && monto != "" && fecha != "" && realizado != ""){
    fetch(API, req)
    setError(false)
    setDone(true)
  }else{
    setError(true)
    setDone(false)
  }
  

}



  return (
    <>
      <h1>Posting de Gastos</h1>
      <section className='post-form'> 
      <label htmlFor="Efectuado">Efectuado por</label>
      <select value={realizado} onChange={(e) => {setRealizado(e.target.value)}}>
        <option >{listaPersonas[0].label}</option>
        <option >{listaPersonas[1].label}</option>
      </select>
      <label htmlFor="nombre">Nombre</label>
        <input type="text" value={nombre} name="nombre" id="" onChange={(e) => {setNombre(e.target.value)}}/>
        <label htmlFor="year">Tipo</label>
        <select value={tipo2} onChange={(e => {setTipo2(e.target.value)})}>
            {

              tiposDeGastos.map(item => {
                return(
                  <option key={item}>{item}</option>
                )
              })
            }
        </select>
        <label htmlFor="mes">Mes</label>
        <input type="text" name="mes" value={mes} id="" onChange={(e) => {setMes((e.target.value))}}/>
        <label htmlFor="monto">Monto</label>
        <input type="text" name="monto" value={monto} id="" onChange={(e) => {setMonto(parseFloat(e.target.value))}}/>
        <label htmlFor="Gender">Fecha: YYYY-MM-DD</label>
        <input type="text" name="fecha"value={fecha} id="" onChange={(e) => {setFecha(e.target.value)}}/>
        <button onClick={handleAll}>Send data</button>
        <CommonBtn refer={"/"} text={"Inicio"} />
        <div style={{ display: styleAlertError}}>
          <Alert text="Error, faltan datos" type="error" />
        </div>
        <div style={{ display: styleAlertDone}}>
          <Alert text="Gasto agregado correctamente!" type="done" />
        </div>
        
      </section>
      
    </>
  )
}

function Fetch({who}) {

  const [data, setData] = useState(null)
  useEffect(() =>  {
    fetch(API)
      .then(resp => resp.json())
      .then(resp => setData(resp))
  }, [])

  return (
    <>
      <section className='movies-grid'> 
      {
 
        data?.map(gasto => {
          console.log(gasto.realizado)
          if(gasto.realizado === who){
            return(
              <div className='movies' key={gasto._id}>
                <h3 className='black-type'>{gasto.nombre}</h3>
                <p className='black-type'>Tipo: {gasto.tipo}</p>
                <p className='black-type'>Fecha: {gasto.fecha.slice(0,10)}</p>
              </div>
           ) 
          }
      })
      }
      </section>

      
    </>
  )
}

const CommonBtn = ({refer, text}) => {
  return(
    <Link className="button" to={refer}>{text}</Link>
  )
}
const Alert = ({text, type}) => {
  return (
    <p className={type}>{text}</p>
  )
}

const MainContainer = ({persona1="Sofi", persona2="Leo"}) =>{
  return(
  <>
    <h1>Fetching de gastos</h1>
    <h2>Gastos de: {persona1}</h2>
    <Fetch who={persona1}/>
    <ChartsGastos chartPerson={persona1}/>
    <h2>Gastos de: {persona2}</h2>
    <Fetch who={persona2}/>
    <ChartsGastos chartPerson={persona2}/>
    <div style={{margin:"15px"}}>
        <CommonBtn refer={"post"} text="Agregar gasto"/>
      </div>
  </>

)}




export{
  MainContainer,
  Fetch,
  Post
}
