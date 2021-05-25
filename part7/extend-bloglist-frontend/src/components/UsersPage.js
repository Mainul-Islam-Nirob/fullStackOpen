import React from 'react'
import { useSelector } from 'react-redux'
import styles from './UsersPage.module.css'

const UsersPage = () => {
  const users = useSelector((state) => state.users)

  return (
    <>
      <h1 className={styles.users__title}>Users</h1>

      <div className={styles.users__container}>
        <span className={styles.users__subtitleName}>username</span>
        <span className={styles.users__subtitle}>blogs created</span>
        <ul className={styles.users__list}>
          {users?.map((user) => (
            <li className={styles.users__listitem} key={user?.id}>
              <span className={styles.users__name}>{user?.username}</span>
              <span className={styles.users__bloglength}>
                {user?.blogs?.length}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default UsersPage