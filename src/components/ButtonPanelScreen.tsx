import { useState } from "react";
import CustomButton from "./custom-button";
// import { PUBLIC_API_URL } from "$env/static/public"; // This is Svelte's convention / configuration
// huh so for Vite you need to append the prefix VITE_* to all your env variables
const PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const handleButton1Get = async () => {
    console.log(`The env file says: ${PUBLIC_API_URL}`);
    const r = await fetch(`${PUBLIC_API_URL}/press-button-1`);
    console.log(`The response: ${r}`);
};

const handleButton1Post = async () => {
    console.log(`The env file says: ${PUBLIC_API_URL}`);
    const r = await fetch(`${PUBLIC_API_URL}/press-button-1`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const ButtonPanelScreen = () => {
    return (
        <div>
            {CustomButton({onClick:handleButton1Get,  label:"Button 1, Get"})}
            {CustomButton({onClick:handleButton1Post, label:"Button 1, Post"})}
        </div>
    );
};

            //     onClick={handleButton1}
            //     className={`w-[220px] h-[220px] rounded-[27px] flex flex-col 
            //     items-center justify-center gap-3 cursor-pointer 
            //     transition-all duration-200 bg-[#d9d9d9] 
            //     hover:bg-[#ccc] hover:scale-[1.02]`}>
            //     Button 1
            // </button>

export default ButtonPanelScreen;