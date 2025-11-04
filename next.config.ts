import type {NextConfig} from "next";
import path from "path";

const nextConfig: NextConfig = {
    reactCompiler: true,

    turbopack: {
        root: __dirname,
        resolveAlias: {
            "@": path.resolve(__dirname, "app"),
        },
    },

    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60,
        remotePatterns: [
            {protocol: "https", hostname: "**"}
        ],
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },

    experimental: {
        optimizeCss: true,
        optimizePackageImports: ["framer-motion", "react-icons"],
    },

    
};

export default nextConfig;
