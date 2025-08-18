import { useState, useMemo } from "react";

/**
 * Custom hook to manage the timeline component.
 * It provides the API of the timeline, the collapsed and expanded heights,
 * and the state of the timeline (open or closed).
 *
 * @param {Array} timelineData - The data for the timeline.
 * @returns {Object} - Contains:
 * - isOpen: Boolean indicating if the timeline is open or closed.
 * - setIsOpen: Function to set the state of the timeline (open or closed).
 * - collapsedHeight: The height of the timeline when collapsed.
 * - expandedHeight: The height of the timeline when expanded.
 */
export default function useTimeline(timelineData) {
    // State to hold the open/closed state of the timeline
    const [isOpen, setIsOpen] = useState(false);

    // Fixed height for the collapsed state
    const collapsedHeight = 540;

    // Dynamically calculate the expanded height based on the number of items in the timeline
    const expandedHeight = useMemo(
        () => 600 + (timelineData.length - 2) * 300,
        [timelineData.length]
    );

    return {
        isOpen,
        setIsOpen,
        collapsedHeight,
        expandedHeight,
    };
}
