const ReviewInputField = ({
    setReviews,
    reviews,
    isLoading,
    localeData,
    locale,
}) => {
    return (
        <div className="block h-[107px] w-[150px] lg:w-[250px]">
            <p className="text-sm translate-y-7 translate-x-4 text-slate-600">
                {localeData[locale]["Review"]}
            </p>
            <input
                className="leading-10 pt-5 pb-1 rounded-md pl-[15px] w-full"
                type="number"
                id="review"
                name="review"
                defaultValue={reviews}
                onMouseUp={(event) => setReviews(event.target.value)}
                onTouchEnd={(event) => setReviews(event.target.value)}
                min="1"
                max="10"
                step="0.5"
                {...(isLoading && { disabled: true })}
            />
        </div>
    );
};

export default ReviewInputField;
