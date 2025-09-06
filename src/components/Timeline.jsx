"use client";

import TimelineItem from "@/components/TimelineItem";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import useTimeline from "@/hooks/useTimeline";
import styles from "@/styles/Timeline.module.css";

/**
 * Timeline component that displays a vertical timeline.
 *
 * It uses the TimelineItem component to render individual items.
 * The timeline can be expanded or collapsed to show more items.
 * It supports both collapsible and non-collapsible modes.
 *
 * @component
 *
 * @param {Object} props - The properties for the Timeline component.
 * @param {Object[]} props.timelineData - Array of timeline item data.
 * Each item should contain properties: year, text, and image.
 * @param {string} props.timelineData[].year - The year associated with the timeline item.
 * @param {string} props.timelineData[].text - The text description of the timeline item.
 * @param {string} props.timelineData[].image - The URL of the image associated with the timeline item.
 * @param {boolean} [props.collapsible=true] - Whether the timeline is collapsible.
 *
 * @returns {JSX.Element} The rendered Timeline component.
 */
export default function Timeline({ timelineData, collapsible = true }) {
    // Custom hook to manage the timeline state
    // It provides the API for the collapsible component, current state, and height calculations
    const { isOpen, setIsOpen, collapsedHeight, expandedHeight } = useTimeline(timelineData);

    // non-collapsible timeline rendering
    if (!collapsible) {
        return (
            <div
                className="relative mb-20 flex h-full w-full items-center justify-center overflow-visible"
                style={{ height: `${expandedHeight}px` }}
            >
                {/* Vertical line */}
                <div
                    className="bg-green absolute left-1/2 w-[6px] -translate-x-1/2 transform rounded-full"
                    style={{ height: `${expandedHeight}px`, top: 0 }}
                />

                {/* Render all timeline items */}
                {timelineData.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}

                {/* Starting dot */}
                <div
                    className="bg-green absolute top-[-5px] h-6 w-6 rounded-full"
                    style={{ left: "calc(50% - 12px)" }}
                />

                <div className="font-display text-green absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-center text-lg sm:text-2xl md:text-3xl lg:text-3xl">
                    This is only the beginning!
                </div>
            </div>
        );
    }

    // Collapsible timeline rendering
    return (
        <div
            className={`relative mb-20 flex h-full w-full items-center justify-center overflow-visible transition-all duration-50`}
            style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px` }}
        >
            {/* Vertical line in the center of the timeline */}
            <div
                className="bg-green absolute left-1/2 w-[6px] -translate-x-1/2 transform rounded-full transition-all duration-500"
                style={{ height: isOpen ? `${expandedHeight}px` : `${collapsedHeight}px`, top: 0 }}
            />
            {/* Collapsible section for additional timeline items */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <div>
                        {/* Invisible layer to trigger the open/close interaction */}
                        <div className="absolute inset-0 z-10 cursor-pointer opacity-0"></div>
                        {/* Display text when collapsed */}
                        <div className="hover:text-green absolute top-[420px] z-10 cursor-pointer text-3xl">
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
                {isOpen && (
                    <div className="font-display text-green absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-center text-lg sm:text-2xl md:text-3xl lg:text-3xl">
                        This is only the beginning!
                    </div>
                )}
            </Collapsible>

            {/* Initial timeline items always shown */}
            <TimelineItem item={timelineData[0]} index={0} />
            <div
                className="bg-green absolute top-[-5px] h-6 w-6 rounded-full"
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
