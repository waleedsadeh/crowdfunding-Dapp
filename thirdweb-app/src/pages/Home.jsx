import React, { useState, useEffect} from 'react';
import { useStateContext } from '../contract-functions';
import { DisplayCampaigns } from '../components';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns} = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
  
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Home;