"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTimeline from "@/hooks/useTimeline";
import styles from "@/styles/Timeline.module.css";

/**
 * TimelineItem component that represents a single item in the timeline.
 * It displays the year, text, and an image associated with the timeline item.
 * 
 * @param {Object} props - The properties for the TimelineItem component.
 * @param {Object} props.item - The timeline item data.
 * @param {number} props.index - The index of the timeline item in the timeline array.
 * @param {string} props.item.year - The year associated with the timeline item.
 * @param {string} props.item.text - The text description of the timeline item.
 * @param {string} props.item.image - The URL of the image associated with the timeline item.
 * 
 * @returns {JSX.Element} The rendered TimelineItem component.
 */
const TimelineItem = ({ item, index }) => (
    <div key={index} className={`absolute inline-flex flex-col items-center gap-2.5 w-[40%] ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} 
    style={{ top: `${30 + index * 300}px` }}>
        <div className={`absolute w-full h-auto top-[-40px] ${index % 2 === 0 ? 'text-right' : 'text-left'} px-5 text-3xl font-semibold text-zinc-900`}>
            {item.year}
        </div>
        <div className={`absolute w-40 h-[6px] bg-[#507153] ${index % 2 === 0 ? 'right-0' : 'left-0'} top-full`} />        
        <div className={`absolute w-5 h-5 bg-[#507153] rounded-full top-[-7px] ${index % 2 === 0 ? 'right-[142px]' : 'left-[142px]'}`}></div>
        <div className={`absolute w-full h-auto font-normal text-black ${index % 2 === 0 ? 'left-[-20px] text-right' : 'left-[20px] text-left'} top-[20px]`} 
        style={{ display: 'block', fontSize: 'var(--dynamic-font-size)' }}>
            {item.text}
        </div>
        <img className={`absolute w-full h-auto max-w-[200px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-6 border-white object-cover top-[-40px] 
            ${index % 2 === 0 ? 'left-[120%] rotate-[-13deg]' : 'right-[120%] rotate-[15deg]'}`} src={item.image} />
    </div>
);

/**
 * Timeline component that displays a vertical timeline with collapsible sections.
 * It uses the TimelineItem component to render individual items.
 * The timeline can be expanded or collapsed to show more items.
 * 
 * @param {Object} props - The properties for the Timeline component.
 * @param {Object[]} props.timelineData - Array of timeline item data.
 * Each item should contain properties: year, text, and image.
 * @param {string} props.timelineData[].year - The year associated with the timeline item.
 * @param {string} props.timelineData[].text - The text description of the timeline item.
 * @param {string} props.timelineData[].image - The URL of the image associated with the timeline item.
 * @returns {JSX.Element} The rendered Timeline component.
 */
export default function Timeline({ timelineData }) {
    // Custom hook to manage the timeline state
    // It provides the API for the collapsible component, current state, and height calculations
    const {
        isOpen,
        setIsOpen,
        collapsedHeight,
        expandedHeight,
    } = useTimeline(timelineData);

    return (
        <div className={`relative flex justify-center items-center w-full h-full overflow-visible transition-all duration-500`} 
        style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}>
            {/* Vertical line in the center of the timeline */}
            <div
                className="absolute left-1/2 w-[6px] bg-[#507153] rounded-full transform -translate-x-1/2 transition-all duration-500"
                style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px`, top: 0 }}
            />
            {/* Collapsible section for additional timeline items */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div>
                        {/* Invisible layer to trigger the open/close interaction */}
                        <div className="absolute inset-0 z-10 cursor-pointer opacity-0"></div>
                        {/* Display text when collapsed */}
                        <div className="absolute text-3xl z-10 cursor-pointer top-[420px] hover:text-[#507153]">
                            <div className="absolute right-[50%] px-1">{isOpen ? '' : 'See '}</div>
                            <div className="absolute left-[50%] px-1">{isOpen ? '' : ' More...'}</div>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={isOpen ? styles['collapsible-content-enter'] : styles['collapsible-content-exit']}>
                    {/* Render the additional timeline items */}
                    {timelineData.slice(2).map((item, index) => (
                        <TimelineItem key={index + 2} item={item} index={index + 2} />
                    ))}
                </CollapsibleContent>
            </Collapsible>

            {/* Initial timeline items always shown */}
            <TimelineItem item={timelineData[0]} index={0} />
            <div className="absolute w-6 h-6 bg-[#507153] rounded-full top-[-5px]" style={{ left: 'calc(50% - 12px)' }}></div>
            <TimelineItem item={timelineData[1]} index={1} />

            {/* Blurred overlay when the timeline is collapsed */}
            {!isOpen && (
                <div className={`absolute top-[300px] w-full h-[300px] backdrop-blur-sm ${styles['blurred-overlay']}`}></div>
            )}
        </div>
    );
}
