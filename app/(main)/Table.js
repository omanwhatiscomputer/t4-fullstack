"use client";
import { FaChevronDown } from "react-icons/fa6";
import localeData from "./../locale-data.json";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";

import ContentLoader from "react-content-loader";

const Table = ({
    books,
    tHeadSticky,
    tHeadBorderStyle,
    tHeadMarginBottomStyle,
    spinnerRef,
    activeAccordion,
    setActiveAccordion,
}) => {
    const toggleAccordion = (id) => {
        setActiveAccordion((prev) => (prev === id ? null : id));
    };

    return (
        <table
            className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse"
            key={"5a5"}
        >
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
                {books.map((x) => {
                    const authors = x.author.map((y) => y.author);
                    let authorsString = "N/A";
                    if (authors?.length === 1) authorsString = authors[0];
                    else if (authors?.length === 2) {
                        authorsString = authors.join(" and ");
                    } else if (authors?.length > 2) {
                        authorsString =
                            authors.slice(0, authors.length - 1).join(", ") +
                            " and " +
                            authors.slice(-1)[0];
                    }
                    return (
                        <React.Fragment key={x.id}>
                            <tr
                                className={` border-b cursor-pointer ${
                                    x.id === activeAccordion
                                        ? "bg-blue-100"
                                        : "hover:bg-slate-200 bg-white"
                                }`}
                                key={x.id}
                                onClick={() => toggleAccordion(x.id)}
                                aria-expanded={x.id === activeAccordion}
                                aria-controls={`accordion row-${x.id}`}
                            >
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <FaChevronDown
                                        className={`transition-transform duration-75 ${
                                            x.id === activeAccordion
                                                ? ""
                                                : "-rotate-90"
                                        }`}
                                    />
                                </td>
                                <td className="px-6 py-4 font-bold">{x.id}</td>
                                <td className="px-6 py-4">{x.ISBN}</td>
                                <td className="px-6 py-4">{x.title}</td>
                                <td className="px-6 py-4">{authorsString}</td>
                                <td className="px-6 py-4">
                                    {x.publisher}
                                    {", "}
                                    {x.pubYear}
                                </td>
                            </tr>

                            <tr key={`${x.id}-1`} id={`accordion-row-${x.id}"`}>
                                <td colSpan="6" className="px-6 bg-gray-50">
                                    <div
                                        className={`overflow-hidden transition-[max-height] duration-[150ms] ease-in-out`}
                                        style={{
                                            maxHeight:
                                                activeAccordion === x.id
                                                    ? "800px"
                                                    : "0",
                                        }}
                                    >
                                        <div className="w-full  flex pt-4">
                                            <div className=" flex justify-start items-center basis-[200px] flex-col ">
                                                <Image
                                                    className="w-[120px]"
                                                    src={
                                                        "https://picsum.photos/80/120"
                                                    }
                                                    width={200}
                                                    height={400}
                                                    alt={"random"}
                                                />
                                                <p className="block top-8 max-w-28 text-center text-sm [text-shadow:_1px_2px_1px_rgb(255_255_255_/_50%)] -translate-y-[164px]">
                                                    {authors[0]}
                                                </p>
                                                <p className="block top-40 max-w-28 text-center [text-shadow:_1px_2px_1px_rgb(255_255_255_/_50%)] -translate-y-[68px]">
                                                    {x.title}
                                                </p>
                                                <div className="bg-blue-600 text-white rounded-full text-sm py-1 px-3 block top-52 shadow-md -translate-y-[34px]">
                                                    {x.likes}{" "}
                                                    <AiFillLike className="inline" />
                                                </div>
                                            </div>
                                            <div className="overflow-y-auto basis-auto ">
                                                <div>
                                                    <span className="text-gray-600 text-3xl font-semibold [text-shadow:_0_1px_1px_rgb(0_0_0_/_50%)] leading-6">
                                                        {x.title}{" "}
                                                    </span>
                                                    <span className="text-slate-400 text-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_35%)]">
                                                        Paperback
                                                    </span>
                                                </div>
                                                <div className="text-lg font-semibold">
                                                    <span>by</span>{" "}
                                                    <span>
                                                        <i>{authorsString}</i>
                                                    </span>
                                                </div>
                                                <div className="text-lg text-slate-400 font-semibold">
                                                    <span>{x.publisher},</span>{" "}
                                                    <span>{x.pubYear}</span>
                                                </div>
                                                <div>
                                                    <span className="text-lg leading-10 font-semibold">
                                                        Review
                                                    </span>
                                                </div>

                                                {x.reviews.map((y, idx) => (
                                                    <div
                                                        className="text-sm"
                                                        key={idx}
                                                    >
                                                        <div>
                                                            <span>
                                                                {y.review}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-400">
                                                                &mdash; {y.name}
                                                                {", "}
                                                                {y.organization}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
                <tr className="border-b" ref={spinnerRef}>
                    <td colSpan={6} className="border-b">
                        <ContentLoader
                            viewBox="0 0 22000 650"
                            height={55}
                            width={"100%"}
                        >
                            <rect
                                x="0"
                                y="15"
                                rx="60"
                                ry="60"
                                width="100%"
                                height="600"
                            />
                        </ContentLoader>
                        <ContentLoader
                            viewBox="0 0 22000 650"
                            height={55}
                            width={"100%"}
                        >
                            <rect
                                x="0"
                                y="15"
                                rx="60"
                                ry="60"
                                width="100%"
                                height="600"
                            />
                        </ContentLoader>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
