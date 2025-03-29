import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from './';
import { navlinks } from '../navlinks';
import { search, profile, menu} from '../assets';

function Navbar() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("dashboard");
    const [toggleDrawer, setToggleDrawer] = useState(false);

    const address = "0x1234567890abcdef1234567890abcdef12345678"; // Replace with actual address
    return (
        <div className="flex md:flex-row flex-col-reverse justify-between gap-6 mb-[35px]">
            <div className="lg:flex-1 flex flex-row rounded-[20px]  max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#171a19]">
                <input type="text" placeholder="Search for campaigns" className="flex w-full font-poppins font-normal text-[16px] placeholder:text-[#4b5264] text-white bg-transparent outline-none " />

                <div className="w-[64px] h-full rounded-[20px] bg-[#ead9c9] flex item-center justify-center cursor-pointer">
                    <img src={search} alt="search" className="w-[20px] h-[20px] my-2 object-contain"/>
                </div>
            </div>

            <div className="sm:flex hidden flex-row justify-center gap-4">
                <CustomButton btnType="button" 
                title={address ? 'Create a campaign' : 'Connect'} 
                styles={address ? 'bg-[#1e76db]' : 'bg-[#24c2c8]'}
                handleClick={() => {
                    if(address) {
                        navigate('create-campaign')
                    } else {
                        navigate('later')
                    }}}/>
                <Link to="/profile">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src={profile} alt="user" className="w-[60%] h-[60%] object-contain " />
                    </div>
                </Link>
            </div>
                <div className="sm:hidden flex justify-between items-center relative">
                    <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src={profile} alt="user" className="w-[60%] h-[60%] object-contain " />
                    </div>
                    <img src={menu} className="w-[28px] h-[28px] object-contain cursor-pointer" alt="menu"
                    onClick={() => setToggleDrawer(!toggleDrawer)}/>
                    <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                        <ul className="mb-4">
                            {navlinks.map((link) => (
                                <li
                              key={link.name}
                              className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                              onClick={() => {
                                setIsActive(link.name);
                                setToggleDrawer(false);
                                navigate(link.link);
                              }}>
                              <img 
                                src={link.imgUrl}
                                alt={link.name}
                                className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}/>
                                <p className={`ml-[20px] font-poppins font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                                {link.name}
                              </p>
                                </li>
                            ))}
                        </ul>  
                        <div className="flex mx-4">
                        <CustomButton 
                            btnType="button"
                            title={address ? 'Create a campaign' : 'Connect'}
                            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                            handleClick={() => {
                                if(address) navigate('create-campaign')
                                else connect();
}}/>
            </div>      
                    </div>
                </div>  
        </div>
    );
}

export default Navbar;