import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const { t } = useTranslation()

  // ✅ Initialize cart directly from localStorage (avoids flicker)
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error('Error parsing stored cart data:', error)
      localStorage.removeItem('cart')
      return []
    }
  })

  const [loading, setLoading] = useState(false)

  // ✅ Keep localStorage in sync with state
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (course) => {
    const existingItem = cart.find(item => item.id === course.id)
    if (existingItem) {
      toast.error(t('cart.alreadyInCart', 'Course is already in your cart'))
      return
    }

    const cartItem = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.thumbnail || course.image,
      addedAt: new Date().toISOString()
    }

    setCart(prev => [...prev, cartItem])
    toast.success(t('actions.addToCart', 'Added to cart'))
  }

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(item => item.id !== courseId))
    toast.success(t('cart.removed', 'Course removed from cart'))
  }

  const clearCart = () => {
    setCart([])
    toast.success(t('cart.cleared', 'Cart cleared'))
  }

  const getCartTotal = () => cart.reduce((total, item) => total + item.price, 0)

  const getCartCount = () => cart.length

  const isInCart = (courseId) => cart.some(item => item.id === courseId)

  const checkout = async () => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000)) // simulate checkout
      setCart([])
      toast.success(t('cart.orderSuccess', 'Order placed successfully!'))
      return { success: true }
    } catch (error) {
      toast.error(t('cart.checkoutFailed', 'Checkout failed. Please try again.'))
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const applyCoupon = (couponCode) => {
    const validCoupons = {
      'SAVE20': 0.2,
      'WELCOME10': 0.1,
      'STUDENT15': 0.15
    }

    if (validCoupons[couponCode]) {
      toast.success(`Coupon applied! ${couponCode} discount added.`)
      return { success: true, discount: validCoupons[couponCode] }
    } else {
      toast.error('Invalid coupon code')
      return { success: false }
    }
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    checkout,
    applyCoupon
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
