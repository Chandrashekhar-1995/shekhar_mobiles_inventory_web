import React from 'react'
import Sidebar from '../Sidebar'
import DashboardCards from '../Dashboard/DashboardCards'
import InvoiceSection from '../Dashboard/InvoiceSection'
import RecentActivity from '../Dashboard/RecentActivity'

const Admin = () => {
  return (
    <>
      <div>
        <Sidebar/>
      </div>
      <div>
        <DashboardCards />
        <InvoiceSection />
        <RecentActivity />
      </div>
    </>
  )
}

export default Admin