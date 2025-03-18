"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTimeline from "@/hooks/useTimeline";

export default function Timeline({ timelineData }) {
    const {
        isOpen,
        setIsOpen,
        collapsedHeight,
        expandedHeight,
        bottomCircleTop,
    } = useTimeline(timelineData);

    return (
        <div className="relative flex justify-center items-center w-full h-full overflow-hidden transition-all duration-500" style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}>
            {/* Collapsible Trigger covering the entire component */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div className="absolute inset-0 z-10 cursor-pointer opacity-0"></div>
                </CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? 'collapsible-content-enter' : 'collapsible-content-exit'}>
                    {/* Collapsible Timeline Slice */}
                    <div className="absolute left-1/2 h-0 origin-top-left -rotate-90 outline-3 outline-offset-[-1.5px] outline-[#507153]" style={{ width: `${200 + (timelineData.length - 2) * 300}px`, top: `${240 + (timelineData.length - 1) * 300}px` }} />
                    {timelineData.slice(2).map((item, index) => (
                        <div key={index} className={`absolute inline-flex flex-col items-center gap-2.5 w-40 ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} style={{ top: `${600 + index * 300}px` }}>
                            <div className="self-stretch h-10 text-center text-2xl font-semibold text-zinc-900">
                                {item.year}
                            </div>
                            <div className={`w-40 h-0 origin-top-${index % 2 === 0 ? 'right' : 'left'} outline-3 outline-offset-[-1.5px] outline-[#507153]`} />
                            <div className={`absolute w-6 h-6 bg-[#507153] rounded-full top-[38px] ${index % 2 === 0 ? 'left-[-10px]' : 'right-[-10px]'}`}></div>
                            <div className={`absolute w-[300px] h-32 text-xl font-normal text-black ${index % 2 === 0 ? 'left-[-160px] text-right' : 'left-[20px] text-left'} top-[70px]`}>
                                {item.text}
                            </div>
                            <img className={`absolute w-48 h-48 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-6 border-white object-cover ${index % 2 === 0 ? 'left-[260px] rotate-[-13deg]' : 'left-[-260px] rotate-[15deg]'}`} src={item.image} />
                        </div>
                    ))}
                    {/* bottom circle */}
                    <div className="absolute w-6 h-6 bg-[#507153] rounded-full transition-all duration-500" style={{ top: `${bottomCircleTop}px`, left: 'calc(50% - 12px)' }}></div>
                </CollapsibleContent>
            </Collapsible>

            {/* Initial Timeline Slice */}
            <div className="absolute left-1/2 top-[520px] h-0 origin-top-left -rotate-90 outline-3 outline-offset-[-1.5px] outline-[#507153]" style={{ width: '520px' }} />
            <div className="absolute inline-flex flex-col items-center gap-2.5 w-40 right-1/2 top-[40px]">
                <div className="self-stretch h-10 text-2xl font-semibold text-center text-zinc-900">
                    {timelineData[0].year}
                </div>
                <div className="w-40 h-0 origin-top-left outline-3 outline-offset-[-1.5px] outline-[#507153]" />
                <div className="absolute w-6 h-6 bg-[#507153] rounded-full top-[38px] left-[-10px]"></div>
                <div className="absolute w-[300px] h-20 text-xl font-normal text-right text-black left-[-160px] top-[70px]">
                    {timelineData[0].text}
                </div>
                <img className="absolute w-48 h-48 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-6 border-white object-cover left-[260px] top-[-20px] rotate-[-13deg]" src={timelineData[0].image} />
            </div>
            {/* top circle */}
            <div className="absolute w-6 h-6 bg-[#507153] rounded-full top-[0px]" style={{ left: 'calc(50% - 12px)' }}></div>

            {/* Second Timeline Slice */}
            <div className="absolute inline-flex flex-col items-center gap-2.5 w-40 left-1/2 top-[330px]">
                <div className="self-stretch h-10 text-2xl font-semibold text-center text-zinc-900">
                    {timelineData[1].year}
                </div>
                <div className="w-40 h-0 origin-top-right outline-3 outline-offset-[-1.5px] outline-[#507153]" />
                <div className="absolute w-6 h-6 bg-[#507153] rounded-full top-[38px] right-[-10px]"></div>
                <div className="absolute w-[300px] h-20 text-xl font-normal text-left text-black left-[20px] top-[70px]">
                    {timelineData[1].text}
                </div>
                <img className="absolute w-48 h-48 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-6 border-white object-cover left-[-260px] top-[-20px] rotate-[15deg]" src={timelineData[1].image} />
            </div>

            {/* Blurred Overlay for Second Timeline Slice */}
            {!isOpen && (
                <div className="absolute top-[300px] w-full h-[300px] backdrop-blur-sm"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 120% 60% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(ellipse 120% 60% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
                    }}>
                </div>
            )}
            <div className="absolute text-3xl top-[420px]" style={{ background: isOpen ? '' : 'white' }}>{isOpen ? '' : 'See More'}</div>
        </div>
    );
}

