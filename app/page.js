// "use client";
export const dynamic = "force-dynamic";
// import { useEffect, useState } from "react";
import ViewBooks from "./(main)/ViewBooks";
import { fetchBooks } from "./actions";
export default async function Home() {
    const seed = 10;
    const likes = 5;
    const locale = "en";
    const reviews = 3.0;
    // const [data, setData] = useState(null); // Combined data and token state
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Run the fetch logic once on the initial render
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetchBooks(
    //                 null,
    //                 seed,
    //                 locale,
    //                 likes,
    //                 reviews
    //             );
    //             if (response.status === 200 && response.body) {
    //                 setData({
    //                     books: response.body.data,
    //                     itoken: response.body.itoken,
    //                 });
    //             } else {
    //                 setError("Internal error");
    //                 console.log(response);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching books:", err);
    //             setError("Internal error");
    //         }
    //     };

    //     fetchData();
    // }, [data]);
    // if (error) {
    //     return <div>{error}</div>;
    // }

    // if (!data) {
    //     return <div>Loading...</div>;
    // }

    const response = await fetchBooks(null, seed, locale, likes, reviews).then(
        (value) => value
    );
    if (response.status !== 200)
        return <div>Internal error with status {response.status}</div>;

    return (
        <ViewBooks
            books={response.body.data}
            seed={seed}
            likes={likes}
            locale={locale}
            reviews={reviews}
            itoken={response.body.itoken}
        />
    );
}
