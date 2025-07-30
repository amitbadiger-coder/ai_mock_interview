import { Link } from "react-router-dom"
import Heading from "../Heading"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"

import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/config/Firebase.config"

import { toast } from "sonner"
import type { Interview } from "@/types"
import { Skeleton } from "../ui/skeleton"
import InterviewPin from "../InterviewPin"




const Dashboard = () => {
  const [interviews,setInterviews]=useState<Interview[]>([])
  const [loading,setLoading]=useState(false);
  const{userId}=useAuth();

  useEffect(()=>{
     const interviewQuery = query(
      collection(db,"interviews"),
      where("userId","==",userId)
     );
     
     const unSubscribe = onSnapshot(interviewQuery,(snapshot)=>{
      const InterviewList:Interview[] = snapshot.docs.map(doc=>{
        const id=doc.id
        return {
          id,
          ...doc.data()
        }
      }) as Interview[]
      setInterviews(InterviewList)
      setLoading(false)
     },(error)=>{
      console.log("Error on Fetching:",error);
      toast.error("Error..",{
        description:"Something went wrong please. Please try Again later..."
      })
      setLoading(false)
     })
     return ()=>unSubscribe()


  },[userId])
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

    <div className="md:grid md:grid-cols-3 gap-3 py-4 mb-80">
      {loading ? (
        Array.from({length : 6}).map((_ , index)=>(
        <Skeleton key={index} className="h-24 md:h-32 rounded-md"/>
      ))
    ) : interviews.length > 0 ?
    (interviews.map((interview) => (
      <InterviewPin key={interview.id} interview={interview}/>
      ))
    ):(
       <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            <img
              src="/assets/svg/not-found.svg"
              className="w-44 h-44 object-contain"
              alt=""
            />

            <h2 className="text-lg font-semibold text-muted-foreground">
              No Data Found
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There is no available data to show. Please add some new mock
              interviews
            </p>

            <Link to={"/generate/create"} className="mt-4">
              <Button size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
    )
    
    }
    </div>
        </>
  )
}

export default Dashboard