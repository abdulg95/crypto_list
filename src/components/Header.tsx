import React from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
    </header>
  )
}

export default Header 