import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
   <section className="relative w-full h-screen mx-auto">
     <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10 pointer-events-none`}>
        <div className="flex flex-col justify-center items-center mt-5">
           {/* <div className="w-5 h-5 rounded-full bg-[#375c47]" /> */}
           <div className="w-1 sm:h-80 h-40 green-gradient" />
      </div>
      
            <div className="pointer-events-auto">
             <div className="">
             <h1 className={`${styles.heroHeadText}  `}>Hi, I'm <span className="text-[#46db87]">Shubham</span></h1>
             <h2 className="text-white font-black lg:text-[40px] md:text-[30px] sm:text-[24px] xs:text-[20px] text-[20px]">Building Scalable <span className="text-[#46db87]">SaaS & AI Solutions</span></h2>
             </div>
             <p className={`${styles.heroSubText} mt-4 text-white max-w-[600px]`}>
               I help founders and businesses build high-performance automation, <br className="sm:block hidden" /> custom dashboards, and SaaS platforms that drive real business growth.
             </p>
             <div className="mt-8 flex flex-wrap gap-5">
                <a href="#contact" className="bg-[#46db87] py-3 px-8 rounded-xl outline-none w-fit text-primary font-bold shadow-md shadow-primary hover:bg-[#34a865] transition-all text-center sm:w-auto w-full">
                  Start Your Project
                </a>
                <a href="#work" className="border border-[#46db87] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold hover:bg-[#46db87]/10 transition-all text-center sm:w-auto w-full">
                  View Case Studies
                </a>
             </div>
            </div>
        </div>
        <ComputersCanvas  className=""/> 

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center
            items-start p-2 ">
           <motion.div 
             animate={{
              y: [0,24,0]
             }}
             transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
             }}

             className="w-3 h-3 rounded-full bg-secondary mb-1"
           />
        </div>

   </section>
  )
}

export default Hero