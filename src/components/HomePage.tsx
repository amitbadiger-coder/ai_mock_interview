import { Sparkles } from "lucide-react"
import Marquee from "react-fast-marquee"
import Container from "./Container"
import { Button } from "./ui/button"
import { MarkImage } from "./MarkImage"
import { Link } from "react-router-dom"



const HomePage = () => {
  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className="text-outline animate-floatGlow font-extrabold md:text-8xl">AI POWER</span>

            <span className="text-gray-500 font-extrabold">-A Better Way To</span><br/>
             improve your interview chances and skills
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Boost your interview skills and increase your success Rate  with AI Driven insights.
            Discover a smarter way to prepare , practice and stand out.
          </p>
        </div>
   <div className="flex justify-end mt-10">
  <div className="flex space-x-12 text-right">
    {/* Offers Received */}
    <div className="group transition transform hover:scale-105 hover:text-primary duration-300">
      <p className="text-3xl font-bold text-black dark:text-white">250k+</p>
      <span className="text-lg font-semibold text-gray-500 group-hover:text-primary">Offers Received</span>
    </div>

    {/* Interviews Aced */}
    <div className="group transition transform hover:scale-105 hover:text-primary duration-300">
      <p className="text-3xl font-bold text-black dark:text-white">1.2M+</p>
      <span className="text-lg font-semibold text-gray-500 group-hover:text-primary">Interviews Aced</span>
    </div>
  </div>
</div>

         {/* image section */}
    <div className="relative w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow overflow-hidden">
  {/* Image */}
  <img 
    src="/img/hero.jpg" 
    alt="hero_image" 
    className="w-full h-full object-cover rounded-xl" 
  />

  {/* Blurry white overlay with hover effect */}
  <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/30 backdrop-blur-md text-sm font-semibold text-black shadow transition duration-300 ease-in-out hover:backdrop-blur-lg hover:bg-white/50 hover:scale-105">
    Interview Copilot &copy;
  </div>
  <div className="absolute bottom-6 right-6 max-w-sm bg-white/30 backdrop-blur-md text-black dark:text-white rounded-xl p-4 shadow-lg transition duration-300 hover:bg-white/50 hover:backdrop-blur-lg hover:scale-105">
    <h2 className="text-2xl font-bold mb-2">Interview Copilot</h2>
    <p className="text-sm mb-4">
      Leverage AI to guide your interview journey. Get tailored feedback, smart questions, and confidence to land your dream job.
    </p>
    <Link to={"/generate"}>
    <Button className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition">
      Generate <Sparkles className="w-4 h-4" />
    </Button>
    </Link>
  </div>

</div>
      </Container>
      <div className="w-full my-12">
        <Marquee pauseOnHover>
          <MarkImage img="/img/logo/firebase.png"/>
          <MarkImage img="/img/logo/meet.png"/>
          <MarkImage img="/img/logo/microsoft.png"/>
          <MarkImage img="/img/logo/react.png"/>
          <MarkImage img="/img/logo/tailwindcss.png"/>
          <MarkImage img="/img/logo/zoom.png"/>
          </Marquee>

      </div>
     <Container className="py-12">
  {/* Hoverable Container */}
  <div className="transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-xl overflow-hidden group">
    {/* Heading */}
    <h2 className="tracking-wide text-xl text-gray-800 font-semibold text-center md:text-left mb-8 px-4">
      Prepare like a pro. Ace every question. Land your dream job faster with AI-driven insights.
    </h2>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center px-4 pb-6">
      {/* Image */}
      <div className="col-span-1 md:col-span-3">
        <img
          src="img/office.jpg"
          alt="office img"
          className="w-full max-h-96 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
      </div>

      {/* Text + Button */}
      <div className="col-span-1 md:col-span-2 flex flex-col justify-between h-full bg-white/70 backdrop-blur-md rounded-lg p-6 shadow-md transition group-hover:shadow-xl">
        <p className="text-center md:text-left text-gray-600 mb-6">
          Every great career starts with preparation. Start yours today with AI-guided mock interviews.
          <br /><br />
          Don’t just interview — impress. Get personalized feedback tailored just for you.
        </p>

        <Link to="/generate" className="flex justify-center md:justify-start">
          <Button className="w-3/4 flex items-center justify-center gap-2 transition hover:scale-105">
            Generate <Sparkles className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
</Container>


    </div>
  )
}

export default HomePage