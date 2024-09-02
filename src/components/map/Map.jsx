import { useSelector } from 'react-redux';
import Container from '../../utils';

const Map = () => {
  const data = useSelector((state) => state.searchCity);

   return (
      <Container>
         <div className="w-full p-5 bg-white rounded-xl drop-shadow-lg">
            {data && (
               <iframe style={{ width: '100%', height: '250px' }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.location.name)}&t=&z=12&output=embed`}
                  frameBorder="0" allowFullScreen
               ></iframe>
            )}
         </div>
      </Container>
   );
};

export default Map;
