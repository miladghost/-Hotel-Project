import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Bookings from "./pages/Bookings";
// import Account from "./pages/Account";
// import Cabins from "./pages/Cabins";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import Settings from "./pages/Settings";
// import Users from "./pages/Users";
// import Booking from "./pages/Booking";
// import Checkin from "./pages/Chekin";
// import AppLayout from "./ui/AppLayout";
import ProtectedAuth from "./ui/ProtectedAuth";
import GlobalStyles from "./styles/GlobalStyles";
import Spinner from "./ui/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { Suspense, lazy } from "react";
import CreateNewBookingForm from "./features/bookings/CreateNewBookingForm";
import GuestsTable from "./features/guests/GuestsTable";
import Guest from "./pages/Guest";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkin = lazy(() => import("./pages/Chekin"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Cabins = lazy(() => import("./pages/Cabins"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedAuth>
                    <AppLayout />
                  </ProtectedAuth>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="addBooking" element={<CreateNewBookingForm />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
                <Route path="guests" element={<Guest />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={8}
          containerStyle={{ margin: "7px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px,24px",
              marginTop: "20px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              textTransform: "capitalize",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
export default App;
