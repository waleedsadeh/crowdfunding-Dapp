import React, { useContext, createContext } from "react";
import { useAddress, useContract, ConnectWallet, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
    const {contract} = useContract("0x9E28Ed67a1AA0c8c4CcbAb8Fb5672Cb3a0C66172");
    const {mutateAsync: createCampaign} = useContractWrite(contract, "createCampaign");

    const address = useAddress();
    const connect = () => <ConnectWallet />;

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                form.title, // title
                form.description, // description
                address, // owner
                form.goal, // money goal
                new Date(form.deadline).getTime(), // deadline,
                form.image,
            ]);
            console.log("contract call success", data);
        } catch (error) {
            console.log("contract call failed", error);   
        }
    }

    return (
        <StateContext.Provider value={{ address, contract, connect, createCampaign: publishCampaign }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);