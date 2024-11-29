/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "random.imagecdn.app",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
