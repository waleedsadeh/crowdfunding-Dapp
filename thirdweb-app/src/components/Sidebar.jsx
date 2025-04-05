import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { thirdweblogo} from "../assets";
import { navlinks } from "../navlinks";
import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({styles, name, imgUrl, isActive, disabled, handleClick}) => (
    <div className={`w-[48px] h-[48px] ${isActive && isActive === name} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
        {!isActive ? (
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2 " />
        ) : (
            <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
        )}
    </div>
)

function Sidebar() {
    const navigate = useNavigate();
    const [active, setActive] = useState("dashboard");
    const disconnect = useDisconnect();
    
    const handleLogout = async () => {
        try {
            await disconnect();
            console.log("Disconnected from wallet");
            navigate('/');
        } catch (error) {
            console.error("Error disconnecting wallet:", error);
        }
    };
    
    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[55vh]">            
            <Link to="/">
                <Icon styles="w-[64px] h-[64px] rounded-[20px] bg-[#171a19]"  imgUrl={thirdweblogo}/>
            </Link>
            <div className="flex-1 flex flex-col justify-between items-center bg-[#171a19] rounded-[20px] w-[76px] py-3 mt-10">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((link) => (
                        <Icon 
                            key={link.name} 
                            {...link} 
                            isActive={active} 
                            handleClick={() => {
                                if(link.name === 'logout') {
                                    handleLogout();
                                } else {
                                    setActive(link.name);
                                    navigate(link.link);
                                }
                            }} 
                        />
                    ))}
                </div>
            </div>
        </div>    
    );
}

export default Sidebar;