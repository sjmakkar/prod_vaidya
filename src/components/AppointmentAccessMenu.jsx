import React from 'react'
import { Link } from 'react-router-dom'

const AppointmentAccessMenu = () => {
  return (
    <div className='flex justify-between box-border w-[1000px] h-[44px] bg-white rounded-b-lg items-center shadow-slate-400 text-customTextBlue'>
        <ul className='flex  text-center space-x-8 pl-12 font-bold'>
        <li>
              <button className="bg-blue-500 text-white font-semibold h-[34px] py-1 px-3 rounded-md hover:bg-blue-500 text-sm flex items-center text-nowrap">
                + Create Slots
              </button>
          </li>
          <button className="relative px-4 py-2 text-xs font-bold text-[#131313] transition-all duration-300 border-1 border-[#fff] rounded-xl bg-white shadow-[0_1px_0_1px_#000] overflow-hidden group hover:bg-blue-500 hover:text-white hover:shadow-[0_2px_0_2px_#0d3b66] active:scale-90">
              <span className="absolute top-1/2 left-0 w-[-60px] h-[120%] bg-blue-500 transform -translate-y-1/2 skew-x-30 -translate-x-[150%] transition-transform duration-500 group-hover:translate-x-[150%]"></span>
              10:00 AM
          </button>
             
          
            
        </ul>


       

    </div>
  )
}

export default AppointmentAccessMenu