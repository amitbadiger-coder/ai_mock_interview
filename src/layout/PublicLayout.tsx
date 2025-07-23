
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import AuthHandlers from "@/handlers/AuthHandlers"
import { Outlet } from "react-router-dom"



const PublicLayout = () => {
  return (
    <div className="w-full">
        <AuthHandlers/>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PublicLayout