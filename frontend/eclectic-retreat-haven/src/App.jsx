import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Accommodations from "./pages/Accommodations.jsx";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import BookingDetail from "./features/bookings/BookingDetail.jsx";
import Checkin from "./pages/Checkin.jsx";
import {DarkModeProvider} from "./context/DarkModeContext.jsx";
import {Helmet, HelmetProvider} from 'react-helmet-async';
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Signup from "./pages/SignUp.jsx";
import MyBookings from "./pages/MyBookings.jsx";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 0
    }

  }
});

function App() {




    return (
        <HelmetProvider>
            <Helmet>
                <meta httpEquiv="Content-Security-Policy" content="script-src 'self';" />
                <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
            </Helmet>
          <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
      <GlobalStyles />
      <BrowserRouter>

        <Routes>

            <Route element={
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            }>



                        <Route index element={<Navigate replace to="/accommodations" />} />
                <Route
                    path="dashboard"
                    element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>}
                />
                        <Route path="bookings"   element={<ProtectedRoute adminOnly><Bookings /></ProtectedRoute>}/>
                <Route path="myBookings"   element={<ProtectedRoute userOnly><MyBookings /></ProtectedRoute>}/>
                        <Route path="bookings/:bookingId" element={<BookingDetail />} />
                        <Route path="checkin/:bookingId" element={<Checkin />} />
                        <Route path="accommodations" element={<Accommodations />} />
                        <Route path="users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>}/>
                        <Route path="settings"  element={<ProtectedRoute adminOnly><Settings /></ProtectedRoute>} />
                        <Route path="account" element={<Account />} />

            </Route>

          <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
          <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
          toastOptions={{
              success: {
                  duration:3000
              },
              error:{
                  duration:5000
              },
              style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)"
              }
          }}/>
      </QueryClientProvider>
      </DarkModeProvider>
        </HelmetProvider>
  );
}

export default App;
