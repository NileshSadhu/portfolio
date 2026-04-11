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

const Home = () => (
  <>
    <section id="home">
      <Hero />
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
  return (
    <BrowserRouter>
      <div className="bg-zinc-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
