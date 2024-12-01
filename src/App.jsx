import './App.css'
import Header from './components/header/Header'
import Banner from './components/banner/Banner'
import Map from './components/map/Map'
import Indicators from './components/Indicators/Indicators'
import { useSelector } from 'react-redux'

function App() {
  const theme = useSelector((state => state.theme))

  return (
    <div data-theme={theme} className={theme === "dark" ? "bg-black" : "bg-white"}>
      <Header/>
      <Banner/>
      <Map/>
      <Indicators/>
    </div>
  )
}

export default App