
import Container from "@/components/Container";

const testimonials = [
  {
    quote: "Aispire helped me get through 5 real interviews with confidence!",
    name: "Jane D.",
    role: "Software Engineer",
  },
  {
    quote: "The AI feedback is super insightful and helped me improve fast.",
    name: "Mark T.",
    role: "Product Manager",
  },
];

const AboutUsPage = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">
            Shaping the Future of Interview Preparation
          </h1>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Aispire is an AI-powered platform built to help job seekers gain
            confidence and land their dream roles.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Our Mission
          </h2>
          <p className="text-neutral-700 max-w-3xl">
            Our mission is to democratize high-quality interview preparation
            using smart AI tools — accessible to everyone, anywhere.
          </p>
        </section>

        {/* How it Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            How It Works
          </h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700 max-w-3xl">
            <li>AI-driven interview simulations (technical + behavioral)</li>
            <li>Real-time feedback and scoring</li>
            <li>Resume parsing and question adaptation</li>
            <li>Personalized learning insights tailored to you</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700 max-w-3xl">
            <li>Built with actual recruiter input</li>
            <li>Uses GPT-based natural language understanding</li>
            <li>Fast feedback in seconds</li>
            <li>Simulates real interview environments</li>
          </ul>
        </section>

        {/* Team */}
        <section className="mb-16">
  <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
    Meet the Team
  </h2>
  <div className="flex flex-wrap justify-center gap-10">
    <div className="max-w-xs text-center">
      <img src="/logo1.png" alt="Santosh Khot" className="mx-auto rounded-md w-32 h-32 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900">Suneel Shinde</h3>
      <p className="text-neutral-700">Head of Department</p>
    </div>
    <div className="max-w-xs text-center">
      <img src="/logo1.png" alt="Suneel Shinde" className="mx-auto rounded-md w-32 h-32 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900">Santosh Khot</h3>
      <p className="text-neutral-700">Proffessor And Guide</p>
    </div>
    <div className="max-w-xs text-center">
      <img src="/team/mine1.jpeg" alt="Amit Badiger" className="mx-auto rounded-md w-32 h-32 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900">Amit Badiger</h3>
      <p className="text-neutral-700">Creator</p>
    </div>
  </div>
</section>


        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700 max-w-3xl">
            <li>Accessibility</li>
            <li>Honesty in feedback</li>
            <li>Learning through iteration</li>
            <li>Inclusion and support for career growth</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
            What Our Users Say
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {testimonials.map(({ quote, name, role }, i) => (
              <blockquote
                key={i}
                className="bg-gray-100 p-6 rounded-md shadow-sm text-neutral-800"
              >
                <p className="mb-4 italic">“{quote}”</p>
                <footer className="font-semibold">
                  {name}, <span className="text-neutral-600">{role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <p className="text-lg text-neutral-700 mb-4">
            Ready to boost your interview skills?{" "}
            <a
              href="/generate"
              className="text-blue-600 font-semibold hover:underline"
            >
              Start your free AI mock interview now.
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
};

export default AboutUsPage;
