import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import PublicLayout from "@/layout/PublicLayout"
import HomePage from "@/components/HomePage"
import AuthLayout from "@/layout/AuthLayout"
import SignIn from "@/components/SignInPage"
import SignUp from "@/components/SignUpPage"
import ProtectedRoute from "@/layout/ProtectedRoute"
import MainLayout from "@/layout/MainLayout"
import { Generate } from "./components/Generate"
import Dashboard from "./components/Routes/Dashboard"
import CreateEditPage from "./components/Routes/CreateEditPage"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes  */}
        <Route element={<PublicLayout/>}>
        <Route index element={<HomePage/>}></Route>
        </Route>
        {/* Authenticated routes */}
        <Route element={<AuthLayout/>}>
        <Route path="/signin/*" element={<SignIn/>}/>
        <Route path="/signup/*" element={<SignUp/>}/>
        </Route>

        {/* protected layout */}
        <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
         {/* here we have to add the protected routes */}
         <Route  path="/generate" element={<Generate/>}>
         <Route index element={<Dashboard/>}/>
         <Route path=":interviewId" element={<CreateEditPage/>}/>

         </Route>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App