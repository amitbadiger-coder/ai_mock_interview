import LoaderPage from "@/components/LoaderPage";
import { db } from "@/config/Firebase.config";
import type { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandlers = () =>{
    const { isSignedIn} = useAuth();
    const {user} = useUser();
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        const storeUserData = async() =>{
            if(isSignedIn && user){
                setLoading(true);
                try {
                    const usersnap = await getDoc(doc(db,"users",user.id));
                    if(!usersnap.exists()){
                        const userData1 : User={
                            id : user.id,
                            name : user.fullName || user.firstName || "anonymous",
                            email : user.primaryEmailAddress?.emailAddress || "N/A",
                            imageUrl : user.imageUrl,
                            createdAt : serverTimestamp(),
                            updateAt : serverTimestamp(),
                        }
                        await setDoc(doc(db,"users",user.id),userData1)
                    }
                    
                    
                } catch (error) {
                    console.log("error on storing an userData :",error);
                }finally{
                    setLoading(false);
                }
            }
        };
        storeUserData();

    },[isSignedIn, user, pathName,navigate])

    if(loading){
        return <LoaderPage/>
    }
    return null;
}

export default AuthHandlers