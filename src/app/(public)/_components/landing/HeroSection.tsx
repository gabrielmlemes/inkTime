'use client'; // Ensure this is at the top

import { motion } from 'framer-motion'; // Import motion
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import DashboardImage from '@/assets/hero/dashboardExample.jpg';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <motion.section
      className="relative bg-background w-full pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="container z-10 mx-auto px-4">
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-medium text-foreground mb-6"
        >
          Menos burocracia, mais tempo para sua arte.
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-10"
        >
          A plataforma completa para estúdios de tatuagem. Gerencie sua agenda, clientes e horários
          em um só lugar, de forma simples e profissional.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Link href="/login">
              Comece seu teste gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Visual Mockup Placeholder */}
        <motion.div variants={imageVariants} className="relative mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="aspect-auto w-full bg-secondary/30 rounded-xl border border-border/50 shadow-lg shadow-gray-800 flex items-center justify-center">
            <Image
              alt="Imagem de exemplo do dashboard do Inkore"
              src={DashboardImage}
              className="w-full h-full object-contain rounded-xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
