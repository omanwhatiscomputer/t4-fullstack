import LocaleDropdownMenu from "../(components)/LocaleDropdownMenu";
import SeedInputField from "../(components)/SeedInput";
import LikeRangeInput from "../(components)/LikeRangeInput";
import ReviewInputField from "../(components)/ReviewInputField";
import ViewSwitcher from "../(components)/ViewSwitcher";
import localeData from "./../locale-data.json";

const Toolbar = ({ styles, setInputs, inputs, isLoading }) => {
    return (
        <div className={`items-center px-8 ${styles}`}>
            <LocaleDropdownMenu
                localeData={localeData}
                setLocale={setInputs.setLocale}
                locale={inputs.locale}
                isLoading={isLoading}
            />
            <SeedInputField
                seed={inputs.seed}
                setSeed={setInputs.setSeed}
                isLoading={isLoading}
            />
            <LikeRangeInput
                localeData={localeData}
                locale={inputs.locale}
                setLikes={setInputs.setLikes}
                likes={inputs.likes}
                setTempLikesVal={setInputs.setTempLikesVal}
                tempLikesVal={setInputs.tempLikesVal}
                isLoading={isLoading}
            />
            <ReviewInputField
                localeData={localeData}
                locale={inputs.locale}
                reviews={inputs.reviews}
                setReviews={setInputs.setReviews}
                isLoading={isLoading}
            />
            <ViewSwitcher
                isTabular={inputs.isTabular}
                setIsTabular={setInputs.setIsTabular}
            />
        </div>
    );
};

export default Toolbar;
