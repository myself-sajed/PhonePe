import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Login from './Login'


const Home = () => {
    const [auth, setAuth] = useState(true)
    return (

        <>


            {
                auth ? <div className=''>
                    <Navbar />
                    <Main />
                </div> : <Login setAuth={setAuth} />
            }


        </>
    )
}

export default Home