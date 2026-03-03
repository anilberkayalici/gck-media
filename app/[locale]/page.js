import { Suspense } from "react";
import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import VoiceBankWrapper from "@/components/sections/VoiceBankWrapper";
import Contact from "@/components/sections/Contact";

function VoiceBankSkeleton() {
    return (
        <div className="section-padding">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="skeleton h-10 w-64 mx-auto mb-4" />
                    <div className="skeleton h-5 w-96 mx-auto" />
                </div>
                <div className="flex justify-center gap-3 mb-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-10 w-20 rounded-full" />
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="skeleton h-48 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function Page({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main>
            <Hero dict={dict} />
            <Services dict={dict} />
            <Suspense fallback={<VoiceBankSkeleton />}>
                <VoiceBankWrapper dict={dict} />
            </Suspense>
            <Contact dict={dict} />

            {/* Footer */}
            <footer className="py-8 text-center border-t border-glass-border">
                <p className="text-sm text-muted">
                    © {new Date().getFullYear()} GCK Media. {dict.footer.rights}
                </p>
            </footer>
        </main>
    );
}
