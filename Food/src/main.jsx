import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

if (typeof window !== 'undefined') {
  const currentUrl = new URL(window.location.href)
  const redirectParam = currentUrl.searchParams.get('redirect')
  if (redirectParam) {
    const path = redirectParam.startsWith('/') ? redirectParam : '/' + redirectParam
    const basePath = import.meta.env.PROD ? '/SMM_' : ''
    window.history.replaceState(null, '', basePath + path)
  }
}

const basename = import.meta.env.PROD ? '/SMM_' : '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
