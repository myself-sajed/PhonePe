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

const Main = ({ number }) => {

    const user = useSelector(state => state.user.user)


    return (
        <div className="lg:grid xl:grid-cols-3 lg:grid-cols-4">
            <div className="h-full w-full lg:block hidden bg-[#c8c8ff1f] ">
                <Sidebar number={number} />
            </div>

            <div className="xl:col-span-2 lg:col-span-3 mt-[4rem] lg:p-0 p-2">
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

        </div>
    )
}

export default Main