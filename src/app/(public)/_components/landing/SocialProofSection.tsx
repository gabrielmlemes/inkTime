'use client'; // Ensure this is at the top if not already present

import { motion } from 'framer-motion'; // Import motion

export const SocialProofSection = () => {
  const logos = ['Blackwork Inc.', 'Golden Needle', 'Arte na Pele', 'Ink & Co.', 'New School Arts'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted">
            Aprovado pelos melhores estúdios
          </h2>
        </div>
        <motion.div
          className="mx-auto mt-12 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo}
              className="col-span-1 flex justify-center text-muted-foreground hover:text-foreground transition-colors"
              variants={itemVariants}
            >
              <p className="text-lg font-medium">{logo}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
