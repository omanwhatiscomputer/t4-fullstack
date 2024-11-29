"use-server";

export const fetchBooks = async (itoken, seed, locale, likes, reviews) => {
    let headers = {
        "Content-Type": "application/json",
    };

    if (itoken) {
        headers = { ...headers, itoken };
    }

    // to prevent cached data from being returnced in vercel.
    const nonce = new Date().toISOString();

    const BACKEND_API = "https://t4-fullstack.vercel.app";
    // const BACKEND_API = "http://localhost:3000";

    const url = `${BACKEND_API}/api/books/${locale}/${seed}/${likes}/${reviews}?nonce=${nonce}`;
    const options = {
        method: "GET",
        headers: headers,
        cache: "no-store",
        credentials: "include",
    };

    const apiResponse = await fetch(url, options);
    if (!apiResponse.ok) {
        return { status: apiResponse.status, message: apiResponse.statusText };
    }

    const data = await apiResponse.json();
    const token = await apiResponse.headers.get("itoken");
    return { status: 200, body: { itoken: token, data: data } };
};
