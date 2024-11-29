"use client";
import { fakerEN, fakerES, fakerDE, fakerFR } from "@faker-js/faker";
import { en, base, es, de, fr, Faker } from "@faker-js/faker";
import Rand from "rand-seed";

var fakerLocales = {
    en: [en, base],
    es: [es, en, base],
    fr: [fr, en, base],
    de: [de, en, base],
};

var userFakerInstances = new Map();

const createNewFakerInstance = (locale) => {
    return new Faker({ locale: locale });
};

const getUserFakerInstance = (userId, seedValue, locale, fakerLocales) => {
    if (!userFakerInstances.has(userId)) {
        const faker = createNewFakerInstance(fakerLocales[locale]);
        faker.seed(seedValue);
        const rand = new Rand(`${seedValue}`);
        userFakerInstances.set(userId, {
            faker: faker,
            locale: locale,
            rand: rand,
            seed: seedValue,
        });
    }
    const userInstance = userFakerInstances.get(userId);

    if (userInstance.seed !== seedValue) {
        userInstance.faker.seed(seedValue);
        userInstance.rand = new Rand(`${seedValue}`);
        userInstance.seed = seedValue;
    }

    if (userInstance.locale !== locale) {
        userInstance.faker = createNewFakerInstance(fakerLocales[locale]);
        userInstance.faker.seed(seedValue);
    }

    return userInstance;
};

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

const getRandomData = async (userId, SEED, locale) => {
    const userFakerInstance = getUserFakerInstance(
        userId,
        SEED,
        locale,
        fakerLocales
    );

    const generateUnitData = () => {
        return {
            title: userFakerInstance.faker.book.title(),
            author: userFakerInstance.faker.book.author(),
            publisher: userFakerInstance.faker.book.publisher(),
            pubYear: userFakerInstance.faker.date
                .between({ from: "1900", to: "2024" })
                .getFullYear()
                .toString(),
            ISBN: generateRandomISBN(userFakerInstance.rand),
            reviews: userFakerInstance.faker.lorem.sentence({
                min: 7,
                max: 15,
            }),
        };
    };

    const data = userFakerInstance.faker.helpers.multiple(generateUnitData, {
        count: 5,
    });
    return data;
};

const Test2 = () => {
    return (
        <div>
            <button onClick={() => getRandomData("65654", 51, "fr")}>
                Get Data
            </button>
        </div>
    );
};

export default Test2;
// ----------------------------------------------------
