// lib/analytics.js
import { google } from 'googleapis'

// Google Analytics 4
export const trackEvent = async (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Custom analytics for blog engagement
export const trackBlogEngagement = {
  postView: (postId, postTitle) => {
    trackEvent('post_view', {
      post_id: postId,
      post_title: postTitle,
      engagement_time: 1
    })
  },

  postRead: (postId, readPercentage) => {
    trackEvent('post_read', {
      post_id: postId,
      read_percentage: readPercentage
    })
  },

  fileDownload: (postId, fileName) => {
    trackEvent('file_download', {
      post_id: postId,
      file_name: fileName
    })
  },

  search: (query, resultsCount) => {
    trackEvent('search', {
      search_query: query,
      results_count: resultsCount
    })
  },

  newsletterSignup: (source) => {
    trackEvent('newsletter_signup', {
      source: source
    })
  }
}

// Server-side analytics with Google Analytics Data API
const analytics = google.analyticsdata('v1beta')

export const getBlogAnalytics = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/analytics.readonly']
  })

  const response = await analytics.properties.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'pageTitle' },
        { name: 'pagePath' }
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'engagedSessions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/blog'
          }
        }
      }
    }
  })

  return response.data
}