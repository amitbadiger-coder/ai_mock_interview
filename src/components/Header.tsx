import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

import Container from "./Container";
import { cn } from "@/lib/utils";
import LogoContainer from "./LogoContainer";
import NavigationRoute from "./Routes/NavigationRoute";
import ProfileContainer from "./ProfileContainer";
import ToggleContainer from "./ToggleContainer";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn(
        "w-full border-b duration-150 transition-all ease-in-out py-2"
      )}
    >
      <Container>
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-2">
            <LogoContainer />
            <NavLink
              to="/"
              className="text-xl font-bold text-neutral-800 hover:text-neutral-600 transition-all duration-200 transform hover:scale-105"
            >
              Aispire
            </NavLink>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-3 flex-1 justify-center">
            <NavigationRoute />
            {userId && (
             <NavLink
  to="/generate"
  className={({ isActive }) =>
    cn(
      "text-base text-neutral-600 transition-all duration-200 pb-1",
      isActive &&
        "text-neutral-900 font-semibold border-b-2 border-neutral-900"
    )
  }
>
  Take an Interview
</NavLink>
            )}
          </nav>

          {/* Right: Profile + Toggle */}
          <div className="flex items-center gap-6 flex-gr">
            {/* Increase profile size here */}
            <ProfileContainer  />
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
