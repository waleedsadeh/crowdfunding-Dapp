import React from "react";
import { thirdweblogo } from "../assets";
import { daysLeft } from "../utils/util";

function FundCard({owner, title, description, goal, deadline,amountRaised, image, handleClick}) {
    const remainingDays = daysLeft(deadline);
    return (
        <div className="sm:w-[288px] w-full rounded-[20px] bg-[#171a19] cursor-pointer" onClick={handleClick}>
            <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[20px]"/>
            <div className="flex flex-col p-4">
                <div>
                    <img src={thirdweblogo} alt="thirdweblogo" className="w-[24px] h-[24px] object-contain" />
                </div>
                <div className="block">
                    <h3 className="text-white font-semibold font-poppins text-[16px] truncate">{title}</h3>
                    <p  className="text-gray-500 font-poppins text-[14px] leading-5 truncate">{description}</p>
                </div>
                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                        <h4 className="font-poppins font-semibold text-[16px] leading-[22px] text-white">{amountRaised}</h4>
                        <p className="sm:max-w-[120px] truncate font-poppins text-[14px] mt-[3px] leading-[22px] text-gray-500"> Raised of {goal}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-poppins font-semibold text-[16px] leading-[22px] text-white">{remainingDays}</h4>
                        <p className="sm:max-w-[120px] truncate font-poppins text-[14px] mt-[3px] leading-[22px] text-gray-500">Days Left</p>
                    </div>
                </div>
                <div className="flex items-center mt-[20px] gap-[12px]">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#e4e1df] flex justify-center items-center">
                        <img src={thirdweblogo} alt="user" className="w-[24px] h-[24px] object-contain" />
                    </div>
                    <p className="font-poppins flex-1 text-[12px] leading-[22px] text-[#e4e1df] truncate">by <span className="text-[#e4e1df]">{owner}</span></p>
                </div>
            </div>
        </div>
    )   
}

export default FundCard;