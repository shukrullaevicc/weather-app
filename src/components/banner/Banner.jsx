import Container from "../../utils";
import { useSelector } from "react-redux";

const Banner = () => {
  const data = useSelector((state => state.searchCity));
  return (
    <div>
      <Container>
      <div className="bg-light bg-cover bg-center rounded-[20px] h-[300px] md:h-[350px] lg:h-[400px] mt-[30px] md:mt-[40px] lg:mt-[50px] overflow-hidden p-5 md:p-8 lg:p-10 flex items-end">
  {data && (
    <div className="flex flex-col md:flex-row items-start md:items-end w-full">
      <div className="flex-1">
        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold">{data.current.temp_c}°</h1>
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl">{data.location.name}, {data.location.country}</h2>
      </div>
      <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
        <p className="text-white font-semibold text-sm md:text-lg lg:text-xl hidden md:block">{data.location.localtime.split(" ")[1]}</p>
        <p className="text-white text-xs md:text-sm lg:text-base hidden md:block">{data.current.condition.text} time</p>
      </div>
    </div>
  )}
</div>
      </Container>
    </div>
  );
};

export default Banner;