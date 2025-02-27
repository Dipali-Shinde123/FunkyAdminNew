import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./auth/context";
import Router from "./routes/sections";
import { SnackbarProvider } from 'notistack'

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* <Routes>
        Dashboard Layout
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />

          Others Page
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />


          <Route path="/blank" element={<Blank />} />

          Forms
          <Route path="/form-elements" element={<FormElements />} />

          Tables
          <Route path="/basic-tables" element={<BasicTables />} />

          Ui Elements
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          Charts
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        Auth Layout
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userlist" element={<UserList />} />

        Fallback Route
        <Route path="*" element={<NotFound />} />
      </Routes> */}
      <AuthProvider>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </AuthProvider>

    </>
  );
}
