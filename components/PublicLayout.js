import React from 'react';
import PublicNav from './PublicNav';
import PublicFooter from './PublicFooter';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw",
    // scale: 0.8
  },
  in: {
    opacity: 1,
    // x: 0,
    // scale: 1
  },
  out: {
    opacity: 0,
    // x: "100vw",
    // scale: 1.2
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const PublicLayout = ({ children, title, description, seo = {} }) => {
  const router = useRouter();
  const baseUrl = 'https://kolayxport.com';
  const canonicalUrl = `${baseUrl}${router.asPath.split('?')[0]}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        {...seo}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <PublicNav />
        <motion.main 
          className="flex-grow"
          key={typeof window !== 'undefined' ? window.location.pathname : 'staticPath'} // Ensure key changes on route change for transition
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.main>
        <PublicFooter />
      </div>
    </>
  );
};

export default PublicLayout; 