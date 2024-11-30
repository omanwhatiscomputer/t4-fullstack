import { fakerEN, fakerES, fakerDE, fakerFR } from "@faker-js/faker";
import { en, base, es, de, fr, Faker } from "@faker-js/faker";
import Rand from "rand-seed";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import userFakerInstances from "./Map";

const booksPerFetch = 20;

var fakerLocales = {
    en: [en, base],
    es: [es, en, base],
    fr: [fr, en, base],
    de: [de, en, base],
};

// var userFakerInstances = new Map();

const createNewFakerInstance = (locale) => {
    return new Faker({ locale: locale });
};

const getUserFakerInstance = (
    userId,
    seedValue,
    locale,
    likes,
    reviews,
    fakerLocales
) => {
    if (!userFakerInstances.has(userId)) {
        const faker = createNewFakerInstance(fakerLocales[locale]);
        faker.seed(seedValue);
        const rand = new Rand(`${seedValue}`);
        userFakerInstances.set(userId, {
            faker: faker,
            locale: locale,
            rand: rand,
            seed: seedValue,
            likes: likes,
            reviews: reviews,
            offsetKey: -1 * booksPerFetch + 1,
            userId: userId,
        });
        console.log(`Server: new User[${userId}] created!`);
    }
    const userInstance = userFakerInstances.get(userId);

    console.log(
        `Server: comparing reviews ${reviews} and ${userInstance.reviews} `
    );

    if (
        userInstance.seed !== seedValue ||
        userInstance.likes !== likes ||
        userInstance.reviews !== reviews
    ) {
        userInstance.faker.seed(seedValue);
        userInstance.rand = new Rand(`${seedValue}`);
        userInstance.seed = seedValue;
        userInstance.likes = likes;
        userInstance.reviews = reviews;
        userInstance.offsetKey = -1 * booksPerFetch + 1;
        console.log("Server: seed | likes | reviews changed");
    }

    if (userInstance.locale !== locale) {
        userInstance.locale = locale;
        userInstance.faker = createNewFakerInstance(fakerLocales[locale]);
        userInstance.faker.seed(seedValue);
        userInstance.rand = new Rand(`${seedValue}`);
        userInstance.offsetKey = -1 * booksPerFetch + 1;
        console.log("Server: Locale changed");
    }

    console.log(
        `Server: User[${userInstance.userId}]: offsetKey incremented from ${
            userInstance.offsetKey
        } to ${userInstance.offsetKey + booksPerFetch}`
    );
    userInstance.offsetKey += booksPerFetch;

    return userInstance;
};

const getRandomData = async (userId, SEED, locale, likes, reviews) => {
    const userFakerInstance = getUserFakerInstance(
        userId,
        SEED,
        locale,
        likes,
        reviews,
        fakerLocales
    );
    const generateRandomISBN = (rand) => {
        const padZeros = (string, expectedLen) => {
            const requiredZeros = expectedLen - string.length;
            const zeropadding = {
                0: "",
                1: "0",
                2: "00",
                3: "000",
                4: "0000",
                5: "00000",
            };
            return zeropadding[requiredZeros] + string;
        };
        const part1 = "978";
        const part2 = `${Math.ceil(rand.next() * 9)}`; // 1-digit
        const part3 = padZeros(`${Math.ceil(rand.next() * 999)}`, 3); // 3-digit
        const part4 = padZeros(`${Math.ceil(rand.next() * 99999)}`, 5); // 5-digit
        const part5 = `${Math.ceil(rand.next() * 9)}`; // 1-digit

        return `${part1}-${part2}-${part3}-${part4}-${part5}`;
    };

    const generateReviews = () => {
        return {
            review: userFakerInstance.faker.lorem.sentence({
                min: 10,
                max: 25,
            }),
            name: userFakerInstance.faker.person.fullName(),
            organization: userFakerInstance.faker.company.name(),
        };
    };

    const generateAuthors = () => {
        return {
            author: userFakerInstance.faker.book.author(),
        };
    };

    const generateUnitData = () => {
        return {
            title: userFakerInstance.faker.book.title(),
            author: userFakerInstance.faker.helpers.multiple(generateAuthors, {
                count: Math.ceil(Math.random() * 3),
            }),
            publisher: userFakerInstance.faker.book.publisher(),
            pubYear: userFakerInstance.faker.date
                .between({ from: "1900", to: "2024" })
                .getFullYear()
                .toString(),
            likes: parseInt(Math.random() * 2 + userFakerInstance.likes),
            ISBN: generateRandomISBN(userFakerInstance.rand),
            reviews: userFakerInstance.faker.helpers.multiple(generateReviews, {
                count: parseInt(
                    userFakerInstance.reviews + Math.random() * 1.5
                ),
            }),
        };
    };

    let data = userFakerInstance.faker.helpers
        .multiple(generateUnitData, {
            count: booksPerFetch,
        })
        .map((x, idx) => ({ ...x, id: idx + userFakerInstance.offsetKey }));

    return data;
};

export const GET = async (request, props) => {
    const params = await props.params;

    const itoken = request.headers.get("itoken") || uuid();
    const locale = params.locale ? params.locale : "en";
    let seed = params.seed && Number(params.seed) ? Number(params.seed) : 0;
    const likes =
        params.likes && Number(params.likes) ? parseInt(params.likes) : 5;
    const reviews =
        params.reviews && Number(params.reviews) ? Number(params.reviews) : 3.0;

    seed = parseInt(seed + likes + reviews);

    let data = getRandomData(itoken, seed, locale, likes, reviews);

    const response = NextResponse.json(await data, {
        status: 200,
    });

    const origin = request.headers.get("origin") || "*";
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, itoken"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    response.headers.set("itoken", itoken);

    return response;
};
// Handle cors
export async function OPTIONS(request) {
    const origin = request.headers.get("origin") || "*";
    const response = NextResponse.json({}, { status: 200 });
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, itoken"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin || "*");

    return response;
}
