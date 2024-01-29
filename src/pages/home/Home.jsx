import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  lazy,
} from 'react'
import { getAllUsers } from '../../api/users'
import Search from '../../components/Search'
import Loader from '../../ui-kit/components/loader/Loader'
import { useQueryParams } from '../../hooks/useQueryParams'
import { parseSortString, makeSortString } from '../../utils/sorting'
const Users = lazy(() => import('../../components/users/Users'))

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
        <Suspense fallback={<Loader />}>
          <Users handleSort={handleSort} order={order} users={users} />
        </Suspense>
      ) : (
        <div className="d-flex flex-row align-items-center justify-content-center">No users</div>
      )}
    </div>
  )
}

export default Home
