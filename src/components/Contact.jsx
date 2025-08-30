import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";



const resumeUrl = '/ShubhamSaadResume.pdf (2).pdf'

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  
const handleDownload = () => {
 
  window.open(resumeUrl, '_blank');
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "shubham-creations",
          from_email: form.email,
          to_email: "shubhamsaad777@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
       
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hiddenW`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.55] bg-black-100 p-5 rounded-2xl'
      >
  
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <button className='bg-tertiary py-3 px-3 my-3 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bottom-10' onClick={handleDownload}>Download Resume</button>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </form>
        <h3 className={`${styles.sectionSubText} text-center my-6`}>Or Connect with me on</h3>
        <div className="flex flex-row justify-center gap-6">
          <a href="https://x.com/subham_creaton?t=CUpGXXkofDnJX8SG8HxeaQ&s=08" target="_blank"><FaXTwitter className="text-white hover:text-[#1DA1F2] text-3xl cursor-pointer"/></a>
          <a href="https://github.com/subham-saad" target="_blank"><FaGithub className="text-white hover:text-[#4078c0] text-3xl cursor-pointer"/></a>
          <a href="https://www.linkedin.com/in/shubham-sad-6a2078214/" target="_blank"><FaLinkedinIn className="text-white hover:text-[#0A66C2] text-3xl cursor-pointer"/></a>
        </div>

      </motion.div>
   
      
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
    
        <EarthCanvas />
        
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");