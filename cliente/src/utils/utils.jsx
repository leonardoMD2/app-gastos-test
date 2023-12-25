import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
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

export const tiposDeGastos = ["Varios","Regalos","Comida","Servicios","Tarjeta"]
export const API = "http://localhost:4000/gastos"
export const listaPersonas = [
    { value: 'Leo', label: 'Leo' },
    { value: 'Sofi', label: 'Sofi' },
  ];


export const ChartsGastos = ({chartPerson}) => {

     

    const nombre = [];
    const gastos = [];
     const midata = {
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
    
     const misoptions = {
        scales : {
            y : {
                min : 0
            },
            x: {
                ticks: { color: 'rgb(255, 255, 255)'}
            }
        }
    };
  
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