import React from 'react'

function SearchIcon({ className = "" }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M21 19.593l-5.12-5.119a7.162 7.162 0 10-1.407 1.407L19.594 21 21 19.593zm-5.665-9.431a5.173 5.173 0 11-10.346 0 5.173 5.173 0 0110.346 0z" />
    </svg>
  )
}

export default SearchIcon