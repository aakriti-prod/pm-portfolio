import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/portfolio/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        },
        manifest: {
          name: 'Aakrity Singh - Product Manager Portfolio',
          short_name: 'PM Portfolio',
          description: 'Strategic Product Manager portfolio showcasing 7+ years of experience',
          theme_color: '#2563eb',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'vite.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            }
          ]
        }
      })
    ],
    define: {
      // Expose environment variables to the client
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    build: {
      // Output directory
      outDir: 'dist',
      // Clean output directory before build
      emptyOutDir: true,
      // Enable code splitting
      rollupOptions: {
        output: {
          // Optimize chunk naming for better caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
            if (facadeModuleId) {
              return 'assets/[name]-[hash].js'
            }
            return 'assets/chunk-[hash].js'
          },
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash].[ext]'
            
            if (/\.(css)$/.test(assetInfo.name)) {
              return 'assets/css/[name]-[hash].[ext]'
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash].[ext]'
            }
            return 'assets/[name]-[hash].[ext]'
          },
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react']
          }
        }
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 500,
      // Enable minification
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : []
        },
        mangle: {
          safari10: true
        }
      },
      // Enable source maps for development, disable for production
      sourcemap: mode === 'development',
      // Optimize CSS
      cssCodeSplit: true,
      // Target modern browsers for better optimization
      target: 'es2020',
      // Report compressed file sizes
      reportCompressedSize: true
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
    },
    // Performance optimizations
    server: {
      hmr: {
        overlay: false
      },
      // Enable compression
      compress: true
    },
    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      cors: true
    }
  }
})
