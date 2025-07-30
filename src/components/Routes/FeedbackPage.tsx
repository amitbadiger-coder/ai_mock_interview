import { db } from "@/config/Firebase.config";
import type { Interview, UserAnswer, UserAnswers } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LoaderPage from "../LoaderPage";
import { CustomBreakCrumb } from "../CustomBreakCrumb";
import Heading from "../Heading";
import InterviewPin from "../InterviewPin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";


const FeedbackPage = () => {
    const {interviewId}= useParams<{interviewId:string}>();
    const[interview,setInterview]=useState<Interview | null>(null);
    const[isloading,setIsLoading]=useState(false);
    const[feedbacks,setFeedbacks]=useState<UserAnswers[]>([]);
    const[activeFeed,setActiveFeed]=useState("");
    const {userId}=useAuth();
    const navigate=useNavigate();


     if (!interviewId) {
    navigate("/generate", { replace: true });
  }
  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        if (interviewId) {
          try {
            const interviewDoc = await getDoc(
              doc(db, "interviews", interviewId)
            );
            if (interviewDoc.exists()) {
              setInterview({
                id: interviewDoc.id,
                ...interviewDoc.data(),
              } as Interview);
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as UserAnswer;
          });

          setFeedbacks(interviewData);
        } catch (error) {
          console.log(error);
          toast("Error", {
            description: "Something went wrong. Please try again later..",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  //   calculate the ratings out of 10

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (isloading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex w-full flex-col gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
         <CustomBreakCrumb
                              breadCrumbPage={"Feedback"}
                              breadCrumbItems={[{label:"MOCK INTERVIEWS", link:"/generate"},
                                {
                                  label:interview?.position || " ",
                                  link:`/generate/interview/${interview?.id}`,
                                },
                              ]}
                              />
            
      </div>
      <Heading
            title="Congratulations...!"
            description="Your Personalized Feedback is Now Available."
            />

            <p className="text-base text-muted-foreground">
              Your OverAll Interview Ratings Are:{""}
              <span className="text-emerald-500 font-semibold text-xl">
                {overAllRating}/10;
              </span>
            </p>
            {interview && <InterviewPin interview={interview} onMockPage/>}
            <Heading  title="Interview Feedbacks" isSubHeading/>

            {feedbacks && (
              <Accordion type="single" collapsible className="space-y-6">
                {feedbacks.map((feed)=>(
                  <AccordionItem 
                  key={feed.id}
                  value={feed.id}
                  className="border rounded-lg shadow-md"
                  >
                    <AccordionTrigger
                    onClick={()=>setActiveFeed(feed.id)}
                    className={cn(
                      "px-5 py-3 flex items-center justify-between text-base rounded-md",
                      activeFeed === feed.id
                      ?"bg-gradient-to-r from-purple-50 to-blue-50"
                      :"hover:bg-gray-50"
                    )}
                    >
                     <span>{feed.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                      <div className="text-lg font-semibold to-gray-700">
                        <Star className="inline mr-2 text-yellow-500"/>
                        :Rating{feed.rating}
                      </div>

                    </AccordionContent>
                    </AccordionItem>
                ))}

              </Accordion>
            )}

    </div>
  )
}

export default FeedbackPage
