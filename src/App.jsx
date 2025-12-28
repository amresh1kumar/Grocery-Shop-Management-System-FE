import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Items from './pages/Stock/Items'
import StockDashboard from './pages/Stock/StockDashboard'
import StockReport from './pages/Stock/StockReport'
import BillingPage from './pages/Billing/BillingPage'
import BillingReport from './pages/Billing/BillingReport'
import Dashboard from './pages/Billing/Dashboard'

import ProtectedRoute from './auth/ProtectedRoute'
import PublicRoute from "./auth/PublicRoute"
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/Register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />

        <Route
          path="/StockReport"
          element={
            <ProtectedRoute>
              <StockReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/StockDashboard"
          element={
            <ProtectedRoute>
              <StockDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            // <ProtectedRoute>
              <BillingPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/billingReport"
          element={
            <ProtectedRoute>
              <BillingReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billingDashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
