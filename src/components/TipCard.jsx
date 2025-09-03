/**
 * TipCard component displays a tip from Nana.
 *
 * @component
 *
 * @param {string} className - Optional additional class names for the component.
 *
 * @returns {JSX.Element}  The rendered TipCard component.
 */
export default function TipCard({ className = "" }) {
    return (
        <div
            className={[
                "bg-[var(--color-light-yellow, #fff9e6)]/60 rounded-xl border border-[var(--color-grey)]",
                "p-5 shadow-sm",
                className,
            ].join(" ")}
            aria-label="Nana’s tip"
        >
            <p className="text-raisin/70 mb-2 text-sm tracking-wide uppercase">Nana’s tip</p>
            <p className="text-raisin/90 text-base italic">
                Try it with thick yoghurt, fresh berries, and a drizzle of honey—simple, nourishing,
                delicious.
            </p>
            {/* If you have a handwritten font class, add it: font-handwritten */}
            <p className="text-raisin/70 mt-3 text-right text-sm">— Nana</p>
        </div>
    );
}
