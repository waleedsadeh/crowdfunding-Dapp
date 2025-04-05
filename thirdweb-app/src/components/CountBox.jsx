import React from 'react'

function CountBox ({ title, value }) {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-poppins font-bold text-[24px] text-white p-3 bg-[#1c1c24] rounded-t-[20px] w-full text-center truncate">{value}</h4>
      <p className="font-poppins font-normal text-[16px] text-[#808191] bg-[#28282e] rounded-b-[20px] px-3 py-2 w-full rouned-b-[10px] text-center">{title}</p>
    </div>
  )
}

export default CountBox;