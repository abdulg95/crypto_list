import React from 'react'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  showRetry?: boolean
}

function ErrorDisplay({ error, onRetry, showRetry = true }: ErrorDisplayProps) {
  return (
    <div className="error-display">
      <div className="error-content">
        <h3 className="error-title">Something went wrong</h3>
        <p className="error-message">{error}</p>
        {showRetry && onRetry && (
          <button 
            className="retry-button"
            onClick={onRetry}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay 