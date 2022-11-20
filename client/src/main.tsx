import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import SearchContextProvider from '~/context/SearchContext'
import LikesContextProvider from '~/context/LikesContext'
import { AuthProvider } from '~/context/AuthContext'
import '~/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchContextProvider>
        <LikesContextProvider>
          <App />
        </LikesContextProvider>
      </SearchContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
