import React, { useState} from "react";
import { useNavigate } from "react-router-dom";    
import { ethers } from "ethers";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils/util";

function CreateCampaign() {    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }
    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value });
    }

    return (
        <div className="bg-[#171a19] flex justify-center items-center flex-col rounded-[20px] sm:p-10 p-4">
            {isLoading && 'Loading...'}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1dc071] rounded-[20px]">
                <h1 className="font-poppins font-semibold text-[24px] sm:text-[24px] text-white leading-[36px]">Start a Campaign</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-[64px] w-full flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
                    <FormField labelName="Your Name *" placeholder="Waleed Sadeh" inputType="text" value={form.name} handleChange={(e) => {handleFormFieldChange("name", e)}}/>
                    <FormField labelName="Campaign Title *" placeholder="Need new PC" inputType="text" value={form.title} handleChange={(e) => {handleFormFieldChange("title", e)}}/>
                </div>
                <FormField labelName="description *" placeholder="Write about the campaign" isTextArea={true} value={form.description} handleChange={(e) => {handleFormFieldChange("description", e)}}/>
                <div className="flex flex-wrap gap-[40px]">
                    <FormField labelName="Amount *" placeholder="ETH 5.10" inputType="text" value={form.target} handleChange={(e) => {handleFormFieldChange("target", e)}}/>
                    <FormField labelName="End Date *" placeholder="Select a date" inputType="date" value={form.deadline } handleChange={(date) => setForm({ ...form, deadline: date })}/>
                </div>
                <FormField labelName="Campaign image *" placeholder="Place image URL of your campaign" inputType="url" value={form.image} handleChange={(e) => {handleFormFieldChange("image", e)}}/>
                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton btnType="submit" title="Submit new campaign" styles="bg-[#1dc071]"/>
                </div>
            </form>
        </div>
    );
}    

export default CreateCampaign;