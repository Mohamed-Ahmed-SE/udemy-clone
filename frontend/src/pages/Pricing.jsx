import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Star,
  Users,
  BookOpen,
  Download,
  FileText,
  Globe,
  Clock,
  Zap,
  Crown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  const plans = [
    {
      id: 'basic',
      name: t('pricing.basic.name'),
      description: t('pricing.basic.description'),
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        t('pricing.basic.features.access'),
        t('pricing.basic.features.courses'),
        t('pricing.basic.features.certificate'),
        t('pricing.basic.features.support')
      ],
      notIncluded: [
        t('pricing.basic.notIncluded.downloads'),
        t('pricing.basic.notIncluded.priority'),
        t('pricing.basic.notIncluded.advanced')
      ],
      popular: false,
      icon: BookOpen
    },
    {
      id: 'pro',
      name: t('pricing.pro.name'),
      description: t('pricing.pro.description'),
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        t('pricing.pro.features.everything'),
        t('pricing.pro.features.downloads'),
        t('pricing.pro.features.priority'),
        t('pricing.pro.features.advanced'),
        t('pricing.pro.features.offline'),
        t('pricing.pro.features.workshops')
      ],
      notIncluded: [
        t('pricing.pro.notIncluded.mentorship'),
        t('pricing.pro.notIncluded.custom')
      ],
      popular: true,
      icon: Crown
    },
    {
      id: 'enterprise',
      name: t('pricing.enterprise.name'),
      description: t('pricing.enterprise.description'),
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        t('pricing.enterprise.features.everything'),
        t('pricing.enterprise.features.mentorship'),
        t('pricing.enterprise.features.custom'),
        t('pricing.enterprise.features.analytics'),
        t('pricing.enterprise.features.api'),
        t('pricing.enterprise.features.dedicated')
      ],
      notIncluded: [],
      popular: false,
      icon: Zap
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const getYearlySavings = (monthlyPrice, yearlyPrice) => {
    const monthlyTotal = monthlyPrice * 12
    const savings = monthlyTotal - yearlyPrice
    return Math.round((savings / monthlyTotal) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${
                billingCycle === 'monthly' 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${
                billingCycle === 'yearly' 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {t('pricing.yearly')}
                {billingCycle === 'yearly' && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                    {t('pricing.save')}
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 ${
                plan.popular 
                  ? 'border-primary-500 ring-4 ring-primary-500/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-600 text-white">
                    <Star className="w-4 h-4 mr-1" />
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.popular 
                        ? 'bg-primary-100 dark:bg-primary-900/20' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <plan.icon className={`w-8 h-8 ${
                        plan.popular 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                    </span>
                    <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">
                      /{billingCycle === 'monthly' ? t('pricing.month') : t('pricing.year')}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      {t('pricing.savePercent', { percent: getYearlySavings(plan.monthlyPrice, plan.yearlyPrice) })}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t('pricing.whatsIncluded')}
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <X className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isAuthenticated ? t('pricing.getStarted') : t('pricing.signUp')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {t('pricing.faq.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('pricing.faq.cancel.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('pricing.faq.cancel.answer')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('pricing.faq.switch.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('pricing.faq.switch.answer')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('pricing.faq.features.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('pricing.faq.features.answer')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('pricing.faq.support.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('pricing.faq.support.answer')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('pricing.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('pricing.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
              {t('pricing.cta.startFree')}
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t('pricing.cta.contactSales')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 