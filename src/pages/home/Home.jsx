import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { getAllUsers } from '../../api/users'
import User from '../../components/User'
import Search from '../../components/Search'
import SortDownIcon from '../../ui-kit/components/icons/SortDownIcon'
import SortUpIcon from '../../ui-kit/components/icons/SortUpIcon'
import { useQueryParams } from '../../hooks/useQueryParams'
import { parseSortString, makeSortString } from '../../utils/sorting'

const Home = () => {
  const [users, setUsers] = useState([])
  const { queryParams, setQueryParams } = useQueryParams()

  const sortParams = queryParams.sort || ''
  const [, order] = parseSortString(sortParams)
  const search = queryParams.search

  const queryVariables = useMemo(
    () => ({
      _sort: 'username',
      _order: order,
      username_like: search,
    }),
    [order, search],
  )

  const handleSort = () => {
    const sortString = makeSortString(sortParams, 'username')
    setQueryParams({ sort: sortString })
  }

  const handleFetch = useCallback(() => {
    getAllUsers(queryVariables)
      .then((res) => {
        setUsers(res.data)
      })
  }, [queryVariables])

  const renderContent = useMemo(() => {
    return users?.map((user) => (
      <User key={user.id} userData={user} />
    ))
  }, [users, search])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <div className="container">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <h1>List of users</h1>
        <div className="d-flex flex-row align-items-center justify-content-end gap-4">
          <Search />
          <button
            className="btn btn-secondary"
            onClick={handleSort}
            type="button"
          >
            {order === 'asc' ? <SortDownIcon /> : <SortUpIcon />}
          </button>
        </div>
      </div>
      <div className="col">
        <ul className="list-group">{renderContent}</ul>
      </div>
    </div>
  )
}

export default Home
