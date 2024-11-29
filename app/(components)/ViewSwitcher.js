"use client";

import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { GiBlackBook } from "react-icons/gi";
const ViewSwitcher = ({ isTabular, setIsTabular }) => {
    return (
        <>
            <label className="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
                <input
                    type="checkbox"
                    checked={isTabular}
                    onChange={() => setIsTabular(!isTabular)}
                    className="sr-only"
                />

                <div className="flex h-[44px] w-[80px] items-center justify-center rounded-xl border-[1px] bg-blue-500">
                    <span
                        className={`flex h-9 w-9 items-center justify-center  rounded-l-lg ${
                            !isTabular
                                ? "bg-blue-600 text-white"
                                : "text-body-color bg-slate-100"
                        }`}
                    >
                        <GiBlackBook />
                    </span>
                    <span
                        className={`flex h-9 w-9 items-center justify-center rounded-r-lg ${
                            isTabular
                                ? "bg-blue-600 text-white"
                                : "text-blue-600 bg-slate-100"
                        }`}
                    >
                        <FaCalendarAlt />
                    </span>
                </div>
            </label>
        </>
    );
};

export default ViewSwitcher;
