"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
    <div
        key={index}
        className={`absolute inline-flex w-[40%] flex-col items-center gap-2.5 ${index % 2 === 0 ? "right-1/2" : "left-1/2"}`}
        style={{ top: `${30 + index * 300}px` }}
    >
        <div
            className={`absolute top-[-40px] h-auto w-full ${index % 2 === 0 ? "text-right" : "text-left"} px-5 text-3xl font-semibold text-zinc-900`}
        >
            {item.year}
        </div>
        <div
            className={`absolute h-[6px] w-40 bg-[#507153] ${index % 2 === 0 ? "right-0" : "left-0"} top-full`}
        />
        <div
            className={`absolute top-[-7px] h-5 w-5 rounded-full bg-[#507153] ${index % 2 === 0 ? "right-[142px]" : "left-[142px]"}`}
        ></div>
        <div
            className={`absolute h-auto w-full font-normal text-black ${index % 2 === 0 ? "left-[-20px] text-right" : "left-[20px] text-left"} top-[20px]`}
            style={{ display: "block", fontSize: "var(--dynamic-font-size)" }}
        >
            {item.text}
        </div>
        <img
            className={`absolute top-[-40px] h-auto w-full max-w-[200px] border-6 border-white object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${index % 2 === 0 ? "left-[120%] rotate-[-13deg]" : "right-[120%] rotate-[15deg]"}`}
            src={item.image}
        />
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
    const { isOpen, setIsOpen, collapsedHeight, expandedHeight } = useTimeline(timelineData);

    return (
        <div
            className={`relative flex h-full w-full items-center justify-center overflow-visible transition-all duration-500`}
            style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}
        >
            {/* Vertical line in the center of the timeline */}
            <div
                className="absolute left-1/2 w-[6px] -translate-x-1/2 transform rounded-full bg-[#507153] transition-all duration-500"
                style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px`, top: 0 }}
            />
            {/* Collapsible section for additional timeline items */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div>
                        {/* Invisible layer to trigger the open/close interaction */}
                        <div className="absolute inset-0 z-10 cursor-pointer opacity-0"></div>
                        {/* Display text when collapsed */}
                        <div className="absolute top-[420px] z-10 cursor-pointer text-3xl hover:text-[#507153]">
                            <div className="absolute right-[50%] px-1">{isOpen ? "" : "See "}</div>
                            <div className="absolute left-[50%] px-1">
                                {isOpen ? "" : " More..."}
                            </div>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent
                    className={
                        isOpen
                            ? styles["collapsible-content-enter"]
                            : styles["collapsible-content-exit"]
                    }
                >
                    {/* Render the additional timeline items */}
                    {timelineData.slice(2).map((item, index) => (
                        <TimelineItem key={index + 2} item={item} index={index + 2} />
                    ))}
                </CollapsibleContent>
            </Collapsible>

            {/* Initial timeline items always shown */}
            <TimelineItem item={timelineData[0]} index={0} />
            <div
                className="absolute top-[-5px] h-6 w-6 rounded-full bg-[#507153]"
                style={{ left: "calc(50% - 12px)" }}
            ></div>
            <TimelineItem item={timelineData[1]} index={1} />

            {/* Blurred overlay when the timeline is collapsed */}
            {!isOpen && (
                <div
                    className={`absolute top-[300px] h-[300px] w-full backdrop-blur-sm ${styles["blurred-overlay"]}`}
                ></div>
            )}
        </div>
    );
}
