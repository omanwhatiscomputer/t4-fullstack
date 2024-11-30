import { IoShuffle } from "react-icons/io5";
const SeedInputField = ({ seed, setSeed, isLoading }) => {
    const generateRandomSeed = () => {
        const randomSeed = Math.floor(Math.random() * 1000000).toString();
        setSeed(randomSeed);
    };

    return (
        <div className="block  h-[107px] w-[150px] lg:w-[250px] shrink-0">
            {/* <label htmlFor="seed">Seed</label> */}
            <p className="text-sm translate-y-7 translate-x-4 text-slate-600">
                Seed
            </p>
            <input
                className="leading-10 pt-5 pb-1 w-full rounded-md pl-[15px]"
                type="text"
                name="seed"
                onChange={(event) => {
                    const value = event.target.value;

                    if (!isNaN(Number(value))) {
                        setSeed(Number(value));
                    }
                }}
                value={seed}
                {...(isLoading && { disabled: true })}
            />
            <button
                type="button"
                className="text-2xl block translate-x-28 -translate-y-11 lg:translate-x-[13.5rem]"
                onClick={generateRandomSeed}
                {...(isLoading && { disabled: true })}
            >
                <IoShuffle />
            </button>
        </div>
    );
};

export default SeedInputField;
