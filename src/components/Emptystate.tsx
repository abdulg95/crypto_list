import React from 'react'

interface EmptyStateProps {
  title?: string
  message?: string
  action?: React.ReactNode
}

function EmptyState({ 
  title = 'No Data Available', 
  message = 'There are no cryptocurrencies to display at the moment.',
  action 
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-message">{message}</p>
        {action && (
          <div className="empty-state-action">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState 