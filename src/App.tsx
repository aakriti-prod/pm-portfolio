import { useEffect, useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header, Footer, Card, Hero, LoadingSpinner, PerformanceMonitor } from './components'
import { usePerformance } from './hooks/usePerformance'
import { useDataLoader } from './utils/dataLoader'
import { pageTransition, fadeInUp } from './utils/animations'
import type { PortfolioData } from './types'

// Lazy load components for code splitting
const About = lazy(() => import('./components/About'))
const CaseStudies = lazy(() => import('./components/CaseStudies'))
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { preloadImage } = usePerformance()
  const { loadPortfolioData } = useDataLoader()

  // Load portfolio data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const portfolioData = await loadPortfolioData()
        setData(portfolioData)
      } catch (error) {
        console.error('Failed to load portfolio data:', error)
        // Fallback to static import
        const fallbackData = await import('./data/portfolio.json')
        setData(fallbackData.default as PortfolioData)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [loadPortfolioData])

  // Add smooth scrolling behavior to the document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Preload critical images
  useEffect(() => {
    if (data?.profile.profileImage) {
      preloadImage(data.profile.profileImage)
    }
    
    // Preload first case study image
    if (data?.caseStudies[0]?.images?.[0]) {
      preloadImage(data.caseStudies[0].images[0])
    }
  }, [data, preloadImage])

  // Show loading state while data is loading
  if (isLoading || !data) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LoadingSpinner size="lg" text="Loading portfolio..." variant="dots" />
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-gray-50 overflow-x-hidden"
        {...pageTransition}
        key="portfolio"
      >
      {/* Header with Navigation */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-18 lg:pt-20" role="main" id="main-content">
        {/* Hero Section */}
        <Hero profile={data.profile} />

        {/* About Section */}
        <Suspense fallback={
          <div className="py-12 sm:py-16 md:py-20 bg-white flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading about section..." />
          </div>
        }>
          <About profile={data.profile} skills={data.skills} />
        </Suspense>

        {/* Case Studies Section */}
        <Suspense fallback={
          <div className="py-12 sm:py-16 md:py-20 bg-gray-50 flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading case studies..." />
          </div>
        }>
          <CaseStudies caseStudies={data.caseStudies} className="bg-gray-50" />
        </Suspense>

        {/* Skills Section */}
        <Suspense fallback={
          <div className="py-12 sm:py-16 md:py-20 bg-white flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading skills..." />
          </div>
        }>
          <Skills skills={data.skills} className="bg-white" />
        </Suspense>

        {/* Experience Section */}
        <section id="experience" className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center sm:text-left mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Experience</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                My professional journey in product management
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card hover className="p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Suspense fallback={
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="md" text="Loading experience..." variant="pulse" />
                  </div>
                }>
                  <Experience experiences={data.experience} education={data.education} />
                </Suspense>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <Suspense fallback={
          <div className="py-12 sm:py-16 md:py-20 bg-white flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading contact section..." />
          </div>
        }>
          <Contact 
            profile={data.profile} 
            experience={data.experience}
            education={data.education}
            skills={data.skills}
            className="bg-white" 
          />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />
      
      {/* Performance Monitor (development only) */}
      <PerformanceMonitor />
      </motion.div>
    </AnimatePresence>
  )
}

export default App