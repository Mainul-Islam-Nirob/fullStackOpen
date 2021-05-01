import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)
  const style = {
    margin: '10px',
    padding: '10px',
    backgroundColor: 'gray',
    color: 'white',
    border: '1px solid green',
    borderRadius: '100px'

  }
  return (
    <>
    {
      notification !== "" && (
      <div style={style}>
        {notification}
      </div>
      )
    }
    </>
  )
}

export default Notification