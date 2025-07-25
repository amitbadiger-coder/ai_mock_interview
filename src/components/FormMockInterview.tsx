import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { Loader, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { CustomBreakCrumb } from "./CustomBreakCrumb";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts";


interface FormMockInterviewprops{
    initialData:Interview | null;
}

// const formSchema = z.object({
//   position: z
//     .string()
//     .min(1, "Position is required")
//     .max(100, "Position must be 100 characters or less"),
//   description: z.string().min(5, "Description is required"),
//   experience: z.coerce
//     .number()
//     .min(0, "Experience cannot be empty or negative"),
//   techStack: z.string().min(1, "Tech stack must be at least a character"),
// });
const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(5, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

// type FormData = z.infer<typeof formSchema>;

type FormData = z.infer<typeof formSchema>;


const FormMockInterview = ({initialData}:FormMockInterviewprops) => {

  // const form = useForm<FormData>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: initialData || {},
  // });
  const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    position: initialData?.position ?? '',
    description: initialData?.description ?? '',
    experience: initialData?.experience ?? '',
    techStack: initialData?.techStack ?? '',
  },
});

  const {isValid, isSubmitting}=form.formState;
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const {userId}=useAuth();

  const title = initialData?.position ? initialData?.position : "Create A new Mock Interview";

  const breadCrumbPage = initialData?.position ? "Edit" :"Create";

  const action = initialData? "save Changes": "create";

  const toastMessage = initialData? {title:"upload..!",description:"changes saved successfully..."}:{title:"created..!",description:"New Mock Interview Created..."}

 const cleanAiResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Extract a JSON array by capturing text between square brackets
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    // Step 4: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAiResponse = async(data: FormData)=>{
    const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

    const aiResult = await chatSession.sendMessage(prompt);
    console.log(aiResult.response.text().trim())
    const cleanedResponse = cleanAiResponse(aiResult.response.text());

    return cleanedResponse;
  } 


  const onSubmit= async(data: FormData)=>{
   try {
    setLoading(true);
    if (initialData) {

      
    } else {
      if(isValid){
        const aiResult = await generateAiResponse(data);
      }
      
    }
   } catch (error) {
    console.log(error);
    toast.error("Error...",{
      description:`Something went wrong please try again later`,
    });
   }
   finally{
    setLoading(false);
   }
  };

  useEffect(()=>{
    if(initialData){
      form.reset({
        position: initialData.position,
        description:initialData.description,
        experience:initialData.experience,
        techStack:initialData.techStack,
      })
    }
  },[initialData,form])
  return (
    <div>
        <CustomBreakCrumb
        breadCrumbPage={breadCrumbPage}
        breadCrumbItems={[{label:"MOCK INTERVIEWS", link:"/generate"}]}
        />

        <div className="mt-4 flex items-center justify-between w-full">
          <Heading
          title={title} isSubHeading
          />
          {initialData && (
            <Button size={"icon"} variant={"ghost"}>
              <Trash2 className="min-w-4 min-h-4 text-red-600"/>
            </Button>
          )}

        </div>
        <Separator className="my-4"/>
        <div className="my-6"></div>

        <FormProvider {...form}>
           <form
          onSubmit={form.handleSubmit(onSubmit)}

          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
            <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    // value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
            {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({field})=>(
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Description</FormLabel>
                  <FormMessage className="text-sm"/>
                </div>
                <FormControl>
                  <Textarea
                  disabled={loading}
                  className="h-12"
                  placeholder="Eg:Describe your job Role or Position"
                  {...field}
                  // value={field.value}
                  />
                </FormControl>

              </FormItem>
            )}
            />

            {/* experience */}
    <FormField
            control={form.control}
            name="experience"
            render={({field})=>(
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel> Years of Experience</FormLabel>
                  <FormMessage className="text-sm"/>
                </div>
                <FormControl>
                  <Input
                  type="number"
                  disabled={loading}
                  className="h-12"
                  placeholder="Eg:years in number"
                  {...field}
                  // value={field.value }
                  />
                </FormControl>

              </FormItem>
            )}
            />

            {/* techstacks */}
    <FormField  
          control={form.control}
            name="techStack"
            render={({field})=>(
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks
                  </FormLabel>
                  <FormMessage className="text-sm"/>
                </div>
                <FormControl>
                  <Textarea
                  disabled={loading}
                  className="h-12"
                  placeholder="Eg:html,css,js"
                  {...field}
                  // value={field.value}
                  />
                </FormControl>

              </FormItem>
            )}
            />
            <div className="w-full flex items-center justify-end gap-6">
              <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}

              >
                Reset
              </Button>
              <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || loading || !isValid}
              >
                {
                  loading ? 
                    <Loader className="text-gray-50 animate-spin"/>
                  :action
                }
              </Button>
            </div>
          </form>

        </FormProvider>
    </div>
  )
}

export default FormMockInterview