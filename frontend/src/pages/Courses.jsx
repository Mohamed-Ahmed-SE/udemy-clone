import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Grid, 
  List, 
  Filter, 
  Search, 
  Star, 
  Clock, 
  Users,
  ChevronDown,
  X,
  SlidersHorizontal,
  Loader2
} from 'lucide-react'
import coursesData from '../data/courses.json'
import categoriesData from '../data/categories.json'
import CourseCard from '../components/courses/CourseCard'
import CourseFilters from '../components/courses/CourseFilters'
import CourseSort from '../components/courses/CourseSort'

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { t } = useTranslation()
  
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setCourses(coursesData)
      setFilteredCourses(coursesData)
      setLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Get category from URL if navigating from category page
    const categoryId = location.state?.categoryId || searchParams.get('category')
    if (categoryId) {
      setSelectedCategory(categoryId)
    }
  }, [location, searchParams])

  useEffect(() => {
    // Apply filters
    let filtered = [...courses]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Level filter
    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Price filter
    if (selectedPrice) {
      switch (selectedPrice) {
        case 'free':
          filtered = filtered.filter(course => course.price === 0)
          break
        case 'paid':
          filtered = filtered.filter(course => course.price > 0)
          break
        case 'under-50':
          filtered = filtered.filter(course => course.price < 50)
          break
        case '50-100':
          filtered = filtered.filter(course => course.price >= 50 && course.price <= 100)
          break
        case 'over-100':
          filtered = filtered.filter(course => course.price > 100)
          break
        default:
          break
      }
    }

    // Rating filter
    if (selectedRating) {
      const rating = parseFloat(selectedRating)
      filtered = filtered.filter(course => course.rating >= rating)
    }

    // Duration filter
    if (selectedDuration) {
      switch (selectedDuration) {
        case '0-5':
          filtered = filtered.filter(course => {
            const hours = parseInt(course.duration.split(' ')[0])
            return hours <= 5
          })
          break
        case '5-10':
          filtered = filtered.filter(course => {
            const hours = parseInt(course.duration.split(' ')[0])
            return hours > 5 && hours <= 10
          })
          break
        case '10+':
          filtered = filtered.filter(course => {
            const hours = parseInt(course.duration.split(' ')[0])
            return hours > 10
          })
          break
        default:
          break
      }
    }

    // Sort courses
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated))
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'students':
        filtered.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
        break
      default:
        // Relevance - keep original order
        break
    }

    setFilteredCourses(filtered)
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice, selectedRating, selectedDuration, sortBy])

  const clearAllFilters = () => {
    setSelectedCategory('')
    setSelectedLevel('')
    setSelectedPrice('')
    setSelectedRating('')
    setSelectedDuration('')
    setSearchQuery('')
    setSortBy('relevance')
  }

  const hasActiveFilters = selectedCategory || selectedLevel || selectedPrice || selectedRating || selectedDuration || searchQuery

  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const priceRanges = [
    { value: 'free', label: t('courses.filters.priceOptions.free') },
    { value: 'paid', label: t('courses.filters.priceOptions.paid') },
    { value: 'under-50', label: t('courses.filters.priceOptions.under50') },
    { value: '50-100', label: t('courses.filters.priceOptions.50to100') },
    { value: 'over-100', label: t('courses.filters.priceOptions.over100') }
  ]
  const durationRanges = [
    { value: '0-5', label: t('courses.filters.durationOptions.0to5') },
    { value: '5-10', label: t('courses.filters.durationOptions.5to10') },
    { value: '10+', label: t('courses.filters.durationOptions.10plus') }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t('courses.loading')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('courses.filters.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCourses.length} {filteredCourses.length === 1 ? t('courses.result') : t('courses.results')}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters - Left Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <CourseFilters
              categories={categoriesData}
              levels={levels}
              priceRanges={priceRanges}
              durationRanges={durationRanges}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              selectedPrice={selectedPrice}
              selectedRating={selectedRating}
              selectedDuration={selectedDuration}
              onCategoryChange={setSelectedCategory}
              onLevelChange={setSelectedLevel}
              onPriceChange={setSelectedPrice}
              onRatingChange={setSelectedRating}
              onDurationChange={setSelectedDuration}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('courses.searchPlaceholder')}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <CourseSort value={sortBy} onChange={setSortBy} />

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        view === 'grid'
                          ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-2 rounded-md transition-colors ${
                        view === 'list'
                          ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{t('courses.filters.title')}</span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                          {t('courses.filters.category')}: {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('')}
                            className="ml-2 hover:text-primary-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedLevel && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                          {t('courses.filters.level')}: {selectedLevel}
                          <button
                            onClick={() => setSelectedLevel('')}
                            className="ml-2 hover:text-primary-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedPrice && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                          {t('courses.filters.price')}: {priceRanges.find(p => p.value === selectedPrice)?.label}
                          <button
                            onClick={() => setSelectedPrice('')}
                            className="ml-2 hover:text-primary-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedRating && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                          {t('courses.filters.rating')}: {selectedRating}+
                          <button
                            onClick={() => setSelectedRating('')}
                            className="ml-2 hover:text-primary-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedDuration && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                          {t('courses.filters.duration')}: {durationRanges.find(d => d.value === selectedDuration)?.label}
                          <button
                            onClick={() => setSelectedDuration('')}
                            className="ml-2 hover:text-primary-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 sm:self-center"
                    >
                      {t('courses.filters.clearAll')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {filteredCourses.length > 0 ? (
              <div className={`grid gap-6 ${
                view === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                <AnimatePresence mode="wait">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} view={view} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('courses.noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('courses.noResultsDesc')}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t('courses.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto lg:hidden"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{t('courses.filters.title')}</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-4">
                  <CourseFilters
                    categories={categoriesData}
                    levels={levels}
                    priceRanges={priceRanges}
                    durationRanges={durationRanges}
                    selectedCategory={selectedCategory}
                    selectedLevel={selectedLevel}
                    selectedPrice={selectedPrice}
                    selectedRating={selectedRating}
                    selectedDuration={selectedDuration}
                    onCategoryChange={setSelectedCategory}
                    onLevelChange={setSelectedLevel}
                    onPriceChange={setSelectedPrice}
                    onRatingChange={setSelectedRating}
                    onDurationChange={setSelectedDuration}
                    mobile
                  />
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      {t('courses.filters.clearAll')}
                    </button>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {t('courses.applyFilters')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}