import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Inkore',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

        <div className="space-y-6 text-muted-foreground">
          <p>
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>

          <p>
            Bem-vindo à Inkore! Nnós Estamos comprometidos em proteger sua privacidade. Esta
            Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas
            informações quando você usa nosso software como serviço (SaaS).
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">1. Informações que Coletamos</h2>
            <p>Podemos coletar informações sobre você de várias maneiras, incluindo:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Informações Pessoais:</strong> Nome, endereço de e-mail, nome do estúdio,
                número de telefone e informações de pagamento que você nos fornece ao se registrar e
                usar nossos serviços.
              </li>
              <li>
                <strong>Dados de Agendamento:</strong> Informações sobre os agendamentos que você
                cria, incluindo nome do cliente, serviço, data e hora.
              </li>
              <li>
                <strong>Dados de Uso:</strong> Informações que seu navegador envia automaticamente
                sempre que você visita nosso site, como seu endereço IP, tipo de navegador, páginas
                visitadas e o tempo gasto nessas páginas.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              2. Como Usamos Suas Informações
            </h2>
            <p>Usamos as informações que coletamos para:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Fornecer, operar e manter nosso serviço.</li>
              <li>Processar suas transações e gerenciar sua assinatura.</li>
              <li>Melhorar, personalizar e expandir nosso serviço.</li>
              <li>Entender e analisar como você usa nosso serviço.</li>
              <li>
                Comunicar com você, seja diretamente ou através de um de nossos parceiros, inclusive
                para atendimento ao cliente, para fornecer atualizações e outras informações
                relacionadas ao serviço, e para fins de marketing e promocionais.
              </li>
              <li>Enviar e-mails transacionais (confirmação de agendamento, lembretes, etc.).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              3. Compartilhamento de Informações
            </h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar informações com terceiros
              que nos ajudam a operar nosso serviço, como:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Processadores de Pagamento (ex: Stripe):</strong> Para processar pagamentos
                de assinatura de forma segura.
              </li>
              <li>
                <strong>Provedores de Análise (ex: Google Analytics):</strong> Para nos ajudar a
                entender o uso do nosso serviço.
              </li>
              <li>
                <strong>Obrigações Legais:</strong> Se exigido por lei, podemos divulgar suas
                informações em resposta a solicitações legais de autoridades públicas.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">4. Segurança dos Dados</h2>
            <p>
              Empregamos medidas de segurança administrativas, técnicas e físicas para ajudar a
              proteger suas informações pessoais. No entanto, lembre-se de que nenhum método de
              transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              5. Seus Direitos de Proteção de Dados
            </h2>
            <p>
              Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas
              informações pessoais: o direito de acessar, corrigir, atualizar ou solicitar a
              exclusão de suas informações.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              6. Alterações a Esta Política
            </h2>
            <p>
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos
              você sobre quaisquer alterações publicando a nova Política de Privacidade nesta
              página.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">7. Contate-Nos</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato
              conosco em: contato@inkore.com.br.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
