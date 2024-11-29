import ViewBooks from "./(main)/ViewBooks";
import { fetchBooks } from "./actions";
export default async function Home() {
    const seed = 10;
    const likes = 5;
    const locale = "en";
    const reviews = 3.0;
    const response = await fetchBooks(null, seed, locale, likes, reviews);

    // const arr = Array.from(Array(100).keys());
    return (
        <ViewBooks
            books={response.body.data}
            seed={seed}
            likes={likes}
            locale={locale}
            reviews={reviews}
            itoken={await response.body.itoken}
        />
    );
}
