import React, { useState } from 'react'
import { useQueryParams } from '../hooks/useQueryParams'
import { debounce } from 'lodash'

const Search = () => {
  const { queryParams, setQueryParams, removeQueryParam } = useQueryParams()

  const [search, setSearch] = useState(queryParams.search || '')

  const setSearchToUrl = debounce((name) => {
    if (name) {
      setQueryParams({ search: name })
    } else removeQueryParam('search')
  }, 500)

  const handleSearchChange = (name) => {
    setSearch(name)
    setSearchToUrl(name)
  }

  return (
    <form className="form-inline d-flex justify-content-center md-form form-sm">
      <input
        aria-label="Search"
        className="form-control form-control-md mr-3 w-100"
        id="username"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search username"
        type="text"
        value={search}
      />
    </form>
  )
}

export default Search
