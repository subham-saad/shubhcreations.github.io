import { Loader } from '@react-three/drei';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

const About = lazy(() => import('./components').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./components').then(module => ({ default: module.Contact })));
const Experience = lazy(() => import('./components').then(module => ({ default: module.Experience })));
const Hero = lazy(() => import('./components').then(module => ({ default: module.Hero })));
const Navbar = lazy(() => import('./components').then(module => ({ default: module.Navbar })));
const Tech = lazy(() => import('./components').then(module => ({ default: module.Tech })));
const Works = lazy(() => import('./components').then(module => ({ default: module.Works })));
const StarsCanvas = lazy(() => import('./components').then(module => ({ default: module.StarsCanvas })));
// const Feedbacks = lazy(() => import('./components').then(module => ({ default: module.Feedbacks })));

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Suspense fallback={<div><Loader /></div>}>
        <Helmet>
            <title>Shubham | Creations - Freelance Frontend & MERN Stack Developer</title>
            <meta name="description" content="Full Stack Developer Shubham-Creation" />
            <meta property="og:title" content="Shubham-Creation" />
            <meta property="og:description" content="MERN Stack Developer" />
            <meta property="og:url" content="https://shubhamcreation.netlify.app/" />
            <meta property="og:type" content="website" />
          </Helmet>
          <div className=' bg-black sm:bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          {/* <Feedbacks /> */}
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
