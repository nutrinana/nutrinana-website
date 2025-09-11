import Image from "next/image";

/**
 * TimelineItem component that represents a single item in the timeline.
 *
 * It displays the year, text, and an image associated with the timeline item.
 *
 * @component
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
        {/* Timeline Year */}
        <div
            className={`absolute top-[-40px] h-auto w-full ${index % 2 === 0 ? "text-right" : "text-left"} font-display text-raisin px-5 text-lg sm:text-2xl md:text-3xl`}
        >
            {item.year}
        </div>
        <div
            className={`bg-green absolute h-[6px] w-24 sm:w-32 md:w-40 ${index % 2 === 0 ? "right-0" : "left-0"} top-full`}
        />
        <div
            className={`bg-green absolute top-[-7px] h-5 w-5 rounded-full ${index % 2 === 0 ? "right-[86px] sm:right-[118px] md:right-[142px]" : "left-[86px] sm:left-[118px] md:left-[142px]"}`}
        ></div>
        {/* Timeline Text and Image */}
        <div
            className={`text-raisin absolute h-auto w-full font-normal ${index % 2 === 0 ? "left-[-10px] text-right sm:left-[-20px]" : "left-[10px] text-left sm:left-[20px]"} top-[20px]`}
            style={{ display: "block", fontSize: "var(--dynamic-font-size)" }}
        >
            {item.text}
        </div>
        <Image
            className={`absolute top-[-40px] h-auto w-full max-w-[200px] border-6 border-white object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${index % 2 === 0 ? "left-[120%] rotate-[-13deg]" : "right-[120%] rotate-[15deg]"}`}
            src={item.image}
            alt={`${item.year} timeline image`}
            width={200}
            height={200}
        />
    </div>
);

export default TimelineItem;
