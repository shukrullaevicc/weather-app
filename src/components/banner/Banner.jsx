import React, { useEffect, useState } from "react";
import Container from "../../utils";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components, including the scale
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const defaultData = {
  location: {
    name: "Tashkent",
    country: "Uzbekistan",
    localtime: new Date().toISOString(),
  },
  current: {
    feelslike_c: 27.3,
    humidity: 34,
    uv: 1,
  },
  forecast: {
    forecastday: [
      {
        astro: {
          sunset: "2024-08-28T19:05:00",
          sunrise: "2024-08-28T05:44:00",
        },
        hour: Array.from({ length: 24 }, (_, i) => ({
          time: `2024-08-28 ${String(i).padStart(2, '0')}:00`,
          temp_c: 20 + i * 0.5,
        })),
      },
    ],
  },
};

const Banner = () => {
  const searchData = useSelector((state) => state.searchCity);
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchData) {
      setData(searchData);
      setLoading(false);
    }
  }, [searchData]);

  const hourlyData = data.forecast.forecastday[0].hour;
  const labels = hourlyData.map((hour) => hour.time.split(" ")[1]);
  const temperatures = hourlyData.map((hour) => hour.temp_c);

  const graphData = {
    labels,
    datasets: [
      {
        label: `Weather data for ${data.location.name}`,
        data: temperatures,
        fill: false,
        backgroundColor: "rgba(99, 132, 255, 0.2)",
        borderColor: "rgba(99, 132, 255, 1)",
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const graphOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Container>
        {loading && (
          <div className="flex justify-center items-center h-[400px] bg-gray-200 rounded-[20px] mt-[50px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent border-dashed rounded-full animate-spin mb-4"></div>
              <div className="text-lg text-gray-600">Loading data...</div>
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* Banner Section */}
            <div className="bg-banner bg-cover bg-center bg-no-repeat rounded-[20px] h-[200px] md:h-[400px] mt-[50px] relative flex justify-between items-end p-4 md:p-8">
              <div className="text-white text-left">
                <div className="text-[40px] md:text-[70px] font-bold leading-none">
                  {data.current.feelslike_c}°
                </div>
                <div className="text-[20px] md:text-[30px] mt-2">
                  {data.location.name}, {data.location.country}
                </div>
              </div>

              <div className="text-white text-right">
                <div className="text-[16px] md:text-[24px] font-bold">
                  {new Date(data.location.localtime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-[14px] md:text-[18px]">
                  Sunset Time,{" "}
                  {new Date(data.location.localtime).toLocaleString("en-US", {
                    weekday: "long",
                  })}
                </div>
              </div>
            </div>

            {/* Weather Details Section */}
            <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white rounded-lg shadow-lg mt-6 p-6 flex justify-between items-center space-x-6 bg-gradient-to-r from-purple-50 to-purple-100">
                {/* Left Column: Humidity and UV Index */}
                <div className="flex flex-col space-y-4">
                  {/* Humidity Section */}
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3C12 3 5 9 5 15a7 7 0 0014 0c0-6-7-12-7-12z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">Humidity</h2>
                      <p className="text-gray-600">{data.current.humidity}%</p>
                    </div>
                  </div>

                  {/* UV Index Section */}
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v2M12 21v-2M4.22 4.22l1.42 1.42M18.36 18.36l-1.42-1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l-1.42 1.42M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">UV Index</h2>
                      <p className="text-gray-600">{data.current.uv} out of 10</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-l-2 border-gray-300 h-20"></div>

                {/* Right Column: Sunset and Sunrise */}
                <div className="flex flex-col space-y-4">
                  {/* Sunset Section */}
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6l-2 2m4 0l-2-2m4 8v2m-8-2v2m-4 0h16m2 0a9 9 0 10-18 0h18z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">Sunset</h2>
                      <p className="text-gray-600">
                        {new Date(
                          data.forecast.forecastday[0].astro.sunset
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Sunrise Section */}
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6l-2 2m4 0l-2-2m4 8v2m-8-2v2m-4 0h16m2 0a9 9 0 10-18 0h18z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">Sunrise</h2>
                      <p className="text-gray-600">
                        {new Date(
                          data.forecast.forecastday[0].astro.sunrise
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Graph Section */}
              <div className="bg-white p-4 rounded-lg shadow mt-6">
                <Line data={graphData} options={graphOptions} />
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Banner;
