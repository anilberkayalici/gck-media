import { createClient } from "@supabase/supabase-js";
import ServicesGrid from "./ServicesGrid";

async function getServices() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from("services").select("*");
    if (error) {
        console.error("Services fetch error:", error);
        return [];
    }
    return data || [];
}

export default async function Services({ dict }) {
    const services = await getServices();

    return (
        <section id="services" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <ServicesGrid services={services} dict={dict} />
            </div>
        </section>
    );
}
