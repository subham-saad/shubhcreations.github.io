import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { whyMe } from "../constants";

const WhyMeCard = ({ index, title, description }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className='bg-black-100 p-10 rounded-3xl xs:w-[320px] w-full border border-white/10'
  >
    <div className='mt-1'>
      <h3 className='text-white font-black text-[24px]'>{title}</h3>
      <p className='mt-4 text-secondary text-[16px] leading-[24px]'>{description}</p>
    </div>
  </motion.div>
);

const WhyMe = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px] max-w-7xl mx-auto`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[200px] sm:min-h-[250px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Trust & Reliability</p>
          <h2 className={styles.sectionHeadText}>Why Choose Me.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.padding} flex flex-wrap gap-7 justify-center`}>
        {whyMe.map((item, index) => (
          <WhyMeCard key={item.title} index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(WhyMe, "");
