import { createClient } from "@supabase/supabase-js";
import VoiceBankClient from "@/components/sections/VoiceBank";

async function getArtists() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from("artists").select("*");
    if (error) {
        console.error("Artists fetch error:", error);
        return [];
    }
    return data || [];
}

export default async function VoiceBankWrapper({ dict }) {
    const artists = await getArtists();
    return <VoiceBankClient artists={artists} dict={dict} />;
}
