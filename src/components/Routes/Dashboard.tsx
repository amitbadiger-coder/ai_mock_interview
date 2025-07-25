import { Link } from "react-router-dom"
import Heading from "../Heading"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"


const Dashboard = () => {
  return (
    <>
    <div className=" flex w-full items-center justify-between">
        <Heading
        title="Dashboard"
        description="create your first dashboard"
        />
      <Link to={"/generate/create"}>
      <Button>
        <Plus/>
        Add New
        </Button></Link>
    </div>
    <Separator className="my-8"/>
        </>
  )
}

export default Dashboard