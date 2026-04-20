import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Estimator = () => {
  const [type, setType] = useState("saas");
  const [features, setFeatures] = useState([]);

  const featureOptions = {
    saas: ["User Auth", "Payment Integration", "Subscription Management", "Admin Dashboard", "API Access"],
    automation: ["Workflow Design", "Third-party Integrations", "Data Scraping", "Email/SMS Bot", "Periodic Tasks"],
    ai: ["OpenAI Integration", "Custom LLM Training", "Vector Database", "Image Generation", "Chatbot UI"],
  };

  const toggleFeature = (feature) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  const calculateEstimate = () => {
    let base = type === "saas" ? 2000 : type === "ai" ? 3000 : 1500;
    return base + features.length * 500;
  };

  return (
    <div className='mt-12 bg-black-100 rounded-[20px] p-8 border border-white/10'>
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>Plan Your Project</p>
        <h2 className={styles.sectionHeadText}>Quick Project Estimator.</h2>
        <p className="mt-4 text-secondary max-w-3xl mx-auto">Select your project type and key features to get a rough estimate of the scope and cost. (For demonstration purposes only)</p>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-white font-bold ml-1 text-sm sm:text-base">Project Category</label>
            <div className="flex flex-wrap gap-3">
              {Object.keys(featureOptions).map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setType(opt); setFeatures([]); }}
                  className={`py-2 px-6 rounded-lg font-bold transition-all text-sm sm:text-base flex-1 min-w-[120px] ${type === opt ? "bg-[#46db87] text-primary" : "bg-tertiary text-white"}`}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-bold ml-1">Key Features</label>
            <div className="flex flex-wrap gap-2">
              {featureOptions[type].map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`py-1 px-4 rounded-full text-sm transition-all border ${features.includes(f) ? "bg-[#46db87]/20 border-[#46db87] text-[#46db87]" : "border-white/10 text-secondary hover:border-white/30"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-tertiary p-6 sm:p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-card border border-white/5">
          <h3 className="text-white font-bold text-[18px] sm:text-[20px]">Initial Estimate Range</h3>
          <div className="mt-4 text-[30px] sm:text-[40px] font-black text-[#46db87]">
            ${calculateEstimate()} - ${calculateEstimate() + 1500}
          </div>
          <p className="mt-2 text-secondary text-xs sm:text-sm italic">Final quote depends on specific requirements</p>
          <a href="#contact" className="mt-8 bg-[#46db87] py-3 px-8 rounded-xl text-primary font-bold shadow-md shadow-primary hover:bg-[#34a865] transition-all w-full sm:w-auto">
            Lock In This Rate
          </a>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Estimator, "estimator");
