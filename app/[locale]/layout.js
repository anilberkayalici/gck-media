import { getDictionary, locales } from "@/lib/dictionary";
import Navbar from "@/components/ui/Navbar";
import Preloader from "@/components/ui/Preloader";
import ScrollToTop from "@/components/ui/ScrollToTop";

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return {
        title: locale === "tr" ? "GCK Media — Prodüksiyon" : "GCK Media — Production",
        description:
            locale === "tr"
                ? "Profesyonel seslendirme, dublaj ve medya prodüksiyon hizmetleri"
                : "Professional voiceover, dubbing, and media production services",
    };
}

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <>
            <ScrollToTop />
            <Preloader dict={dict} />
            <Navbar dict={dict} locale={locale} />
            {children}
        </>
    );
}
