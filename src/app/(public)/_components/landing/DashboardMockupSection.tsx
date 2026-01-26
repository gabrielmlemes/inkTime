'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DashboardMockupSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Controle total, onde você estiver
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Não fique mais preso ao balcão. Nossa plataforma te acompanha em qualquer dispositivo,
            garantindo que você tenha o comando do seu negócio na palma da sua mão, a qualquer
            momento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-12 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-center"
        >
          <div className="flex-1">
            <Image
              src="/MacBookMockup.png"
              alt="Dashboard do Inktime em um MacBook"
              width={800}
              height={492}
              quality={100}
              className="z-10 w-full"
            />
          </div>
          <div className="flex-1">
            <Image
              src="/iPhoneMockup.png"
              alt="Dashboard do Inktime em um iPhone"
              width={350}
              height={709}
              quality={100}
              className="z-20 mx-auto w-auto max-w-[300px] rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
