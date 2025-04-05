import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contract-functions';
import { DisplayCampaigns } from '../components';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();

    // Filter campaigns where days left is greater than 0
    const filteredCampaigns = data.filter((campaign) => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const daysLeft = Math.floor((campaign.deadline - currentTime) / (24 * 60 * 60));
      return daysLeft >= 0;
    });

    setCampaigns(filteredCampaigns);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
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