/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'framer-motion']
    },

    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Compression and optimization
    compress: true,
    poweredByHeader: false,

    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    }
                ]
            }
        ]
    },

    // Bundle analyzer in development
    webpack: (config, { isServer, dev }) => {
        // Bundle analysis
        if (process.env.ANALYZE === 'true') {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerPort: isServer ? 8888 : 8889,
                    openAnalyzer: true,
                })
            )
        }

        // Optimize for production
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // Vendor chunk
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: /node_modules/,
                        priority: 20
                    },
                    // Common chunk
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        }

        return config
    },

    // Environment variables validation
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
}

module.exports = nextConfig
