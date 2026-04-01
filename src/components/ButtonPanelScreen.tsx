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

const handleButtonHome = async () => {
    const r = await fetch(`${PUBLIC_API_URL}/press-home`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const handleButtonYMinus = async () => {
    const r = await fetch(`${PUBLIC_API_URL}/press-y-minus`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const handleButtonYPlus = async () => {
    const r = await fetch(`${PUBLIC_API_URL}/press-y-plus`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const handleButtonXMinus = async () => {
    const r = await fetch(`${PUBLIC_API_URL}/press-x-minus`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const handleButtonXPlus = async () => {
    const r = await fetch(`${PUBLIC_API_URL}/press-x-plus`, {method: "POST"});
    console.log(`The response: ${r}`);
};

const ButtonPanelScreen = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex grid grid-cols-3 gap-4">
                {CustomButton({onClick:handleButtonHome, label:"Homing", className:"flex-auto gap-4  h-[128px] bg-[#393939]" })}
                {CustomButton({onClick:handleButtonYMinus, label:"Y Minus", className:"flex-auto gap-4  h-[128px]" })}
                {CustomButton({onClick:() => null, label:" ", className:"flex-auto gap-4  h-[128px] bg-[#696969]"})}
                {CustomButton({onClick:handleButtonXPlus, label:"X Plus", className:"flex-auto gap-4  h-[128px]" })}
                {CustomButton({onClick:() => null, label:" ", className:"flex-auto gap-4  h-[128px] bg-[#696969]"})}
                {CustomButton({onClick:handleButtonXMinus, label:"X Minus", className:"flex-auto gap-4  h-[128px]" })}
                {CustomButton({onClick:() => null, label:" ", className:"flex-auto gap-4  h-[128px] bg-[#696969]"})}
                {CustomButton({onClick:handleButtonYPlus, label:"Y Plus", className:"flex-auto gap-4  h-[128px]" })}
                {CustomButton({onClick:() => null, label:" ", className:"flex-auto gap-4  h-[128px] bg-[#696969]"})}
            </div>
            <hr />
            <div className="grid grid-cols-3 gap-4">
                {CustomButton({onClick:handleButton1Get,  label:"Button 1, Get", className:"flex-auto gap-4  h-[64px]" })}
                {CustomButton({onClick:handleButton1Post, label:"Button 1, Post", className:"flex-auto gap-4  h-[64px]" })}
            </div>
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