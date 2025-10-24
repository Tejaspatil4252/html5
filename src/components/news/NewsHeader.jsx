import React from 'react'

const PageHeading = ({ title = "News", subtitle = "" }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        <span className="text-red-600">{title}</span>
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default PageHeading