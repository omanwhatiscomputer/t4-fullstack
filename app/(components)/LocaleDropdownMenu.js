const LocaleDropdownMenu = ({ localeData, setLocale, locale, isLoading }) => {
    return (
        <div className="block h-[107px] w-[150px] lg:w-[250px]">
            {/* <label htmlFor="locale">Language</label> */}
            <p className="translate-y-7 translate-x-4 text-sm text-slate-600">
                {localeData[locale]["Language"]}
            </p>

            <select
                className="leading-10 pt-5 pb-1 pl-[15px] rounded-md w-full"
                name="locale"
                value={locale}
                id="locale"
                onChange={(event) => setLocale(event.target.value)}
                {...(isLoading && { disabled: true })}
            >
                <option default value="en">
                    English (US)
                </option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
            </select>
        </div>
    );
};

export default LocaleDropdownMenu;
/*
absolute left-4 top-2

*/
