import React from 'react'
import { connect } from 'react-redux'

const Notification = ({notification}) => {

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
      notification && (
      <div style={style}>
        {notification}
      </div>
      )
    }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification