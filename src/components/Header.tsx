import { useAuth } from "@clerk/clerk-react"
import Container from "./Container";
import { cn } from "@/lib/utils";
import LogoContainer from "./LogoContainer";
import NavigationRoute from "./Routes/NavigationRoute";
import { NavLink } from "react-router-dom";
import ProfileContainer from "./ProfileContainer";
import ToggleContainer from "./ToggleContainer";


const Header = () => {
  const {userId}=useAuth();
  return (
    <header
    className={cn(
      "w-full border-b duration-150 transition-all ease-in-out"
    )}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* logo sections */}
          <LogoContainer/>

          {/* navigation rooots */}
          <nav className="hidden md:flex items-center gap-3">

          <NavigationRoute/>
          {
            userId && (
              <NavLink
      
      to={"/generate"}
      className={({isActive})=>
      cn(
        "text-base text-neutral-600",
        isActive && "text-neutral-900 font-semibold"
      )
      }
      >
       Take an Interview
      </NavLink>
            )
          }
          </nav>

          <div className="ml-auto flex items-center gap-6">
            {/* profile section */}
             <ProfileContainer/>
            {/* mobile toggle section */}
            <ToggleContainer/>

          </div>

        </div>
      </Container>
    </header>
  )
}

export default Header