import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import ThemeToggle from './components/ui/ThemeToggle';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import OpenSource from './components/sections/OpenSource';
import Experience from './components/sections/Experience';
import Certifications from './components/sections/Certifications';
import Achievements from './components/sections/Achievements';
import Projects from './components/sections/Projects';

import PhotoGallery from './components/sections/PhotoGallery';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        <Navbar />
        <ThemeToggle />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <OpenSource />
          <Experience />
          <Certifications />
          <Projects />
          <Achievements />
          <PhotoGallery />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
