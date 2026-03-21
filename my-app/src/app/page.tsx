
"use client"
import Image from "next/image";
import React, {useState} from "react";
import Paycheck from "@/components/Paycheck";
const headers = new Headers();

headers.append("Accept", "application/json");



export default function Home() {
    const [count, setCount] = useState(0);
    const [components, setComponents] = useState([<Paycheck key={-1}/>]);
    const addComponent = () => {
        setCount(count + 1);
        console.log(count);
        setComponents(components.concat(<Paycheck key={count}/>))
    };

    const removeComponent = () => {
        setCount(count + 1);
        console.log(count);
        setComponents(components.slice(1, components.length));
    }
    return (
        <div className="block justify-center items-center h-lvh w-lvw">
            <div className="flex justify-center items-center w-full h-full">
                <div className={"flex justify-center items-center w-1/2 h-fit bg-white rounded-lg flex-col"}>
                    <button disabled={false} className={"text-black w-5 h-5"} onClick={addComponent} >+</button>
                    <button className={"text-black"} onClick={removeComponent}>-</button>
                    {components.map((component) => (component))}
                    </div>
                </div>
            </div>

    )
}
