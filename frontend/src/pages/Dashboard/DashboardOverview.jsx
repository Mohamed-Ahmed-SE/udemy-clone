import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock,
  Star,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import coursesData from '../../data/courses.json'

export default function DashboardOverview() {
  const { t } = useTranslation()
  const { user } = useAuth()

  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      name: t('dashboard.stats.coursesEnrolled'),
      value: user?.enrolledCourses?.length || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      name: t('dashboard.stats.hoursLearned'),
      value: '24.5',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      name: t('dashboard.stats.certificates'),
      value: user?.certificates?.length || 0,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      name: t('dashboard.stats.avgRating'),
      value: '4.8',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    }
  ]

  const recentCourses = user?.enrolledCourses?.slice(0, 3).map(courseId => 
    coursesData.find(course => course.id === courseId)
  ).filter(Boolean) || []

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Complete React Fundamentals Quiz',
      course: 'React Complete Guide',
      dueDate: '2024-01-15',
      type: 'quiz'
    },
    {
      id: 2,
      title: 'Submit Final Project',
      course: 'JavaScript Masterclass',
      dueDate: '2024-01-20',
      type: 'project'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Completed lesson',
      course: 'React Complete Guide',
      lesson: 'State Management with Hooks',
      time: '2 hours ago',
      icon: CheckCircle
    },
    {
      id: 2,
      action: 'Started course',
      course: 'JavaScript Masterclass',
      time: '1 day ago',
      icon: Play
    },
    {
      id: 3,
      action: 'Earned certificate',
      course: 'HTML & CSS Basics',
      time: '3 days ago',
      icon: Award
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome', { name: user?.firstName || 'Student' })}
        </h1>
        <p className="text-primary-100">
          {t('dashboard.welcomeSubtitle')}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.recentCourses')}
            </h3>
          </div>
          <div className="p-4">
            {recentCourses.length > 0 ? (
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {course.instructor}
                      </p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('dashboard.noCourses')}
                </p>
                <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                  {t('dashboard.browseCourses')}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.upcomingDeadlines')}
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {deadline.course}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(deadline.dueDate).toLocaleDateString()}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200">
                      {deadline.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.recentActivity')}
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.action}</span>
                      {activity.course && (
                        <span className="text-gray-600 dark:text-gray-400">
                          {' '}in <span className="font-medium">{activity.course}</span>
                        </span>
                      )}
                      {activity.lesson && (
                        <span className="text-gray-600 dark:text-gray-400">
                          : {activity.lesson}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('dashboard.quickActions')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <BookOpen className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {t('dashboard.actions.browseCourses')}
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Calendar className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {t('dashboard.actions.schedule')}
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Users className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {t('dashboard.actions.community')}
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <TrendingUp className="w-6 h-6 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {t('dashboard.actions.progress')}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  )
} 