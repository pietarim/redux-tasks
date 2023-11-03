import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {return state.notification})
  const style = {
    border: notification ? '1px solid' : 'none',
    padding: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification