import { useAuth, UserButton } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";


const ProfileContainer = () => {
    const {isLoaded,isSignedIn}=useAuth();
    if(!isLoaded){
        return(
            <div className="flex items-center">
                <Loader className="min-w-4 min-h-4 animate-spin text-enerald-500"></Loader>
            </div>
        )
    }
  return (
    <div>

        {
            isSignedIn? (
                <UserButton afterSignOutUrl="/"></UserButton>
            ):(
                <Link to={"/signin"}>
                <Button size={"sm"}>GET STARTED</Button>
                </Link>
            )
        }
    </div>
  )
}

export default ProfileContainer