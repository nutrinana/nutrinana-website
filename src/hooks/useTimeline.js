import { useState, useMemo } from "react";

export default function useTimeline(timelineData) {
    const [isOpen, setIsOpen] = useState(false);

    const collapsedHeight = 540;
    const expandedHeight = useMemo(() => 600 + (timelineData.length - 2) * 300, [timelineData.length]);

    const finalSliceTop = useMemo(() => 300 + (timelineData.length - 2) * 300, [timelineData.length]);
    const bottomCircleTop = useMemo(() => 540 + (timelineData.length - 2) * 300, [timelineData.length]);

    return {
        isOpen,
        setIsOpen,
        collapsedHeight,
        expandedHeight,
        finalSliceTop,
        bottomCircleTop,
    };
}