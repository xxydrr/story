import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './APP'
import SearchContextProvider from '~/context/SearchContext'
import AuthProvider from '~/context/AuthContext'
import RelationshipContext from '~/context/RelationshipContext'
import '~/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RelationshipContext>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </RelationshipContext>
    </AuthProvider>
  </React.StrictMode>,
)
