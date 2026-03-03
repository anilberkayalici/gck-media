const dictionaries = {
    tr: () => import("@/messages/tr.json").then((m) => m.default),
    en: () => import("@/messages/en.json").then((m) => m.default),
};

export const getDictionary = async (locale) => {
    const loader = dictionaries[locale];
    if (!loader) {
        return dictionaries.tr();
    }
    return loader();
};

export const locales = ["tr", "en"];
export const defaultLocale = "tr";
