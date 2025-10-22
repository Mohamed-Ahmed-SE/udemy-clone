import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category }) {
  const getCategoryColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      sky: 'bg-sky-500',
      pink: 'bg-pink-500',
      yellow: 'bg-yellow-500',
      orange: 'bg-orange-500',
      emerald: 'bg-emerald-500',
      rose: 'bg-rose-500',
      violet: 'bg-violet-500',
      slate: 'bg-slate-500',
      amber: 'bg-amber-500',
      teal: 'bg-teal-500',
      cyan: 'bg-cyan-500'
    }
    return colorMap[color] || 'bg-gray-500'
  }

  const colorClass = getCategoryColor(category.color)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        to={`/category/${category.id}`}
        className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Category Header */}
        <div className={`p-6 ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">📚</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
        </div>

        {/* Category Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {category.courseCount.toLocaleString()} courses
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {category.subcategories.length} subcategories
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 