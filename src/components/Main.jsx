import React from 'react'
import Sidebar from './Sidebar'
import AllServices from './AllServices'
import TransactionHistory from '../pages/TransactionHistory'
import Transaction from '../pages/Transaction'
import { Route, Routes } from 'react-router-dom'
import Service from '../pages/Service'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import PageNotFound from '../pages/PageNotFound'

const Main = () => {

    const user = useSelector(state => state.user.user)


    return (
        <div className="flex justify-start gap-5 items-start mt-10">
            <Sidebar />

            {
                user !== null ? <Routes>
                    <Route path="/" exact element={<AllServices />} />
                    <Route path="/services/history" exact element={<TransactionHistory />} />
                    <Route path="/services/transaction/:transactionURL" element={<Transaction />} />
                    <Route path="/services/transfer-money/:service" element={<Service />} />
                    <Route path="*" element={<PageNotFound />} />

                </Routes>

                    :

                    <div className="flex items-center justify-center w-full">
                        <Loader title='Fetching Services for you' />
                    </div>

            }

        </div>
    )
}

export default Main