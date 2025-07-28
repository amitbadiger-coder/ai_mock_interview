import { useAuth } from "@clerk/clerk-react";
import { CircleStop, Mic, RefreshCcw, RefreshCw, Video, VideoOff, WebcamIcon } from "lucide-react";
import { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { TooltipButton } from "./TooltipButton";
import { toast } from "sonner";

interface AIResponse {
  ratings: number;
  feedback: string;
}


interface RecordAnsProps{
    question:{question:string; answer:string};
    iswebCam:boolean;
    setIsWebCam:(value:boolean)=>void;
}
const RecordAns = ({question,iswebCam,setIsWebCam}:RecordAnsProps) => {
    const recordUserAnswer=async()=>{
      if(isRecording){
        stopSpeechToText();

        if(userAnswer?.length < 30){
            toast.error("Error",{
                description:"Your Answer should be more than 30 characters."
            });
            return;
        }
      }else{
        startSpeechToText();
      }
    }
    const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordNewAns=()=>{
    setUserAnswer("");
        stopSpeechToText();
    startSpeechToText();
  }
  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
          <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
            {iswebCam ?(
                <Webcam
                onUseMedia={()=>setIsWebCam(true)}
                onUseMediaError={()=>setIsWebCam(false)}
                className="w-full h-full object-cover rounded-md"
                />
            ):(
                <WebcamIcon 
                className="min-w-24 min-h-24 text-muted-foreground "
                />
            )}
        </div>
        <div className="flex items-center justify-center gap-3">
             <TooltipButton
          content={iswebCam ? "Turn Off" : "Turn On"}
          icon={
            iswebCam ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setIsWebCam(!iswebCam)}
        />
         <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />
        <TooltipButton
        content="Record Again"
        icon={<RefreshCw className="min-w-5 min-h-5"/>}
        onClick={recordNewAns}

        />

        </div>
        
        </div>
  )
}

export default RecordAns