import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';
import { v4 as uuidv4 } from "uuid";
function DisplayCampaigns ({title, isLoading, campaigns = []}) {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {state: campaign});
    }

    return (
        <div>
            <h1 className='font-poppins font-semibold text-[24px] text-black text-left'>{title} ({campaigns.length})</h1>
            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {isLoading && (
                    <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className='font-poppins font-semibold text-[14px] leading-[30px] text-black'>No Campaigns Found</p>
                )}
                
                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
                key={uuidv4()} {...campaign} handleClick={() => handleNavigate(campaign)}/>)}
            </div>
        </div>
    )
}

export default DisplayCampaigns;