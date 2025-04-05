import React, { useContext, createContext } from "react";
import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x9E28Ed67a1AA0c8c4CcbAb8Fb5672Cb3a0C66172");
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

    const address = useAddress();
    const connect = useMetamask(); // Use the useMetamask hook for wallet connection

    const publishCampaign = async (form) => {
        try {
            // Convert goal to wei
            const goalInWei = ethers.utils.parseUnits(form.goal.toString(), 18);

            // Call the createCampaign function with the correct arguments
            const data = await createCampaign({
                args: [
                    form.title, // _title
                    form.description, // _description
                    address, // _owner
                    goalInWei, // _goal
                    form.deadline, // _deadline
                    form.image, // _image
                ],
            });

            console.log("Contract call success:", data);
        } catch (error) {
            console.error("Contract call failed:", error);
        }
    };

    const getCampaigns = async () => {
        try {
            const campaigns = await contract.call("getCampaigns");

            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                goal: ethers.utils.formatUnits(campaign.goal.toString(), 18), // Convert goal from wei to ETH
                deadline: campaign.deadline.toNumber(), // Keep as UNIX timestamp in seconds
                amountRaised: ethers.utils.formatUnits(campaign.moneyRaised.toString(), 18), // Convert amountRaised from wei to ETH
                image: campaign.image,
                pId: i,
            }));

            console.log("Parsed campaigns:", parsedCampaigns);
            return parsedCampaigns;
        } catch (error) {
            console.error("Failed to fetch campaigns:", error);
            return [];
        }
    };

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
        return filteredCampaigns;
    };

    const fundCampaign = async (pId, amount) => {
        const data = await contract.call("fundCampaign", [pId], {value: ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call("getDonators", [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });

        }
        return parsedDonations;
    }

    const getUserDonations = async (userAddress) => {
        const [userDonations, totalDonated] = await contract.call("getUserDonations", [userAddress]);
        const parsedDonations = userDonations.map((donation) => ethers.utils.formatEther(donation.toString()));
        const parsedTotalDonated = ethers.utils.formatEther(totalDonated.toString());
        return [parsedDonations, parsedTotalDonated];
    };

    return (
        <StateContext.Provider value={{ address, contract, getUserCampaigns, getCampaigns, fundCampaign, getDonations, connect, createCampaign: publishCampaign, getUserDonations }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);