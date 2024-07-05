import React from 'react';
import { useState ,useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../Style';
import Earth from './canvas/Earth';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import emailjs from '@emailjs/browser';

import EarthCanvas from './canvas/Earth';
const Contact = () => {
  const formRef=useRef();
  const [form,setForm]=useState({
    name:' ',
    email:' ',
    message:' ',
  });
  const [load, setload] = useState(false);
  const handelChange=(e)=>{
    const {name,value}=e.target;
    setForm({...form,[name]:value});
  }
  const handelSumbit=(e)=>{
    e.preventDefault();
    setload(true);
    emailjs.send(
        "service_n6zbha4",
        "template_ahol33o",
      {
        from_name: form.name,
        to_name: "Yosef",
        from_email: form.email,
        to_email: "yoosefelbooz@gmail.com",
        message: form.message,
      }, 
         "Es3UPA2i09dR9pwKL"
    )
    .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");

        setForm({
          name: "",
          email: "",
          message: "",
          
        });
    }), (error) => {
      setLoading(false);
      console.error(error);

      alert("Ahh, something went wrong. Please try again.");
    }
  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse
     flex gap-10 overflow-hidden'>
        <motion.div
        variants={slideIn('left','tween',0.2,1)}
        className=' flexr rounded-2xl bg-black-100 p-8'
        >
          <p className={styles.sectionSubText}> Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <form 
          ref={formRef}
          onSubmit={handelSumbit}
          className=' mt-12 flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className=' text-white font-medium mb-4'>Your Name</span>
              <input
              type="text"
              name="name"
              value={form.name}
              placeholder="What's your name?"
              onChange={handelChange}
              className=' bg-tertiary py-4 px-6
               placeholder:text-secondary text-white
               rounded-lg outlined-none border-none font-medium'/>
            </label>
            <label className='flex flex-col'>
              <span className=' text-white font-medium mb-4'>Your Email</span>
              <input type="email" 
              name='email'
              value={form.email}
              placeholder="What's your email?"
              onChange={handelChange}
              className=' bg-tertiary py-4 px-6
               placeholder:text-secondary text-white
               rounded-lg outlined-none border-none font-medium'/>
            </label>
            <label className='flex flex-col'>
              <span className=' text-white font-medium mb-4'>Your Message</span>
              <textarea 
              rows="7"
              name='message'
              value={form.message}
              onChange={handelChange}
              placeholder="What do you want to say?"
              className=' bg-tertiary py-4 px-6
               placeholder:text-secondary text-white
               rounded-lg outlined-none border-none font-medium'/>
            </label>
              <button type='submit'
              className=' bg-tertiary py-3 px-8
              text-white 
              outline-none w-fitt font-bold shadow-md shadow-primary rounded-xl'
              onClick={handelSumbit}
              >
              {load?'Sending...':'send'}
              </button>
          </form>
        </motion.div>
        <motion.div
        variants={slideIn('right','tween',0.2,1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <EarthCanvas />

        </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact")