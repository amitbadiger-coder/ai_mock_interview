import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/Firebase.config";
import { useUser } from "@clerk/clerk-react"; // Using Clerk Auth
import { toast } from "sonner";

const ContactPage = () => {
  const { user, isSignedIn } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setFormData((prev) => ({
        ...prev,
        email: user?.primaryEmailAddress?.emailAddress ?? " ",
      }));
    }
  }, [isSignedIn, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toastMessage =  { title: "send..!", description: "Message Send Successfully..." }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
        userId: isSignedIn ? user?.id : null,
      });

      
      toast(toastMessage.title, { description: toastMessage.description });
      setFormData({ name: "", email: isSignedIn ? formData.email : "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error..",{
        description:"Something went wrong please. Please try Again later..."
      })
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">Contact Us</h1>
        <p className="text-neutral-600 mb-8">
          Have questions, feedback, or need support? Fill out the form below and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-900 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isSignedIn} // Make it readonly for logged-in users
              className="mt-1 block w-full border border-gray-900 bg-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-900 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ContactPage;
