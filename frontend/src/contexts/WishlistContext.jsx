import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    // Load wishlist from localStorage on app load
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (error) {
        console.error('Error parsing stored wishlist data:', error)
        localStorage.removeItem('wishlist')
      }
    }
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (course) => {
    const existingItem = wishlist.find(item => item.id === course.id)
    
    if (existingItem) {
      toast.error('Course is already in your wishlist')
      return
    }

    const wishlistItem = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.thumbnail || course.image,
      rating: course.rating,
      studentsEnrolled: course.studentsEnrolled,
      addedAt: new Date().toISOString()
    }

    setWishlist(prev => [...prev, wishlistItem])
    toast.success('Added to wishlist')
  }

  const removeFromWishlist = (courseId) => {
    setWishlist(prev => prev.filter(item => item.id !== courseId))
    toast.success('Removed from wishlist')
  }

  const clearWishlist = () => {
    setWishlist([])
    toast.success('Wishlist cleared')
  }

  const getWishlistCount = () => {
    return wishlist.length
  }

  const isInWishlist = (courseId) => {
    return wishlist.some(item => item.id === courseId)
  }

  const moveToCart = (courseId) => {
    const course = wishlist.find(item => item.id === courseId)
    if (course) {
      // This would typically trigger the cart context
      removeFromWishlist(courseId)
      toast.success('Course moved to cart')
      return course
    }
    return null
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlistCount,
    isInWishlist,
    moveToCart
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
} 