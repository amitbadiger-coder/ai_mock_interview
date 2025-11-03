import { db } from '@/config/Firebase.config';
import type { Interview } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LoaderPage from '../LoaderPage';
import { CustomBreakCrumb } from '../CustomBreakCrumb';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb } from 'lucide-react';

import QuestionsSection from '../ui/QuestionsForm';

const MockInterviewPage = () => {
  const {interviewId}= useParams<{interviewId:string}>();
    const[interview,setInterview]=useState<Interview | null>(null);
    const navigate = useNavigate();
    const[isloading]=useState(false);

    if(!interviewId){
        navigate("/generate",{replace:true});
    }

     useEffect(()=>{
        const fetchInterview = async()=>{
            if(interviewId){
                try {
                    const interviewDoc = await getDoc(doc(db,"interviews",interviewId));
                    if(interviewDoc.exists()){
                        setInterview({ id: interviewDoc.id, ...interviewDoc.data()}as Interview)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchInterview();

    },[interviewId,navigate])

    if(isloading){
        return <LoaderPage className="w-full h-[70vh]"/>
    }
  return (
    <div className="flex flex-col w-full gap-8 py-5">
       <CustomBreakCrumb
                      breadCrumbPage="start"
                      breadCrumbItems={[{label:"MOCK INTERVIEWS", link:"/generate"},
                        {
                          label:interview?.position || " ",
                          link:`/generate/interview/${interview?.id}`,
                        },
                      ]}
                      />
                      <div className="w-full">
    <Alert className="bg-sky-100/50 border-sky-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
        <Lightbulb className="h-5 w-5 text-sky-600" />
        <div>
          <AlertTitle className="text-sky-800 font-semibold">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-sky-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You’ll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>
                      </div>
                      {interview?.questions && interview?.questions.length >0 && (
                        <div className="mt-4 w-full flex flex-col items-start gap-4">
                          <QuestionsSection questions={interview?.questions}/>
                        </div>
                      )}

    </div>
  )
}

export default MockInterviewPage