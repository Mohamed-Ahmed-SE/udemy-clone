import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Star, 
  Clock, 
  Users, 
  Play, 
  Heart, 
  ShoppingCart,
  TrendingUp
} from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useAuth } from '../../contexts/AuthContext'

export default function CourseCard({ course, view = 'grid' }) {
  const { t } = useTranslation()
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return
    addToCart(course)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return
    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id)
    } else {
      addToWishlist(course)
    }
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  /* ---------- LIST VIEW ---------- */
  if (view === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-100"
      >
        <Link to={`/course/${course.id}`} className="flex">
          {/* Image */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <img
              src={course.thumbnail || course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {course.isBestseller && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                Bestseller
              </div>
            )}
            {course.isNew && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {course.instructor}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {/* Wishlist */}
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist(course.id)
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isInWishlist(course.id) ? 'currentColor' : 'none'} />
                </button>
                {/* Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(course.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isInCart(course.id)
                      ? 'text-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{course.rating}</span>
                <span>({formatNumber(course.reviewsCount)})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{formatNumber(course.studentsEnrolled)} students</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {course.level} • {course.language}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  /* ---------- GRID VIEW ---------- */
  return (
    <motion.div
    whileHover={{ y: -4 }}
    className="
      bg-white dark:bg-gray-800 
      rounded-xl shadow-md border border-gray-200 dark:border-gray-700 
      overflow-hidden hover:shadow-xl transition-shadow duration-100
      flex flex-col
      h-[320px] sm:h-[450px]
    "
  >
    <Link to={`/course/${course.id}`} className="flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full aspect-video flex-shrink-0">
        <img
          src={course.thumbnail || course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
  
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 text-xs sm:text-sm">
          {course.isBestseller && (
            <div className="bg-yellow-500 text-white font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3 h-3" />
              Bestseller
            </div>
          )}
          {course.discountPercentage > 0 && (
            <div className="bg-red-500 text-white font-semibold px-2 py-0.5 rounded shadow-sm">
              {course.discountPercentage}% OFF
            </div>
          )}
        </div>
  
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`p-1.5 sm:p-2 rounded-full shadow-sm transition-colors ${
              isInWishlist(course.id)
                ? 'text-red-500 bg-white dark:bg-gray-800'
                : 'text-gray-400 bg-white dark:bg-gray-800 hover:text-red-500'
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={isInWishlist(course.id) ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
  
      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 text-sm sm:text-base">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
          {course.instructor}
        </p>
  
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 text-xs sm:text-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{course.rating}</span>
          <span className="text-gray-500">({formatNumber(course.reviewsCount)})</span>
        </div>
  
        {/* Meta */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {formatNumber(course.studentsEnrolled)}
          </div>
        </div>
  
        {/* Price */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(course.price)}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
      </div>
    </Link>
  </motion.div>
  )
}
