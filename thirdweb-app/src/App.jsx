import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { Home, Profile, CreateCampaign,CampaignDetails,PaymentHistory } from "./pages";

function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#ead9c9] min-h-screen flex flex-row"> 
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar/>
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/create-campaign" element={<CreateCampaign/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/campaign-details/:id" element={<CampaignDetails/>} />
            <Route path="/payment-history" element={<PaymentHistory/>}/>
        </Routes>
      </div>
    </div>
  );
}   

export default App;