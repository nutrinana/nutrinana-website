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
    const collapsedHeight = 650;
    const expandedHeight = 620 + (timelineData.length - 2) * 300;

    // Calculate the top position for the final timeline slice and bottom circle
    const finalSliceTop = 300 + (timelineData.length - 2) * 300;
    const bottomCircleTop = 540 + (timelineData.length - 2) * 300;

    return (
        <div className={`relative overflow-hidden w-[640px] transition-all duration-500`} style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}>
            {/* Collapsible Trigger covering the entire component */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div className="absolute inset-0 cursor-pointer opacity-0 z-10"></div>
                </CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? 'collapsible-content-enter' : 'collapsible-content-exit'}>
                    {/* Collapsible Timeline Slice */}
                    <div className={`h-0 left-[320px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]`} style={{ width: `${200 + (timelineData.length - 2) * 300}px`, top: `${240 + (timelineData.length - 1) * 300}px` }} />
                    {timelineData.slice(2).map((item, index) => (
                        <div key={index} className={`w-40 ${index % 2 === 0 ? 'left-[320px]' : 'right-[320px]'} absolute inline-flex flex-col justify-start items-center gap-2.5`} style={{ top: `${600 + index * 300}px` }}>
                            <div className={`self-stretch h-10 text-${index % 2 === 0 ? 'center' : 'left'} justify-start text-zinc-900 text-2xl font-semibold font-['Atma']`}>
                                {item.year}</div>
                            <div className={`w-40 h-0 origin-top-${index % 2 === 0 ? 'left' : 'right'} -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]`} />
                            <div className={`w-[300px] h-32 ${index % 2 === 0 ? 'left-[20px]' : 'left-[-160px]'} top-[60px] absolute text-${index % 2 === 0 ? 'left' : 'right'} justify-start text-black text-xl font-normal font-['Belleza']`}>
                                {item.text}</div>
                            <img className={`w-48 h-48 ${index % 2 === 0 ? 'left-[-260px]' : 'left-[260px]'} top-[-40px] absolute origin-top-left rotate-[${index % 2 === 0 ? '15deg' : '-13deg'}] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white`} 
                                src={item.image} />
                        </div>
                    ))}
                    {/* Bottom Circle */}
                    <div className={`w-6 h-6 bg-[#507153] rounded-full absolute left-[308px] transition-all duration-500`} style={{ top: `${bottomCircleTop}px` }}></div>
                    {/* Final Message */}
                    <div className={`w-[300px] h-32 absolute text-center left-[160px] justify-start text-black text-2xl font-normal font-['Belleza']`} style={{ top: `${40 + bottomCircleTop}px` }}>
                        This is only just the beginning!
                    </div>
                </CollapsibleContent>
            </Collapsible>

            {/* Initial Timeline Slice */}
            <div className="w-[520px] h-0 left-[320px] top-[520px] absolute origin-top-left -rotate-90 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
            <div className="w-40 left-[320px] top-[30px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                <div className="self-stretch h-10 text-center justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    {timelineData[0].year}</div>
                <div className="w-40 h-0 origin-top-left -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
                <div className="w-[300px] h-20 left-[15px] top-[50px] absolute text-left justify-start text-black text-xl font-normal font-['Belleza']">
                    {timelineData[0].text}</div>
            </div>
            <img className="w-48 h-48 left-[60px] top-0 absolute origin-top-left rotate-[15deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" src={timelineData[0].image} />
            <div className="w-6 h-6 bg-[#507153] rounded-full absolute left-[308px] top-[0px]"></div>

            {/* Second Timeline Slice */}
            <div className="w-40 right-[320px] top-[330px] absolute inline-flex flex-col justify-start items-center gap-2.5">
                <div className="self-stretch h-10 text-center justify-start text-zinc-900 text-2xl font-semibold font-['Atma']">
                    {timelineData[1].year}</div>
                <div className="w-40 h-0 origin-top-right -rotate-180 outline outline-[3px] outline-offset-[-1.5px] outline-[#507153]" />
                <div className="w-[300px] h-20 left-[-160px] top-[50px] absolute text-right justify-start text-black text-xl font-normal font-['Belleza']">
                    {timelineData[1].text}</div>
            </div>
            <img className="w-48 h-48 left-[400px] top-0 absolute origin-top-left top-[320px] rotate-[-13deg] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[6px] border-white" src={timelineData[1].image} />
            {/* <div className="w-6 h-6 bg-[#507153] rounded-full absolute left-[308px] top-[300px]"></div> */}

            {/* Blurred Overlay for Second Timeline Slice */}
            {!isOpen && (
                <div className="absolute top-[300px] w-[640px] h-[300px] backdrop-blur-sm"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 120% 60% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(ellipse 120% 60% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
                    }}>
                </div>
            )}
            <div className={`left-[250px] top-[420px] text-3xl absolute`} style={{ background: isOpen ? `` : 'white' }}>{isOpen ? '' : 'See More' }</div>
        </div>
    );
}

