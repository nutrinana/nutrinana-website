"use client";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTimeline from "@/hooks/useTimeline";

const TimelineItem = ({ item, index }) => (
    <div key={index} className={`absolute inline-flex flex-col items-center gap-2.5 w-[40%] ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} 
    style={{ top: `${30 + index * 300}px` }}>
        <div className={`absolute w-full h-auto top-[-40px] ${index % 2 === 0 ? 'text-right' : 'text-left'} px-5 text-3xl font-semibold text-zinc-900`}>
            {item.year}
        </div>
        <div className={`absolute w-40 h-0 ${index % 2 === 0 ? 'right-[0]' : 'left-[0]'} top-[100%] outline-3 outline-offset-[-1.5px] outline-[#507153]`} />
        <div className={`absolute w-6 h-6 bg-[#507153] rounded-full top-[-12px] ${index % 2 === 0 ? 'right-[140px]' : 'left-[140px]'}`}></div>
        <div className={`absolute w-full h-auto font-normal text-black ${index % 2 === 0 ? 'left-[-20px] text-right' : 'left-[20px] text-left'} top-[20px]`} 
        style={{ display: 'block', fontSize: 'var(--dynamic-font-size)' }}>
            {item.text}
        </div>
        <img className={`absolute w-full h-auto max-w-[200px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-6 border-white object-cover top-[-40px] 
            ${index % 2 === 0 ? 'left-[120%] rotate-[-13deg]' : 'right-[120%] rotate-[15deg]'}`} src={item.image} />
    </div>
);

export default function Timeline({ timelineData }) {
    const {
        isOpen,
        setIsOpen,
        collapsedHeight,
        expandedHeight,
    } = useTimeline(timelineData);

    return (
        <div className={`relative flex justify-center items-center w-full h-full overflow-visible transition-all duration-500`} 
        style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}>
            <div
                className="absolute left-1/2 w-[6px] bg-[#507153] rounded-full transform -translate-x-1/2 transition-all duration-500"
                style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px`, top: 0 }}
            />
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div>
                        <div className="absolute inset-0 z-10 cursor-pointer opacity-0"></div>
                        <div className="absolute text-3xl z-10 cursor-pointer top-[420px] hover:text-[#507153]">
                            <div className="absolute right-[50%] px-1">{isOpen ? '' : 'See '}</div>
                            <div className="absolute left-[50%] px-1">{isOpen ? '' : ' More...'}</div>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? 'collapsible-content-enter' : 'collapsible-content-exit'}>
                    {timelineData.slice(2).map((item, index) => (
                        <TimelineItem key={index + 2} item={item} index={index + 2} />
                    ))}
                </CollapsibleContent>
            </Collapsible>

            <TimelineItem item={timelineData[0]} index={0} />
            <div className="absolute w-6 h-6 bg-[#507153] rounded-full top-[-5px]" style={{ left: 'calc(50% - 12px)' }}></div>
            <TimelineItem item={timelineData[1]} index={1} />

            {!isOpen && (
                <div className="absolute top-[300px] w-full h-[300px] backdrop-blur-sm blurred-overlay"></div>
            )}
        </div>
    );
}
