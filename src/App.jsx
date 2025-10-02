import {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Items from './pages/Stock/Items'
import StockDashboard from './pages/Stock/StockDashboard'
import BillingPage from './pages/Billing/BillingPage'
import Dashboard from './pages/Billing/Dashboard'
import Register from './pages/Register/Register'
import StockReport from './pages/Stock/StockReport'
import BillingReport from './pages/Billing/BillingReport'

function App() {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'; // disable window scroll

  //   return () => {
  //     document.body.style.overflow = 'auto'; // cleanup: scroll wapas enable
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/stocks' element={<Items />} />
        <Route path='/StockReport' element={<StockReport />} />
        <Route path='/StockDashboard' element={<StockDashboard />} />
        <Route path='/billing' element={<BillingPage />} />
        <Route path='/billingReport' element={<BillingReport />} />
        <Route path='/billingDashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
