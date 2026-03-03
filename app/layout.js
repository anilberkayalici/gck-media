import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ShaderBackground from "@/components/ui/shader-background";

export const metadata = {
    title: "GCK Media",
    description: "GCK Media — Professional Voiceover, Dubbing & Media Production",
};

export default function RootLayout({ children }) {
    return (
        <html className="scroll-smooth">
            <body className="bg-deep text-offwhite font-heading antialiased overflow-x-hidden">
                {/* Dynamic WebGL Background */}
                <ShaderBackground />
                {/* Dark Vignette Overlay to ensure text readability */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.7)_100%)]" />

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
