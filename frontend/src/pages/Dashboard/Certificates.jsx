import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Award,
  Download,
  Share2,
  Eye,
  Calendar,
  Star,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import coursesData from '../../data/courses.json'

export default function Certificates() {
  const [view, setView] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const { t } = useTranslation()
  const { user } = useAuth()

  // Mock certificates data - in a real app, this would come from an API
  const certificates = [
    {
      id: 1,
      courseId: 'course-1',
      courseName: 'React Complete Guide',
      instructor: 'Max Schwarzmüller',
      issueDate: '2024-01-10',
      grade: 'A+',
      score: 95,
      certificateUrl: 'https://example.com/certificate1.pdf',
      thumbnail: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=React+Certificate'
    },
    {
      id: 2,
      courseId: 'course-2',
      courseName: 'JavaScript Masterclass',
      instructor: 'Jonas Schmedtmann',
      issueDate: '2024-01-05',
      grade: 'A',
      score: 92,
      certificateUrl: 'https://example.com/certificate2.pdf',
      thumbnail: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=JavaScript+Certificate'
    },
    {
      id: 3,
      courseId: 'course-3',
      courseName: 'HTML & CSS Basics',
      instructor: 'Brad Traversy',
      issueDate: '2023-12-20',
      grade: 'A+',
      score: 98,
      certificateUrl: 'https://example.com/certificate3.pdf',
      thumbnail: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=HTML+CSS+Certificate'
    }
  ]

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         certificate.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'recent' && new Date(certificate.issueDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                         (filter === 'high-score' && certificate.score >= 90)

    return matchesSearch && matchesFilter
  })

  const handleDownload = (certificate) => {
    // In a real app, this would download the certificate
    console.log('Downloading certificate:', certificate.courseName)
  }

  const handleShare = (certificate) => {
    // In a real app, this would share the certificate
    console.log('Sharing certificate:', certificate.courseName)
  }

  const handleView = (certificate) => {
    // In a real app, this would open the certificate in a new tab
    window.open(certificate.certificateUrl, '_blank')
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'A':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'B+':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.certificates')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCertificates.length} {t('dashboard.certificatesEarned')}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            {t('dashboard.browseCourses')}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dashboard.searchCertificates')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">{t('dashboard.filters.all')}</option>
              <option value="recent">{t('dashboard.filters.recent')}</option>
              <option value="high-score">{t('dashboard.filters.highScore')}</option>
            </select>

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
          </div>
        </div>
      </div>

      {/* Certificates Grid/List */}
      {filteredCertificates.length > 0 ? (
        <div className={`grid gap-6 ${
          view === 'grid'
            ? 'md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}>
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
                view === 'list' ? 'flex' : ''
              }`}
            >
              {/* Certificate Image */}
              <div className={`relative ${view === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <img
                  src={certificate.thumbnail}
                  alt={certificate.courseName}
                  className={`w-full object-cover ${view === 'list' ? 'h-full' : 'h-48'}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                {/* Grade Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(certificate.grade)}`}>
                    {certificate.grade}
                  </span>
                </div>
              </div>

              {/* Certificate Content */}
              <div className={`p-6 flex-1 ${view === 'list' ? 'flex flex-col justify-between' : ''}`}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {certificate.courseName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {certificate.instructor}
                  </p>

                  {/* Certificate Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={getScoreColor(certificate.score)}>
                        {certificate.score}%
                      </span>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t('dashboard.score')}
                      </span>
                      <span className={`font-medium ${getScoreColor(certificate.score)}`}>
                        {certificate.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          certificate.score >= 90 ? 'bg-green-500' :
                          certificate.score >= 80 ? 'bg-blue-500' :
                          certificate.score >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${certificate.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleView(certificate)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t('dashboard.view')}</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(certificate)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={t('dashboard.download')}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(certificate)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={t('dashboard.share')}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Award className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('dashboard.noCertificates')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('dashboard.noCertificatesDesc')}
          </p>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            {t('dashboard.browseCourses')}
          </button>
        </motion.div>
      )}

      {/* Stats Summary */}
      {filteredCertificates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.certificateStats')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {filteredCertificates.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.totalCertificates')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(filteredCertificates.reduce((acc, cert) => acc + cert.score, 0) / filteredCertificates.length)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.averageScore')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredCertificates.filter(cert => cert.score >= 90).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.excellentScores')}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 