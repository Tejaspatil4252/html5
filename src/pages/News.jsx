import React, { useState, useEffect } from 'react'
import Navigation from '../components/header/Navigation'
import Footer from '../components/footer/Footer'
import EmptyState from '../components/EmptyState'
import PageHeading from '../components/news/NewsHeader'
import NewsContent from '../components/news/NewsContent'

const News = () => {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch news from backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/news')
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const data = await response.json()
        console.log('Backend response:', data) // Debug log
        setNewsData(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Handle refresh
  const handleRefresh = () => {
    window.location.reload()
  }

  // Safe JSON parsing function
  const parseContent = (content) => {
    try {
      if (typeof content === 'string') {
        return JSON.parse(content)
      }
      return content
    } catch (error) {
      console.error('Error parsing content:', error)
      return [] // Return empty array as fallback
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
       
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
       
        <EmptyState 
          type="news"
          title="Error Loading News"
          description={error}
          showActionButton={true}
          actionText="Try Again"
          onActionClick={handleRefresh}
        />
        <Footer/>
      </div>
    )
  }

  const hasNews = newsData && newsData.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
   
      
      <main className="container mx-auto px-4 py-8">
        {hasNews ? (
          <>
            <PageHeading 
              title="Rapptorsoft News" 
              subtitle="Latest updates and announcements from our team" 
            />
            
            <div className="space-y-8 mt-8">
              {newsData.map((newsItem) => (
                <NewsContent
                  key={newsItem.id}
                  title={newsItem.title}
                  author={newsItem.author}
                  publishDate={newsItem.publishDate}
                  category={newsItem.category}
                  content={parseContent(newsItem.content)} // ✅ Safe parsing
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState 
            type="news"
            title="No News Available"
            description="We're preparing some exciting updates. Check back soon for the latest announcements!"
            showActionButton={true}
            actionText="Refresh News"
            onActionClick={handleRefresh}
          />
        )}
      </main>
      
      <Footer/>
    </div>
  )
}

export default News