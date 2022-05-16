import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PaginationProvider } from './context/Pagination.context'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </React.StrictMode>,
)
