// "use client";
// import { useState } from "react";

// const Test = () => {
//     const [activeAccordion, setActiveAccordion] = useState(null);

//     const toggleAccordion = (id) => {
//         setActiveAccordion(activeAccordion === id ? null : id);
//     };

//     return (
//         <div id="accordion-collapse">
//             {/* PAD */}
//             <h2 id="accordion-collapse-heading-1">
//                 <button
//                     type="button"
//                     className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200  focus:ring-4 focus:ring-gray-200 hover:bg-blue-100 gap-3"
//                     onClick={() => toggleAccordion(1)}
//                     aria-expanded={activeAccordion === 1}
//                     aria-controls="accordion-collapse-body-1"
//                 >
//                     <span>What is Flowbite?</span>
//                     <svg
//                         className={`w-3 h-3 shrink-0 transform ${
//                             activeAccordion === 1 ? "" : "rotate-180"
//                         }`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 10 6"
//                         aria-hidden="true"
//                     >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 5 5 1 1 5"
//                         />
//                     </svg>
//                 </button>
//             </h2>
//             <div
//                 id="accordion-collapse-body-1"
//                 className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
//                     activeAccordion === 1 ? "max-h-96" : "max-h-0"
//                 }`}
//                 aria-labelledby="accordion-collapse-heading-1"
//             >
//                 <div className="p-5 border border-b-0 border-gray-200">
//                     <p className="mb-2 text-gray-500">
//                         Flowbite is an open-source library of interactive
//                         components built on top of Tailwind CSS including
//                         buttons, dropdowns, modals, navbars, and more.
//                     </p>
//                     <p className="text-gray-500">
//                         Check out this guide to learn how to{" "}
//                         <a
//                             href="/docs/getting-started/introduction/"
//                             className="text-blue-600 hover:underline"
//                         >
//                             get started
//                         </a>{" "}
//                         and start developing websites even faster with
//                         components on top of Tailwind CSS.
//                     </p>
//                 </div>
//             </div>
//             {/* PAD */}
//         </div>
//     );
// };

// export default Test;

"use client";
import { useState } from "react";

export default function TableAccordion() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion((prev) => (prev === id ? null : id));
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Accordion Row */}
                    <tr className="border-b border-gray-200 cursor-pointer">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">What is Flowbite?</td>
                        <td className="px-6 py-4">
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => toggleAccordion(1)}
                                aria-expanded={activeAccordion === 1}
                                aria-controls="accordion-row-1"
                            >
                                {activeAccordion === 1 ? "Hide" : "Show"}{" "}
                                Details
                            </button>
                        </td>
                    </tr>
                    {/* Accordion Content */}
                    <tr
                        id="accordion-row-1"
                        className={`overflow-hidden transition-[max-height] duration-600 ease-in-out ${
                            activeAccordion === 1 ? "table-row" : "hidden"
                        }`}
                    >
                        <td colSpan="3" className="px-6 py-4 bg-gray-50">
                            <p className="mb-2 text-gray-500">
                                Flowbite is an open-source library of
                                interactive components built on top of Tailwind
                                CSS including buttons, dropdowns, modals,
                                navbars, and more.
                            </p>
                            <p className="text-gray-500">
                                Check out this guide to learn how to{" "}
                                <a
                                    href="/docs/getting-started/introduction/"
                                    className="text-blue-600 hover:underline"
                                >
                                    get started
                                </a>{" "}
                                and start developing websites even faster with
                                components on top of Tailwind CSS.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
