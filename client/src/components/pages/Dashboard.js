import React from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {

  const user=useSelector((state)=>state.user)

  return (
    <div>
      <h1>My SPACE</h1>
      <h1>{user && user.name} { user && user.lastName}</h1>
      <h3>{user && user.email}</h3>
      
    </div>
  )
}

export default Dashboard
