import { cn } from "@/lib/utils";

interface ContainerProp{
    children:React.ReactNode;
    className?:string;
}

const Container = ({children,className}:ContainerProp) => {
  return (
    <div
    className={cn("container mx-auto px-4 md:px-8 w-full",className)}
    >{children}</div>
  )
}

export default Container