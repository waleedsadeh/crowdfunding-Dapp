import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormField ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) {
    return (
        <label className="flex-1 w-full flex flex-col">
        {labelName && (
          <span className="font-poppins font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
        )}
        {isTextArea ? (
          <textarea 
            required
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder={placeholder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#808191] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#4b5264] rounded-[20px] sm:min-w-[300px]"
          />
        ) : inputType === "date" ? (
            <DatePicker
                selected={value}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholder}
                className="w-full py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#808191] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#4b5264] rounded-[20px] sm:min-w-[300px]"
            />
        ) : (
          <input 
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            step="0.1"
            placeholder={placeholder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#808191] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#4b5264] rounded-[20px] sm:min-w-[300px]"
          />
        ) }
      </label>
    );  
}

export default FormField;