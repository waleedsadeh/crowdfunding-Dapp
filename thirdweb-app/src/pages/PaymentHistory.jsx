import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contract-functions';

function PaymentHistory() {
  const [donationCount, setDonationCount] = useState(0); // Number of donations
  const [totalEthDonated, setTotalEthDonated] = useState(0); // Total ETH donated
  const { address, contract, getUserDonations } = useStateContext();

  const fetchDonationData = async () => {
    if (contract && address) {
      const [userDonations, totalDonated] = await getUserDonations(address);
      const count = userDonations.filter((donation) => donation > 0).length;
      setDonationCount(count);
      setTotalEthDonated(totalDonated);
    }
  };

  useEffect(() => {
    fetchDonationData();
  }, [contract, address]);

  return (
    <div>
      <h1 className='text-3xl text-black font-bold'>Payment History</h1>
      <div className='mt-4'>
        <div className='p-4 border bg-[#1c1c24] rounded-[20px]'>
          <h2 className='text-xl text-white font-poppins font-semibold'>Number of Donations</h2>
          <p className='text-lg text-white '>{donationCount}</p>
        </div>
        <div className='p-4 border bg-[#1c1c24] rounded-[20px] mt-4'>
          <h2 className='text-xl text-white font-poppins font-semibold'>Total ETH Donated</h2>
          <p className='text-lg text-white'>{totalEthDonated} ETH</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;