"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export default function Timeline({ timelineData }) {
    const [isOpen, setIsOpen] = useState(false);

    // Calculate the height dynamically based on the number of items
    const collapsedHeight = 800;
    const expandedHeight = 800 + (timelineData.length - 2) * 300;

    // Calculate the top position for the final timeline slice and bottom circle
    const finalSliceTop = 300 + (timelineData.length - 2) * 300;
    const bottomCircleTop = 340 + (timelineData.length - 2) * 300;

    return (
        <div className={`relative overflow-hidden w-[640px] transition-all duration-500`} style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}>
            {/* Initial Timeline Slice */}
            <div className="w-[520px] h-0 left-[320px] top-[520px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
            <div className="w-40 left-[320px] top-[30px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                <div className="self-stretch h-10 text-center justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    {timelineData[0].year}</div>
                <div className="w-40 h-0 origin-top-left -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
                <div className="w-[300px] h-20 left-[15px] top-[50px] absolute text-left justify-start text-black text-xl font-normal font-['Belleza']">
                    {timelineData[0].text}</div>
            </div>
            <div className="w-6 h-6 bg-[#507153] rounded-full absolute left-[308px] top-[0px]"></div>

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="left-[500px] top-[180px] absolute">{isOpen ? 'See Less' : 'See More' }</CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? 'collapsible-content-enter' : 'collapsible-content-exit'}>
                    {/* Collapsible Timeline Slice */}
                    <div className={`w-[1000px] h-0 left-[320px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]`} style={{ top: `${40 + (timelineData.length - 1) * 300}px`}} />
                    {timelineData.slice(1, -1).map((item, index) => (
                        <div key={index} className={`w-40 ${index % 2 === 0 ? 'right-[320px]' : 'left-[320px]'} top-[${300 + index * 300}px] absolute inline-flex flex-col justify-start items-center gap-2.5`}>
                            <div className={`self-stretch h-10 text-${index % 2 === 0 ? 'left' : 'center'} justify-start text-zinc-900 text-2xl font-semibold font-['Atma']`}>
                                {item.year}</div>
                            <div className={`w-40 h-0 origin-top-${index % 2 === 0 ? 'right' : 'left'} -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]`} />
                            <div className={`w-[300px] h-32 ${index % 2 === 0 ? 'left-[-160px]' : 'left-[20px]'} top-[60px] absolute text-${index % 2 === 0 ? 'right' : 'left'} justify-start text-black text-xl font-normal font-['Belleza']`}>
                                {item.text}</div>
                            <img className={`w-48 h-48 ${index % 2 === 0 ? 'left-[260px]' : 'left-[-260px]'} top-[-40px] absolute origin-top-left rotate-[${index % 2 === 0 ? '-13deg' : '13deg'}] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white`} 
                                src={item.image} />
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>

            {/* Final Timeline Slice */}
            <div className={`w-40 right-[320px] absolute inline-flex flex-col justify-start items-center gap-2.5 transition-all duration-500`} style={{ top: isOpen ? `${finalSliceTop}px` : '400px' }}>
                <div className="self-stretch h-10 text-left justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    {timelineData[timelineData.length - 1].year}</div>
                <div className="w-40 h-0 origin-top-right -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
            </div>
            <img className="w-48 h-48 left-[60px] top-0 absolute origin-top-left rotate-[15deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" src={timelineData[0].image} />
            <img className={`w-48 h-48 left-[400px] absolute origin-top-left rotate-[-13deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white transition-all duration-500`} style={{ top: isOpen ? `${finalSliceTop + 5}px` : '400px' }} src={timelineData[timelineData.length - 1].image} />
            <div className={`w-[300px] h-28 left-[0px] absolute text-right justify-start text-black text-xl font-normal font-['Belleza'] transition-all duration-500`} style={{ top: isOpen ? `${finalSliceTop + 50}px` : '450px' }}>
                {timelineData[timelineData.length - 1].text}
            </div>
            <div className={`w-6 h-6 bg-[#507153] rounded-full absolute left-[308px] transition-all duration-500`} style={{ top: isOpen ? `${bottomCircleTop}px` : '500px' }}></div>
        </div>
    );
}

