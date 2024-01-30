import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { getAllUsers } from '../../api/users'
import Search from '../../components/search/Search'
import Users from '../../components/users/Users'
import { useQueryParams } from '../../hooks/useQueryParams'
import { parseSortString, makeSortString } from '../../utils/sorting'

const Home = () => {
  const [users, setUsers] = useState([])
  const { queryParams, setQueryParams } = useQueryParams()

  const sortParams = queryParams.sort || ''
  const [sort, order] = parseSortString(sortParams)
  const search = queryParams.search

  const queryVariables = useMemo(
    () => ({
      _sort: sort,
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
    getAllUsers(queryVariables).then((res) => {
      setUsers(res.data)
    })
  }, [queryVariables])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <div className="container">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h1>List of users</h1>
        <div className="d-flex flex-row align-items-center justify-content-end gap-4">
          <Search />
        </div>
      </div>
      {users.length > 0 ? (
        <Users handleSort={handleSort} order={order} users={users} />
      ) : (
        <div className="d-flex flex-row align-items-center justify-content-center">No users</div>
      )}
    </div>
  )
}

export default Home
