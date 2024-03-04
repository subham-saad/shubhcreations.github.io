import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
   <section className="relative w-full h-screen mx-auto">
     <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
           <div className="w-5 h-5 rounded-full bg-[#375c47]" />
           <div className="w-1 sm:h-80 h-40 green-gradient" />
      </div>
      
           <div>
            <div className="">
            <h1 className={`${styles.heroHeadText}  `}>Hi, I'm <span className="text-[#46db87]">Shubham</span></h1>
          
            </div>
            <p className={`${styles.heroSubText} mt-2 text-white`}>
              MERN stack developer <br className="sm:block hidden" /> UI/UX designer
            </p>
           </div>
        </div>
        <ComputersCanvas  className="sm:block hidden"/> 

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