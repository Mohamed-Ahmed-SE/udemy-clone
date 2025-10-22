import React from 'react'
import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, value, label }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {value}
      </div>
      <div className="text-gray-600 dark:text-gray-400">
        {label}
      </div>
    </motion.div>
  )
} 