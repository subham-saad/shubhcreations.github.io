import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,

}) => {
  const formatDescription = (desc) => {
    return desc.split(/(PROBLEM:|SOLUTION:|RESULT:)/).map((part, i) => {
      if (part === "PROBLEM:" || part === "SOLUTION:" || part === "RESULT:") {
        return <span key={i} className="text-[#46db87] font-bold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 shadow-2xl'
      >
        <div className='relative  w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl opacity-80 hover:opacity-100 transition-opacity'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-white/10'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-relaxed'>{formatDescription(description)}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-medium px-2 py-1 rounded-md bg-white/5 ${tag.color}`}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Case Studies</p>
        <h2 className={`${styles.sectionHeadText}`}>High-Impact Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Selected projects that demonstrate my ability to solve complex business
          challenges through scalable architecture, AI integration, and 
          conversion-focused design. Each case study highlights the specific 
          problem addressed and the measurable results achieved.
        </motion.p>
      </div>
 
      <div className='mt-20 flex flex-wrap gap-7 slider'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
  
    </>
  );
};

export default SectionWrapper(Works, "");