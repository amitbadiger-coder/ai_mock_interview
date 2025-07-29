import Model from "./Model";
import { Button } from "../ui/button";

interface SaveModelProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading:boolean;
}


export const SaveModel = ({isOpen,onClose,onConfirm,loading}:SaveModelProps) => {
  return (
    <>
      <Model
      title="Are you Sure!"
      description="This Action cannot be undone you can't edit or re-answer this questions"
      isOpen={isOpen}
      onClose={onClose}
      >
      <div className="pt-6 space-x-6 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
            cancel
        </Button>
        <Button
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-800"
        onClick={onConfirm}
        >
            continue

        </Button>

      </div>
      </Model>
      </>
  )
}

