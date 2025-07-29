import { useAuth } from "@clerk/clerk-react";
import { CircleStop, Loader, Mic, RefreshCw, Save, Video, VideoOff, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText, { type ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { TooltipButton } from "./TooltipButton";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModel } from "./Routes/SaveModel";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/config/Firebase.config";

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
  

   const recordUserAnswer = async () => {
      if (isRecording) {
          stopSpeechToText();

        if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });
      return;

      
    }
    const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      setAiResult(aiResult);
  } else {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      startSpeechToText();
    } catch (err) {
      toast.error("Cannot access microphone.");
      console.error("Microphone error:", err);
    }
  }
};

 const cleanJsonResponse = (responseText: string) => {
   
    let cleanText = responseText.trim();

   
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };
useEffect(() => {
  console.log("Recording state:", isRecording);
  console.log("Interim:", interimResult);
  console.log("Results:", results);
}, [isRecording, interimResult, results]);


   
  
  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };


  useEffect(() => {
  if (!Array.isArray(results)) return;
  console.log("Raw results:", results);

  const combinedTranscripts = results
    .filter((result): result is ResultType => typeof result !== "string")
    .map((result) => result.transcript)
    .join("");

  console.log("Results updated:", combinedTranscripts);
  setUserAnswer(combinedTranscripts);
}, [results]);


  useEffect(() => {
  navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
    console.error("Microphone access denied:", err);
    toast.error("Microphone permission denied");
  });
}, []);
if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
  toast.error("Speech recognition not supported in this browser.");
  console.error("SpeechRecognition is not supported");
}

const saveUserAnswer = async () => {
    setLoading(true);

    if (!aiResult) {
      return;
    }

    const currentQuestion = question.question;
    try {
      // query the firbase to check if the user answer already exists for this question

      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      // if the user already answerd the question dont save it again
      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
        // save the user answer

        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }

      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  return (

    
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      <SaveModel
      isOpen={open}
      onClose={()=>setOpen(false)}
      onConfirm={saveUserAnswer}
      loading={loading}
      
      />
          <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
            {iswebCam ?(
                <Webcam
                onUserMedia={()=>setIsWebCam(true)}
                onUserMediaError={()=>setIsWebCam(false)}
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
        onClick={recordNewAnswer}
        />
        <TooltipButton
          content="Save Results"
          icon={
            isAiGenerating ? (
              <Loader className="min-w-5 min-h-5 animate-spin" />
            ) : (
              <Save className="min-w-5 min-h-5" />
            )
          }
          onClick={()=>setOpen(!open)}
          disbaled={!aiResult}
        />

        </div>
        <div className="w-full mt-4 p-4 border rounded-md bg-gray-50 ">
          <h2 className="text-lg font-semibold">Your Answer</h2>
          <p className="text-sm mt-2 text-gray-800 whitespace-normal">
            {userAnswer || "Start Recording to See Your Answer"}
            </p>
            {interimResult && (
              <p className="text-sm text-gray-800 mt-2">
                  <strong>Current speech:</strong>
                  {interimResult}
              </p>
            )}
        </div>
        </div>
  );
};

export default RecordAns