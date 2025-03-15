"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export default function Timeline() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative overflow-hidden w-[640px] transition-all duration-500 ${isOpen ? 'h-[1600px]' : 'h-[800px]'}`}>
            {/* Initial Timeline Slice */}
            <div className="w-[520px] h-0 left-[320px] top-[520px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
            <div className="w-40 left-[320px] top-[30px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                <div className="self-stretch h-10 text-center justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    2021</div>
                <div className="w-40 h-0 origin-top-left -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
                <div className="w-[300px] h-20 left-[15px] top-[50px] absolute text-left justify-start text-black text-xl font-normal font-['Belleza']">
                    The magic begins! Nana perfects her activated granola recipe and starts selling it to her local neighbourhood.</div>
            </div>

            {/* Top Circle */}
            <div className="w-6 h-6 bg-neutral-600 rounded-full absolute left-[308px] top-[0px]"></div>

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="left-[500px] top-[180px] absolute">{isOpen ? 'See Less' : 'See More' }</CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? 'collapsible-content-enter' : 'collapsible-content-exit'}>
                    {/* Collapsible Timeline Slice */}
                    <div className="w-[1000px] h-0 left-[320px] top-[1000px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
                    <div className="w-40 right-[320px] top-[300px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch h-10 text-left justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                            2022</div>
                        <div className="w-40 h-0 origin-top-right -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
                    </div>
                    <div className="w-40 left-[320px] top-[600px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch h-10 text-center justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                            2023</div>
                        <div className="w-40 h-0 origin-top-left -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
                    </div>
                    <div className="w-[300px] h-32 left-[0px] top-[350px] absolute text-right justify-start text-black text-xl font-normal font-['Belleza']">
                        Nana joins forces with a group of green-thumbed garden enthusiasts to grow her own veggies in a shared allotment. 
                        Fresh, home-grown ingredients inspire new recipes, which she shares with her growing Instagram family.</div>
                    <div className="w-[300px] h-20 left-[340px] top-[650px] absolute justify-start text-black text-xl font-normal font-['Belleza']">
                        Nutrinana goes digital! The Activated Granola hits the virtual shelves on DELLI, making its way to kitchens across the UK.</div>
                    <img className="w-48 h-48 left-[400px] top-[300px] absolute origin-top-left rotate-[-13deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" 
                                    src="https://placehold.co/200x216" />
                    <img className="w-48 h-48 left-[60px] top-[550px] absolute origin-top-left rotate-[13deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" 
                                    src="https://placehold.co/200x216" />
                </CollapsibleContent>
            </Collapsible>

            {/* Final Timeline Slice */}
            <div className={`w-40 right-[320px] ${isOpen ? 'top-[870px]' : 'top-[400px]'} absolute inline-flex flex-col justify-start items-center gap-2.5 transition-all duration-500`}>
                <div className="self-stretch h-10 text-left justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    2024</div>
                <div className="w-40 h-0 origin-top-right -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-neutral-600" />
            </div>
            <img className="w-48 h-48 left-[60px] top-0 absolute origin-top-left rotate-[15deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" src="https://placehold.co/200x216" />
            <img className={`w-48 h-48 left-[400px] ${isOpen ? 'top-[875px]' : 'top-[400px]'} absolute origin-top-left rotate-[-13deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
                            border-[6px] border-white transition-all duration-500`} src="https://placehold.co/200x216" />
            <div className={`w-[300px] h-28 left-[0px] ${isOpen ? 'top-[920px]' : 'top-[450px]'} absolute text-right justify-start text-black text-xl font-normal font-['Belleza'] transition-all duration-500`}>
                Nutrinana’s Activated Granola finds a home in the Black Farmers Shop in Brixton, bringing the taste of Nana’s kitchen to even more happy customers.<br/>
                This is only just the beginning!
            </div>

            {/* Bottom Circle */}
            <div className={`w-6 h-6 bg-neutral-600 rounded-full absolute left-[308px] ${isOpen ? 'top-[980px]' : 'top-[500px]'} transition-all duration-500`}></div>
        </div>
    );
}

