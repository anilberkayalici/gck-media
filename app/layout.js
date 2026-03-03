import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata = {
    title: "GCK Media",
    description: "GCK Media — Professional Voiceover, Dubbing & Media Production",
};

export default function RootLayout({ children }) {
    return (
        <html className="scroll-smooth">
            <body className="bg-deep text-offwhite font-heading antialiased overflow-x-hidden">
                {/* Fixed studio background at 5% opacity */}
                <div
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/studio-bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundAttachment: "fixed",
                        opacity: 0.05,
                    }}
                />
                {/* Wine Red gradient overlays */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-deep via-transparent to-deep" />
                <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(158,27,50,0.08)_0%,transparent_50%)]" />
                <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(158,27,50,0.06)_0%,transparent_50%)]" />

                {/* Content */}
                <div className="relative z-10">
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </div>
            </body>
        </html>
    );
}
