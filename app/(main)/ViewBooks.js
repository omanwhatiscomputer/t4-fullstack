"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import Toolbar from "./Toolbar";
import Table from "./Table";
import { fetchBooks } from "../actions";

const booksPerFetch = 20;
let isLoading = false;

export default function ViewBooks(props) {
    const [books, setBooks] = useState(props.books);

    const [seed, setSeed] = useState(props.seed || 0);

    const [locale, setLocale] = useState(props.locale || "en");
    const [likes, setLikes] = useState(props.likes);
    const [reviews, setReviews] = useState(props.reviews);
    const [isTabular, setIsTabular] = useState(true);
    const [itoken, setItoken] = useState(props.itoken);
    const [tempLikesVal, setTempLikesVal] = useState(props.likes || 0);

    const [activeAccordion, setActiveAccordion] = useState(null);

    const [ref, inView] = useInView();

    // seed debouncer
    const [debouncedSeed, setDebouncedSeed] = useState(seed);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSeed(seed);
        }, 1000);

        return () => clearTimeout(handler); // Cleanup on component unmount or input change
    }, [seed]);

    // review debouncer
    const [debouncedReviews, setDebouncedReviews] = useState(reviews);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedReviews(reviews);
        }, 1000);
        return () => clearTimeout(handler);
    }, [reviews]);

    // deploy debounced params
    useEffect(() => {
        if (books.length > booksPerFetch) {
            setBooks([]);
            setActiveAccordion(null);
            loadMoreBooks(
                null,
                null,
                null,
                debouncedSeed,
                debouncedReviews,
                true
            );
        }
    }, [debouncedSeed, debouncedReviews]);

    const handleSeedChange = (value) => {
        if (value !== seed) {
            if (!isLoading) setSeed(value);
            // setBooks([]);
            // loadMoreBooks(null, null, null, value, null, true);
        }
    };

    const handleLocaleChange = (value) => {
        if (locale !== value && !isLoading) {
            setLocale(value);
            setBooks([]);
            setActiveAccordion(null);
            loadMoreBooks(null, value, null, null, null, true);
        }
    };

    const handleLikesChange = () => {
        if (likes !== tempLikesVal && !isLoading) {
            setLikes(tempLikesVal);
            setBooks([]);
            setActiveAccordion(null);
            loadMoreBooks(null, null, tempLikesVal, null, null, true);
        }
    };
    const handleReviewsChange = (value) => {
        if (reviews !== value) {
            if (!isLoading) setReviews(value);
            // setBooks([]);
            // loadMoreBooks(null, null, null, null, value, true);
        }
    };

    const inputs = { seed, locale, likes, tempLikesVal, reviews, isTabular };
    const setInputs = {
        setTempLikesVal: setTempLikesVal,
        setSeed: handleSeedChange,
        setLocale: handleLocaleChange,
        setLikes: handleLikesChange,
        setReviews: handleReviewsChange,
        setIsTabular,
    };

    async function loadMoreBooks(
        t = null,
        l = null,
        li = null,
        s = null,
        r = null,
        flushPrevBooks = false
    ) {
        if (isLoading) return;

        isLoading = true;
        const moreBooks = await fetchBooks(
            t || itoken,
            s !== null ? s : Number(seed),
            l || locale,
            li !== null ? li : Number(likes),
            r !== null ? r : Number(reviews)
        );

        if (!flushPrevBooks) {
            setBooks((prev) => [...prev, ...moreBooks.body.data]);
        } else {
            setBooks([...moreBooks.body.data]);
        }
        isLoading = false;
    }

    useEffect(() => {
        let timeoutID1;
        let timeoutID2;
        let timeoutID3;
        let timeoutID4;
        // if (inView) {
        //     loadMoreBooks();
        // }
        if (inView) {
            loadMoreBooks();
            if (window.innerHeight > 1080 && inView) {
                timeoutID1 =
                    inView &&
                    setTimeout(() => {
                        if (inView) {
                            loadMoreBooks();
                        }
                    }, 2500);
            }
            if (window.innerHeight > 1440 && inView) {
                timeoutID2 =
                    inView &&
                    setTimeout(() => {
                        if (inView) {
                            loadMoreBooks();
                        }
                    }, 3000);
            }
            //======================================================
            timeoutID3 =
                inView &&
                setTimeout(() => {
                    if (inView) {
                        loadMoreBooks();
                    }
                }, 7500);
            timeoutID4 =
                inView &&
                setTimeout(() => {
                    if (inView) {
                        loadMoreBooks();
                    }
                }, 10000);
            //=====================================================
        }

        return () => {
            if (timeoutID1) {
                clearTimeout(timeoutID1);
            }
            if (timeoutID2) {
                clearTimeout(timeoutID2);
            }
            if (timeoutID3) {
                clearTimeout(timeoutID3);
            }
            if (timeoutID4) {
                clearTimeout(timeoutID4);
            }
        };
    }, [inView]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
        }
    }, [itoken, debouncedSeed, locale, debouncedReviews, likes]);

    const tHeadSticky = "sticky top-[6.7rem] z-10 bg-slate-50";
    const tHeadBorderStyle = "sticky top-[9.2rem] z-10 bg-black";
    const tHeadMarginBottomStyle = "h-[100px]";
    return (
        <div className="min-w-[1000px] flex flex-col items-center">
            <Toolbar
                setInputs={setInputs}
                inputs={inputs}
                styles={
                    "w-[99%] bg-slate-100 flex justify-between fixed top-0 z-10 min-w-[1000px] "
                }
                isLoading={isLoading}
            />

            <div className="relative overflow-visible w-[100%]">
                <Table
                    books={books}
                    tHeadSticky={tHeadSticky}
                    tHeadBorderStyle={tHeadBorderStyle}
                    tHeadMarginBottomStyle={tHeadMarginBottomStyle}
                    spinnerRef={ref}
                    activeAccordion={activeAccordion}
                    setActiveAccordion={setActiveAccordion}
                />
            </div>
        </div>
    );
}
