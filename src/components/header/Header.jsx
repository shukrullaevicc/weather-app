import axios from '../../api/axios';

import { BsMoonStars } from "react-icons/bs";
import { BiSun } from "react-icons/bi"; 
import { AiOutlineSearch } from "react-icons/ai"; 

import Container from "../../utils"

import { useState } from "react";
import { useDispatch } from 'react-redux';

function Header() {
   const dispatch = useDispatch();
   const [theme, setTheme] = useState('light');
   const [city, setCity] = useState('');

   const handleSearchCity = async (e) => {
      e.preventDefault();

      try{
         const response = await axios(`forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${city}&days=7&aqi=yes&alerts=yes`);
         const data = response.data;

         dispatch({type: 'SEARCH_CITY', data});
      }catch(error){
         console.log(error);
      }
   }

  return (
   <header>
      <Container>
         <div className="flex items-center justify-between">
            <h1 className="text-indigo-700 text-xl font-bold">Weather App</h1>
            <form onSubmit={handleSearchCity} className="border max-w-[500px] border-gray-300 p-2 rounded-xl flex items-center justify-center">
               <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Search..." className="flex-1 border-none outline-none"/>
               <button><AiOutlineSearch className="text-2xl"/></button>
            </form>
            <div className="border border-gray-300 rounded-[30px] flex relative items-center">
               <input onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} id="theme-toggle" type="checkbox" className="appearance-none w-[70px] h-[35px] cursor-pointer"/>
               <label htmlFor="theme-toggle" className="w-[35px] h-[35px] bg-indigo-700 rounded-full flex items-center justify-center absolute cursor-pointer transition-all left-0">
                  {
                     theme === 'light' ? <BiSun  className="text-xl text-white"/> : <BsMoonStars className="text-xl text-white"/>
                  }
               </label>
            </div>
         </div>
      </Container>
   </header>
  )
}

export default Header