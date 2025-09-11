/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.cdninstagram.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**.fbcdn.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "instagram.*",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
