import LoaderPage from "@/components/LoaderPage";
import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const{isLoaded , isSignedIn}=useAuth();

    if(!isLoaded){
        return <LoaderPage/>
    }

    if(!isSignedIn){
        return <Navigate to={"/signin"} replace/>
    }
  return (
   children
  )
}

export default ProtectedRoute