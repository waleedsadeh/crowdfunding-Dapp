import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../contract-functions";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils/util";
import { thirdweblogo } from "../assets";

function CampaignDetails() {
    const { state } = useLocation();
    const { address, getDonations, contract, fundCampaign, getCampaigns } = useStateContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [donators, setDonators] = useState([]);
    const [ownerCampaignCount, setOwnerCampaignCount] = useState(0);

    const remainingDays = daysLeft(state.deadline);

    const fetchDonators = async () => {
        const data = await getDonations(state.pId);
        setDonators(data);
    };

    const fetchOwnerCampaignCount = async () => {
        const campaigns = await getCampaigns();
        const ownerCampaigns = campaigns.filter((campaign) => campaign.owner === state.owner);
        setOwnerCampaignCount(ownerCampaigns.length);
    };

    useEffect(() => {
        if (contract) {
            fetchDonators();
            fetchOwnerCampaignCount();
        }
    }, [contract, address]);

    const handleDonate = async () => {
        setIsLoading(true);

        await fundCampaign(state.pId, amount);

        navigate("/");
        setIsLoading(false);
    };

    return (
        <div>
            {isLoading && <Loader/>}
            <div className="w-full flex flex-col lg:flex-row mt-10 gap-[30px]">
                <div className="flex-1">
                    <img
                        src={state.image}
                        alt="fund"
                        className="w-full h-[410px] object-cover rounded-[20px]"
                    />
                    <div className="relative w-full h-[5px] bg-[#171a19] mt-2">
                        <div
                            className="absolute h-full bg-[#4adc4a]"
                            style={{
                                width: `${calculateBarPercentage(state.goal, state.amountRaised)}%`,
                                maxWidth: "100%",
                            }}
                        ></div>
                    </div>
                </div>

                <div className="lg:w-[250px] w-full flex flex-col gap-[30px]">
                    <CountBox title="Days Left" value={remainingDays} />
                    <CountBox title={`Raised of ${state.goal}`} value={state.amountRaised} />
                    <CountBox title="Total Donators" value={donators.length} />
                </div>
            </div>
            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-poppins font-semibold text-[18px] text-black uppercase">
                            Owner
                        </h4>
                        <div className="flex flex-row items-center gap-[14px] ml-1 mt-[20px]">
                            <div className="w-[52px] h-[52px] rounded-full bg-[#171a19] flex justify-center items-center cursor-pointer">
                                <img
                                    src={thirdweblogo}
                                    alt="user"
                                    className="w-[60%] h-[60%] object-contain "
                                />
                            </div>
                            <div>
                                <h4 className="font-poppins font-semibold text-[14px] text-black break-all">
                                    {state.owner}
                                </h4>
                                <p className="mt-[4px] font-poppins font-normal text-[12px]">
                                    {ownerCampaignCount} campaigns
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-poppins font-semibold text-[18px] text-black uppercase">
                            Story
                        </h4>
                        <div className="mt-[20px]">
                            <p className="leading-[26px] font-poppins font-normal text-justify text-[16px] ml-1">
                                {state.description}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-poppins font-semibold text-[18px] text-black uppercase">
                            Donators
                        </h4>
                        <div className="mt-[20px] flex flex-col gap-4">
                            {donators.length > 0 ? (
                                donators.map((item, index) => (
                                    <div
                                        key={`${item.donator}-${index}`}
                                        className="flex justify-between items-center p-4 bg-[#171a19] rounded-[20px]"
                                    >
                                        <p className="font-poppins text-[#b1b1b1] leading-[26px] break-11">
                                            {index + 1}. {item.donator}
                                        </p>
                                        <p className="font-poppins font-normal text-[#b1b1b1] leading-[26px] break-11">
                                            {item.donation}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="leading-[26px] font-poppins font-normal text-justify text-[16px] ml-1">
                                    No Donators Yet. Be the first one to donate!
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-[18px] text-black uppercase">
                            Fund
                        </h4>
                        <div className="mt-[20px] flex flex-col p-4 bg-[#171a19] rounded-[20px]">
                            <p className="font-poppins font-medium text-[20px] leading-[30px] text-center text-white">
                                Fund the campaign
                            </p>
                            <div className="mt-[30px] ">
                                <input
                                    type="number"
                                    placeholder="ETH 0.3"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    step={0.01}
                                    className="text-[18px] w-full py-[10px] placeholder:text-[#4b5264] text-white sm:px[20px] px-[15px] leading-[30px] rounded-[10px] outline-none border-[1px] border-[#f7f7f7] bg-transparent"
                                />
                                <div className="my-[20px] p-4 bg-[#0e0f0e] rounded-[10px]">
                                    <h4 className="font-poppins font-semibold text-[14px] leading-[22px] text-white">
                                        Back it because you believe in it.
                                    </h4>
                                    <p className="mt-[20px] font-poppins font-normal leading-[22px] text-[12px] text-[#dddfee]">
                                        Support the project for no reward, just because it speaks to
                                        you.
                                    </p>
                                </div>
                                <CustomButton
                                    btnType="button"
                                    title={`Fund Campaign`}
                                    handleClick={handleDonate}
                                    styles="bg-[#8c6dfd] w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignDetails;