import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import coursesData from '../data/courses.json'
import CourseCard from '../components/courses/CourseCard'
import CourseFilters from '../components/courses/CourseFilters'
import CourseSort from '../components/courses/CourseSort'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  const query = searchParams.get('q') || ''

  useEffect(() => {
    // Load courses
    setCourses(coursesData)
    setLoading(false)
  }, [])

  useEffect(() => {
    // Apply search and filters
    let filtered = [...courses]

    // Search filter
    if (query) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
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
  }, [courses, query, selectedCategory, selectedLevel, selectedPrice, selectedRating, selectedDuration, sortBy])

  const clearAllFilters = () => {
    setSelectedCategory('')
    setSelectedLevel('')
    setSelectedPrice('')
    setSelectedRating('')
    setSelectedDuration('')
    setSortBy('relevance')
  }

  const hasActiveFilters = selectedCategory || selectedLevel || selectedPrice || selectedRating || selectedDuration

  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const priceRanges = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: 'over-100', label: 'Over $100' }
  ]
  const durationRanges = [
    { value: '0-5', label: '0-5 hours' },
    { value: '5-10', label: '5-10 hours' },
    { value: '10+', label: '10+ hours' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
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
            {t('searchResults.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {query && (
              <>
                {t('searchResults.resultsFor')} "<span className="font-medium">{query}</span>"
              </>
            )}
            {' '}{filteredCourses.length} {t('searchResults.results')}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Query Display */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {t('searchResults.searchingFor')}: <span className="font-medium">{query}</span>
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <CourseSort value={sortBy} onChange={setSortBy} />

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
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

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>{t('searchResults.filters')}</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedLevel && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Level: {selectedLevel}
                      <button
                        onClick={() => setSelectedLevel('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedPrice && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Price: {priceRanges.find(p => p.value === selectedPrice)?.label}
                      <button
                        onClick={() => setSelectedPrice('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedRating && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Rating: {selectedRating}+ stars
                      <button
                        onClick={() => setSelectedRating('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedDuration && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Duration: {durationRanges.find(d => d.value === selectedDuration)?.label}
                      <button
                        onClick={() => setSelectedDuration('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {t('searchResults.clearAll')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <CourseFilters
                categories={[]}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {filteredCourses.length > 0 ? (
          <div className={`grid gap-6 ${
            view === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
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
            <Search className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('searchResults.noResults')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('searchResults.noResultsDesc')}
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('searchResults.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 