import axios from '../../api/axios';

import { BsMoonStars } from "react-icons/bs";
import { BiSun } from "react-icons/bi"; 
import { AiOutlineSearch } from "react-icons/ai"; 

import Container from "../../utils"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function Header() {
   const dispatch = useDispatch();
   const [city, setCity] = useState('');
   const theme = useSelector((state => state.theme));

   async function loadData() {
      try{
         const response = await axios(`forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${city ? city : 'Tashkent'}&days=7&aqi=yes&alerts=yes`);
         const data = response.data;
         setCity('');
         dispatch({type: 'SEARCH_CITY', data});
      }
      catch(error){
         console.log(error);
      }
   }

   const handleSearchCity = async (e) => {
      e.preventDefault();
      loadData();
   }

   useEffect(() => {
      loadData();
   }, [])

  return (
   <header>
      <Container>
         <div className="flex items-center justify-between gap-4">
            
            <h1 className="text-indigo-700 text-xl font-bold hidden lg:block">Weather App</h1>

            <form onSubmit={handleSearchCity} className="border max-w-[500px] w-full border-gray-300 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
               <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Search..." className="flex-1 border-none outline-none"/>
               <button><AiOutlineSearch className="text-2xl"/></button>
            </form>

            <div className="border border-gray-800 rounded-[30px] flex relative items-center checkbox">
               <input defaultChecked={theme === 'dark'} onChange={e => dispatch({type: 'CHANGE_THEME', theme: e.target.checked ? 'dark' : 'light'})} id="theme-toggle" type="checkbox" className="appearance-none w-[70px] h-[25px] cursor-pointer shadow-inner"/>
               <label htmlFor="theme-toggle" className="w-[35px] h-[25px] bg-indigo-700 rounded-full flex items-center justify-center absolute cursor-pointer transition-all left-0 checkbox-label">
                  {
                     theme === 'light' ? <BiSun  className="text-[15px] text-white"/> : <BsMoonStars className="text-[14px] text-white moon"/>
                  }
               </label>
            </div>

         </div>
      </Container>
   </header>
  )
}

export default Header