import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Smartphone, 
  Database, 
  Brain, 
  Shield, 
  Cloud, 
  Palette, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Heart, 
  Music, 
  Camera, 
  Sun, 
  GraduationCap, 
  Globe,
  ArrowRight
} from 'lucide-react'
import categoriesData from '../data/categories.json'

const categoryIcons = {
  'web-development': Code,
  'mobile-development': Smartphone,
  'data-science': Database,
  'artificial-intelligence': Brain,
  'cybersecurity': Shield,
  'cloud-computing': Cloud,
  'design': Palette,
  'business': Briefcase,
  'marketing': TrendingUp,
  'finance': DollarSign,
  'health': Heart,
  'music': Music,
  'photography': Camera,
  'lifestyle': Sun,
  'academic': GraduationCap,
  'language': Globe
}

export default function Categories() {
  const { t } = useTranslation()

  const getCategoryIcon = (categoryId) => {
    return categoryIcons[categoryId] || BookOpen
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('categories.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('categories.description')}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => {
            const IconComponent = getCategoryIcon(category.id)
            const colorClass = getCategoryColor(category.color)
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        <IconComponent className="w-6 h-6 text-white" />
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
                        {category.subcategories.length} {t('categories.subcategories')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Featured Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('categories.popularCategories')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('categories.popularDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.slice(0, 6).map((category, index) => {
              const IconComponent = getCategoryIcon(category.id)
              const colorClass = getCategoryColor(category.color)
              
              return (
                <motion.div
                  key={`featured-${category.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {category.courseCount.toLocaleString()} courses
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('categories.ctaTitle')}
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('categories.ctaDescription')}
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('categories.browseAllCourses')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 