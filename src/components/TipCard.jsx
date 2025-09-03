/**
 * TipCard component displays a tip from Nana.
 *
 * @component
 *
 * @returns {JSX.Element}  The rendered TipCard component.
 */
export default function TipCard() {
    return (
        <div className="bg-light-yellow/40 rounded-xl p-5" aria-label="Nana's tip">
            <p className="text-raisin/70 mb-2 text-sm tracking-wide uppercase">
                Nana&apos;s tip to activate your tastebuds
            </p>
            <p className="text-raisin/90 text-base italic">
                Try it with Greek yoghurt, fresh berries, and a drizzle of honey—simple, nourishing,
                delicious.
            </p>
            <p className="font-handwritten text-raisin/70 mt-3 text-right text-sm">— Nana</p>
        </div>
    );
}
