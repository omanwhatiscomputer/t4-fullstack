"use-server";

export const fetchBooks = async (itoken, seed, locale, likes, reviews) => {
    let headers = {
        "Content-Type": "application/json",
    };

    if (itoken) {
        headers = { ...headers, itoken };
    }

    const url = `http://localhost:3000/api/books/${locale}/${seed}/${likes}/${reviews}`;
    const options = {
        method: "GET",
        headers: headers,
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
