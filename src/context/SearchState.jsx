import React, { useState } from 'react'
import SearchContext from './SearchContext'

const SearchState = (props) => {
    const [searchValue, setsearchValue] = useState("");
  return (
    <SearchContext.Provider value={{searchValue,setsearchValue}}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchState
