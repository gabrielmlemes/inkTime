'use client';

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
      'Sim. Você pode cancelar sua assinatura a qualquer momento através do painel de controle. Sem taxas ou burocracia. Você terá acesso aos recursos do seu plano até o final do período já pago.',
  },
  {
    question: 'Meus dados e dos meus clientes estão seguros?',
    answer:
      'Sim. A segurança é nossa prioridade. Usamos as melhores práticas de mercado e criptografia para garantir que todas as informações do seu estúdio e dos seus clientes estejam sempre seguras.',
  },
  {
    question: 'O que acontece após o período de teste gratuito?',
    answer:
      'Após os 7 dias, você poderá escolher um dos nossos planos (Basic ou Professional) para continuar utilizando a plataforma. Caso não queira assinar, sua conta ficará com funcionalidades limitadas.',
  },
];

export const FAQSection = () => {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Tirando suas dúvidas para você tomar a melhor decisão.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} className="rounded-lg border bg-background/50 px-6 py-4">
              <CollapsibleTrigger className="flex w-full items-center justify-between text-left">
                <span className="text-base font-semibold text-foreground">{faq.question}</span>
                <ChevronDown className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="pt-4 text-base text-muted-foreground">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};
