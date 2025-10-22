import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Star } from 'lucide-react'

export default function CourseFilters({
  categories,
  levels,
  priceRanges,
  durationRanges,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  selectedRating,
  selectedDuration,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
  onRatingChange,
  onDurationChange
}) {
  const { t } = useTranslation()
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    level: true,
    price: true,
    rating: true,
    duration: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
      >
        <span>{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FilterOption = ({ value, label, checked, onChange, count }) => (
    <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 -mx-2">
      <div className="flex items-center">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      </div>
      {count && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {count}
        </span>
      )}
    </label>
  )

  const RatingOption = ({ rating, checked, onChange }) => (
    <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 -mx-2">
      <div className="flex items-center">
        <input
          type="radio"
          value={rating}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        <div className="ml-3 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            & up
          </span>
        </div>
      </div>
    </label>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('courses.filters.title')}
        </h3>

        <div className="space-y-0">
          {/* Categories */}
          <FilterSection title={t('courses.categories')} sectionKey="category">
            <div className="space-y-1">
              <FilterOption
                value=""
                label={t('courses.allCategories')}
                checked={selectedCategory === ''}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              {categories.map((category) => (
                <FilterOption
                  key={category.id}
                  value={category.name}
                  label={category.name}
                  checked={selectedCategory === category.name}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  count={category.courseCount}
                />
              ))}
            </div>
          </FilterSection>

          {/* Levels */}
          <FilterSection title={t('courses.level')} sectionKey="level">
            <div className="space-y-1">
              <FilterOption
                value=""
                label={t('courses.allLevels')}
                checked={selectedLevel === ''}
                onChange={(e) => onLevelChange(e.target.value)}
              />
              {levels.map((level) => (
                <FilterOption
                  key={level}
                  value={level}
                  label={level}
                  checked={selectedLevel === level}
                  onChange={(e) => onLevelChange(e.target.value)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Price */}
          <FilterSection title={t('courses.price')} sectionKey="price">
            <div className="space-y-1">
              <FilterOption
                value=""
                label={t('courses.allPrices')}
                checked={selectedPrice === ''}
                onChange={(e) => onPriceChange(e.target.value)}
              />
              {priceRanges.map((range) => (
                <FilterOption
                  key={range.value}
                  value={range.value}
                  label={range.label}
                  checked={selectedPrice === range.value}
                  onChange={(e) => onPriceChange(e.target.value)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Rating */}
          <FilterSection title={t('courses.rating')} sectionKey="rating">
            <div className="space-y-1">
              <FilterOption
                value=""
                label={t('courses.allRatings')}
                checked={selectedRating === ''}
                onChange={(e) => onRatingChange(e.target.value)}
              />
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <RatingOption
                  key={rating}
                  rating={rating}
                  checked={selectedRating === rating.toString()}
                  onChange={(e) => onRatingChange(e.target.value)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Duration */}
          <FilterSection title={t('courses.duration')} sectionKey="duration">
            <div className="space-y-1">
              <FilterOption
                value=""
                label={t('courses.allDurations')}
                checked={selectedDuration === ''}
                onChange={(e) => onDurationChange(e.target.value)}
              />
              {durationRanges.map((range) => (
                <FilterOption
                  key={range.value}
                  value={range.value}
                  label={range.label}
                  checked={selectedDuration === range.value}
                  onChange={(e) => onDurationChange(e.target.value)}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  )
} 