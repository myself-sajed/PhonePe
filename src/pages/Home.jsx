import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Login from './Login'


const Home = () => {
    const [auth, setAuth] = useState({ auth: false, number: null })
    return (

        <>


            {
                auth.auth ? <div className=''>
                    <Navbar number={auth.number} />
                    <Main number={auth.number} />
                </div> : <Login setAuth={setAuth} />
            }


        </>
    )
}

export default Home