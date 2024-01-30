import React, { useMemo } from 'react'
import PT from 'prop-types'
import User from './User'
import SortDownIcon from '../../ui-kit/components/icons/SortDownIcon'
import SortUpIcon from '../../ui-kit/components/icons/SortUpIcon'

const Users = ({ users, order, handleSort }) => {

  const renderContent = useMemo(() => {
    return users?.map((user) => <User key={user.id} userData={user} />)
  }, [users, order])

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col"><div className="px-2">Id</div></th>
          <th scope="col">Name</th>
          <th scope="col">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              Username
              <button
                className={`btn btn-light btn-sm ${order ? 'active' : ''}`}
                onClick={handleSort}
                type="button"
              >
                {order === 'desc' ? <SortDownIcon /> : <SortUpIcon />}
              </button>
            </div>
          </th>
          <th scope="col">Email</th>
          <th scope="col">Company</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>{renderContent}</tbody>
    </table>
  )
}

Users.propTypes = {
  handleSort: PT.func,
  order: PT.oneOf(['desc', 'asc', '']),
  users: PT.arrayOf(PT.shape({
    name: PT.string,
    id: PT.number,
    username: PT.string,
    email: PT.string,
    phone: PT.string,
    company: PT.shape({
      name: PT.string,
    }),
  })),
}

export default Users
