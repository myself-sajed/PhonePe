import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Login from './Login'


const Home = () => {
    const [auth, setAuth] = useState(false)
    return (

        <>


            {
                auth ? <div className='mx-10 '>
                    <Navbar />

                    <Main />

                </div> : <Login setAuth={setAuth} />
            }


        </>
    )
}

export default Home