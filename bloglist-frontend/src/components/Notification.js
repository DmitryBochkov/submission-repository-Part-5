import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: '#ddd',
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: '2px',
    padding: '10px 15px',
    margin: '15px 0',
  }

  return (
    <p style={style}>
      { notification.message }
    </p>
  )
}

export default Notification