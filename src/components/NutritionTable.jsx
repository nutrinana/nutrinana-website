import React from "react";

export default function NutritionTable({ data, note, recommendation }) {
    function renderWithLineBreaks(text) {
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return (
        <>
            <table className="w-full md:w-[75%] text-left border-collapse mt-2 text-sm md:text-base">
                <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="border border-black p-2">Average Values</th>
                    <th className="border border-black p-2">Per 100g</th>
                    <th className="border border-black p-2">Per 60g Serving</th>
                    <th className="border border-black p-2">%*RI Per Serving</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td className="border border-black p-2">{renderWithLineBreaks(row.name)}</td>
                            <td className="border border-black p-2">{renderWithLineBreaks(row.per100g)}</td>
                            <td className="border border-black p-2">{renderWithLineBreaks(row.perServing)}</td>
                            <td className="border border-black p-2">{renderWithLineBreaks(row.ri)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {recommendation && <p className="mt-4">{recommendation}</p>}
            {note && <p className="mt-2 text-sm italic">{note}</p>}
        </>
    );
}