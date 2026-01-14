'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const faqs = [
  {
    question: 'Preciso de um cartão de crédito para iniciar o teste gratuito?',
    answer:
      'Não. Você pode se cadastrar e usar a plataforma gratuitamente por 7 dias sem compromisso e sem precisar fornecer dados de pagamento.',
  },
  {
    question: 'Como funciona a página de agendamento do meu estúdio?',
    answer:
      'Ao se cadastrar, você cria automaticamente o seu link exclusivo (ex: inkore.com.br/seu-estudio). Seus clientes usarão esse link para ver seus horários disponíveis e agendar uma sessão de forma totalmente online.',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer:
      'Sim. Você pode cancelar sua assinatura quando quiser através do painel de controle. Sem taxas ou burocracia. Você terá acesso aos recursos do seu plano até o final do período já pago.',
  },
  {
    question: 'Meus dados e dos meus clientes estão seguros?',
    answer:
      'Sim. A segurança é nossa prioridade. Usamos as melhores práticas de mercado e criptografia para garantir que todas as informações do seu estúdio e dos seus clientes estejam sempre seguras.',
  },
];

export const FAQSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Respostas rápidas para suas dúvidas mais importantes.
          </p>
        </div>
        <motion.div
          className="mt-16 space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Collapsible className="rounded-lg border border-border bg-secondary/20 px-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-left py-4">
                  <span className="text-base font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="pb-4 text-base text-muted-foreground/80">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
