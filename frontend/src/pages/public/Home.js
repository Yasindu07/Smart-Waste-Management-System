import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home
        <Link to="/auth/sign-in">
            <Button variant="contained">Login</Button>
        </Link>
    </div>
  )
}

export default Home