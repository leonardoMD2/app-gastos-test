import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


import './App.css'
const API = "http://localhost:4000/gastos"
console.log(API)
function Post() {
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("")
  const [mes, setMes] = useState("")
  const [monto, setMonto] = useState(0.0)
  const [fecha, setFecha] = useState("")
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)
  const [realizado, setRealizado] = useState("Leo")


 const req = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ nombre:nombre, tipo:tipo, mes:mes, monto:monto, fecha:fecha, realizado:realizado})
  } 

const handleAll = () => {
  console.log(nombre, tipo, mes, monto, fecha, realizado)
  if (nombre != "" && tipo != "" && mes != "" && monto != "" && fecha != "" && realizado != ""){
    fetch(API, req)
    setError(false)
    setDone(true)
  }else{
    setError(true)
    setDone(false)
  }
  

}
const options = [
  { value: 'Leo', label: 'Leo' },
  { value: 'Sofi', label: 'Sofi' },
];
const styleAlertError = error === true ? "flex" : "none"
const styleAlertDone = done === true ? "flex" : "none"

  return (
    <>
      <h1>Posting de Gastos</h1>
      <section className='post-form'> 
      <select value={realizado} onChange={(e) => {setRealizado(e.target.value)}}>
        <option >{options[0].label}</option>
        <option >{options[1].label}</option>
      </select>
      <label htmlFor="title">Nombre</label>
        <input type="text" value={nombre} name="nombre" id="" onChange={(e) => {setNombre(e.target.value)}}/>
        <label htmlFor="year">Tipo</label>
        <input type="text" name="tipo" value={tipo} id="" onChange={(e) => {setTipo(e.target.value)}}/>
        <label htmlFor="stars">Mes</label>
        <input type="text" name="mes" value={mes} id="" onChange={(e) => {setMes((e.target.value))}}/>
        <label htmlFor="urlImg">Monto</label>
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

const ChartsGastos = ({chartPerson}) => {

  const gastos = [];
  const nombre = [];
  const meses = ["Enero", "Febrero", "Marzo" , "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const [data, setData] = useState(null)
  const [mes, setMes] = useState("Enero")
  useEffect(() =>  {
    fetch(API)
      .then(resp => resp.json())
      .then(resp => setData(resp))
  }, [])


  data?.map(gasto => {
    if(mes === gasto.mes && chartPerson == gasto.realizado){
      gastos.push(gasto.monto)
      nombre.push(gasto.nombre)
    }

  })

  
  var midata = {
      labels: nombre,
      datasets: [ // Cada una de las líneas del gráfico
          {
              label: 'Beneficios',
              data: gastos,
              tension: 0.5,
              fill : true,
              borderColor: 'rgba( 46, 204, 113 , 0.5)',
              backgroundColor: 'rgba(  14, 102, 85 , 1)',
              pointRadius: 5,
              pointBackgroundColor: 'rgba(72, 201, 176)',
          }
         
      ],
  };
  
  var misoptions = {
      scales : {
          y : {
              min : 0
          },
          x: {
              ticks: { color: 'rgb(255, 255, 255)'}
          }
      }
  };
console.log("elegido:" ,mes)
  return(
    <>
    <select value={mes} onChange={(e) => {setMes(e.target.value)}}>
      {meses.map(mesActual => {
        return(
          <option >{mesActual}</option>
        )
      })
 }
    </select>
      <Line  data={midata} options={misoptions}/>
    </>
    
  )
}
export{
  MainContainer,
  Fetch,
  Post
}
