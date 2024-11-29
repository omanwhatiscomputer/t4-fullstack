const LikeRangeInput = ({
    setLikes,
    likes,
    setTempLikesVal,
    tempLikesVal,
    isLoading,
    localeData,
    locale,
}) => {
    return (
        <div className="h-[107px] w-[150px] lg:w-[250px]">
            {/* <label
                htmlFor="minmax-range"
                className="block mb-2 text-sm font-medium text-gray-900 "
            >
                Likes
            </label> */}
            <p className="text-sm translate-y-6 translate-x-0 text-slate-600">
                {localeData[locale]["Likes"]}
            </p>
            <div className="w-full flex justify-between text-slate-400 px-[9px] translate-y-2 mt-5">
                <span className="text-xs/3 font-bold">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-thin">i</span>
                <span className="text-xs/3 font-bold">i</span>
            </div>
            <input
                id="minmax-range"
                type="range"
                min="1"
                max="10"
                list="steplist"
                step="1"
                value={tempLikesVal}
                onChange={(event) => setTempLikesVal(event.target.value)}
                onMouseUp={setLikes}
                onTouchEnd={setLikes}
                className="h-2 w-full bg-gray-300 rounded-md cursor-pointer"
                {...(isLoading && { disabled: true })}
            />
        </div>
    );
};

export default LikeRangeInput;
