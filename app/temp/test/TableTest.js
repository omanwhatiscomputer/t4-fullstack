"use client";
import { FaChevronDown } from "react-icons/fa6";

import React, { useState } from "react";

const TableTest = ({
    books,
    tHeadSticky,
    tHeadBorderStyle,
    tHeadMarginBottomStyle,
}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const toggleAccordion = (id) => {
        setActiveAccordion((prev) => (prev === id ? null : id));
    };
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        -
                    </th>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        #
                    </th>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        ISBN
                    </th>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        Title
                    </th>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        Author(s)
                    </th>
                    <th scope="col" className={`px-6 py-3 ${tHeadSticky}`}>
                        Publisher
                    </th>
                </tr>
                <tr>
                    <td colSpan="6" className={tHeadBorderStyle}></td>
                </tr>
                <tr>
                    <td colSpan="6" className={tHeadMarginBottomStyle}></td>
                </tr>
            </thead>

            <tbody>
                {books.map((x) => (
                    <React.Fragment key={x}>
                        <tr
                            className={` border-b cursor-pointer ${
                                x === activeAccordion
                                    ? "bg-blue-100"
                                    : "hover:bg-slate-200 bg-white"
                            }`}
                            key={x}
                            onClick={() => toggleAccordion(x)}
                            aria-expanded={x === activeAccordion}
                            aria-controls={`accordion row-${x}`}
                        >
                            <td
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                <FaChevronDown
                                    className={
                                        x === activeAccordion
                                            ? ""
                                            : "-rotate-90"
                                    }
                                />
                            </td>
                            <td className="px-6 py-4">White</td>
                            <td className="px-6 py-4">Laptop PC</td>
                            <td className="px-6 py-4">$1999</td>
                            <td className="px-6 py-4">$1999</td>
                            <td className="px-6 py-4">$1999</td>
                        </tr>

                        <tr
                            key={`${x}-1`}
                            id={`accordion-row-${x}"`}
                            // className={`overflow-hidden transition-[max-height] duration-600 ease-in-out ${
                            //     activeAccordion === x ? "table-row" : "hidden"
                            // }`}
                            // className="overflow-hidden"
                        >
                            <td colSpan="6" className="px-6 bg-gray-50">
                                <div
                                    className={`overflow-hidden transition-[max-height] duration-[150ms] ease-in-out`}
                                    style={{
                                        maxHeight:
                                            activeAccordion === x
                                                ? "300px"
                                                : "0",
                                    }}
                                >
                                    <p
                                        className="mb-2 text-gray-500"
                                        key={`${x}-2`}
                                    >
                                        Flowbite is an open-source library of
                                        interactive components built on top of
                                        Tailwind CSS including buttons,
                                        dropdowns, modals, navbars, and more.
                                    </p>
                                    <p className="text-gray-500" key={`${x}-3`}>
                                        Check out this guide to learn how to{" "}
                                        <a
                                            href="/docs/getting-started/introduction/"
                                            className="text-blue-600 hover:underline"
                                        >
                                            get started
                                        </a>{" "}
                                        and start developing websites even
                                        faster with components on top of
                                        Tailwind CSS.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default TableTest;
