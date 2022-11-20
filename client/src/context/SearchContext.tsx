import type { ReactNode } from 'react'

import { createContext, useContext, useState } from 'react'
// query is the state
// SearchHandler is a function for changing the state.
interface SearchState {
  query: string
  searchHandler: (query: string) => void
}
export const SearchContext = createContext<SearchState>({
  query: '',
  searchHandler: () => {},
})

// Defining a simple HOC component
const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('')

  const searchHandler = (query: string): void => {
    setQuery(query)
  }

  return (
    <SearchContext.Provider
      value={{ query, searchHandler }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
export const useSearchState = () => useContext(SearchContext)
