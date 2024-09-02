import { BiSun } from "react-icons/bi"; 
import { useSelector } from 'react-redux'
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import Container from '../../utils'
import Arrow from '../../images/arrow.png'

import { BsSunrise, BsSunset, BsDroplet, BsFillSunFill } from "react-icons/bs";

const Indicators = () => {
   const data = useSelector((state => state.searchCity));
   if(!data) return 

   const date = data.forecast.forecastday.map(day => day.date.split("-")[2]) // Date
   const temp = data.forecast.forecastday.map(day => day.day.maxtemp_c) // Temperature

   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   const labels = data.forecast.forecastday[0].hour.map(hour => hour.time.split(" ")[1]);
   const chartData = {
      labels: labels,
      datasets: [
         {
         label: "Weather data for" + data.location.name,
         backgroundColor: "pink",
         borderColor: "purple",
         data: data.forecast.forecastday[0].hour.map(hour => hour.temp_c),
         },
      ],
   };

  return (
   <Container>
      <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
         {/* Humidity and sunrise/sunset */}
         <div className="max-w-full lg:max-w-[380px] w-full flex flex-col gap-5">
            <div className="bg-white shadow-3xl flex-1 max-h-[250px] grid grid-cols-2 grid-rows-2 rounded-xl p-5 drop-shadow-lg">
               
               <div className="flex items-center gap-3 p-3">
                  <BsDroplet className="text-4xl text-purple-800" />
                  <p>
                     <span className="text-purple-800">Humidity</span>
                     <br />
                     <strong className="text-xl text-purple-700">
                        {data.current.humidity}%
                     </strong>
                  </p>
               </div>

               <div className="flex items-center gap-3 p-3 border-l-2 border-purple-700">
                  <BsSunset className="text-4xl text-purple-800" />
                  <p>
                     <span className="text-purple-800">Sunset</span>
                     <br />
                     <strong className="text-xl text-purple-700">
                        {data.forecast.forecastday[0].astro.sunset}
                     </strong>
                  </p>
               </div>

               <div className="flex items-center gap-3 p-3">
                  <BiSun className="text-4xl text-purple-800" />
                  <p>
                     <span className="text-purple-800">UV index</span>
                     <br />
                     <strong className="text-xl text-purple-700">
                        {data.current.uv}
                     </strong>
                  </p>
               </div>

               <div className="flex items-center gap-3 p-3 border-l-2 border-purple-700">
                  <BsSunrise className="text-4xl text-purple-800" />
                  <p>
                     <span className="text-purple-800">Sunrise</span>
                     <br />
                     <strong className="text-xl text-purple-700">
                        {data.forecast.forecastday[0].astro.sunrise}
                     </strong>
                  </p>
               </div>
            </div>

            {/* Pressure and wind direction */}
            <div className="flex flex-1 items-center gap-4 bg-white px-5 py-4 rounded-xl bg-linear-color drop-shadow-lg">
               <div className="flex-1 flex items-center justify-center aspect-square rounded-full bg-white bg-pressure bg-center bg-no-repeat bg-cover text-[14px] font-bold">
                  {data.current.pressure_mb + "Pa"}
               </div>
               <div className="flex-1 aspect-square rounded-full bg-white bg-compass bg-center bg-no-repeat bg-cover bg-full flex items-center justify-center">
                  <img style={{ transform: `rotate(${data.current.wind_degree}deg)` }} className="rot w-[60px] sm:w-[80px] md:w-[100px] transition-all duration-500" src={Arrow} alt=""/>
               </div>
            </div>
         </div>

         {/* Temperature and weather chart */}
         <div className="flex flex-1 flex-col gap-4 bg-white rounded-xl p-4 md:p-7 max-w-full lg:max-w-[780px] drop-shadow-lg">
            <Line data={chartData} />
            <div>
               <div className="flex justify-between text-3xl text-center">
                  {date.map((day, index) => (
                     <div key={index} className="flex flex-col items-center justify-center text-[14px] sm:text-[16px] md:text-[18px]">
                        {days.map((day) => day)[day.split(" ")[0] - 1]}
                        <BsFillSunFill className="text-yellow-400" />
                        <p className="text-[12px] sm:text-[14px]"> {temp.map((temp) => temp)[index]}° </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

   </Container>
  )
}

export default Indicators