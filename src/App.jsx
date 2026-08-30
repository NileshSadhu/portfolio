import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BlogPost } from "./components/BlogPost";
import { IntroLoader } from "./components/IntroLoader";

import { NotFound } from "./pages/NotFound";
import { Experience } from "./components/Experience";

const Home = () => (
  <>
    <section id="home">
      <Hero />
    </section>
    <section id="experience">
      <Experience />
    </section>
    <section id="skills">
      <Skills />
    </section>
    <section id="projects">
      <Projects />
    </section>
    <section id="blog">
      <Blog />
    </section>
    <section id="contact">
      <Contact />
    </section>
    <Footer />
  </>
);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      <div className="min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
