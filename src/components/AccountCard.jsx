import Link from "next/link";

/**
 * Reusable account dashboard card component
 *
 * Displays an icon, title, description, and action link. Supports both internal actions and external links.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.icon - Icon element to display.
 * @param {string} props.title - Card title.
 * @param {string} props.description - Card description text.
 * @param {string} props.actionText - Text for the action link.
 * @param {React.ReactNode} [props.actionIcon] - Optional icon after action text.
 * @param {Function} [props.onClick] - Click handler for internal actions.
 * @param {string} [props.href] - External URL for navigation.
 * @param {string} [props.iconBgColor] - Background color for icon badge (default: bg-green/10).
 *
 * @returns {JSX.Element} Account card UI element with conditional rendering for links and actions.
 */
export default function AccountCard({
    icon,
    title,
    description,
    actionText,
    actionIcon,
    onClick,
    href,
    iconBgColor = "bg-green/10",
}) {
    const cardClasses =
        "group cursor-pointer hover:border-green flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg";

    const content = (
        <>
            <div className="mb-4 flex w-full items-start justify-between">
                <div className={`${iconBgColor} rounded-full p-3`}>{icon}</div>
            </div>
            <h3 className="font-heading mb-2 text-xl font-bold">{title}</h3>
            <p className="mb-4 text-sm text-gray-600">{description}</p>
            <span className="text-green inline-flex items-center gap-1 text-sm font-medium group-hover:underline">
                {actionText} {actionIcon}
            </span>
        </>
    );

    // External link
    if (href) {
        return (
            <Link href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                {content}
            </Link>
        );
    }

    // Internal action
    return (
        <div onClick={onClick} className={cardClasses}>
            {content}
        </div>
    );
}
