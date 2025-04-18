import React, { useState, useEffect} from 'react';
import { useStateContext } from '../contract-functions';
import { DisplayCampaigns } from '../components';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns} = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
  
  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Profile;