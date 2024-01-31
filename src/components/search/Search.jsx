import React, { useState } from 'react'
import { useQueryParams } from '../../hooks/useQueryParams'
import Button from '../../ui-kit/components/buttons/Button'
import debounce from 'lodash.debounce'

const Search = () => {
  const { queryParams, setQueryParams, removeQueryParam } = useQueryParams()

  const [search, setSearch] = useState(queryParams.search || '')

  const setSearchToUrl = debounce((name) => {
    if (name) {
      setQueryParams({ search: name })
    } else removeQueryParam('search')
  }, 500)

  const handleSearchChange = (name) => {
    if (name.trim() || name === '') {
      setSearchToUrl(name.trim())
    }
    setSearch(name)
  }

  const handleClear = () => {
    setSearch('')
    removeQueryParam('search')
  }


  return (
    <form className="form-inline d-flex justify-content-center md-form form-sm relative">
      <input
        aria-label="Search"
        className="form-control form-control-md mr-3 w-100"
        id="username"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search by username"
        type="text"
        value={search}
      />
      {search && (
        <Button
          aria-label="Clear input"
          className="clear-input-button"
          label="x"
          onClick={handleClear}
          type="reset"
        />
      )}
    </form>
  )
}

export default Search
