import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface navigationRouteProp{
    isMobile?:boolean;
}

const NavigationRoute = ({isMobile = false}:navigationRouteProp) => {
  return (
   <ul className={cn("flex items-center gap-6" , isMobile && "items-start flex-col gap-8")}>
    {MainRoutes.map((route)=>(
      <NavLink
      key={route.href}
      to={route.href}
      className={({ isActive }) =>
            cn(
              "text-base text-neutral-600 transition-all duration-200 pb-1",
              isActive && "text-neutral-900 font-semibold border-b-2 border-neutral-900"
            )
          }
      >
       {route.label}
      </NavLink>
    ))}
   </ul>
  )
}

export default NavigationRoute