import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function CourseSort({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const sortOptions = [
    { value: 'relevance', label: t('courses.sort.relevance') },
    { value: 'newest', label: t('courses.sort.newest') },
    { value: 'oldest', label: t('courses.sort.oldest') },
    { value: 'price-low', label: t('courses.sort.priceLow') },
    { value: 'price-high', label: t('courses.sort.priceHigh') },
    { value: 'rating', label: t('courses.sort.rating') },
    { value: 'students', label: t('courses.sort.students') }
  ]

  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm">{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                  value === option.value
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex-1 text-left">{option.label}</span>
                {value === option.value && (
                  <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 