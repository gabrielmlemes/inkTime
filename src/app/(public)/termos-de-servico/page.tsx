import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Serviço | Inkore',
};

const TermsOfServicePage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Termos de Serviço</h1>

        <div className="space-y-6 text-muted-foreground">
          <p>
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>

          <p>
            Por favor, leia estes Termos de Serviço (&quot;Termos&quot;) cuidadosamente antes de
            usar o serviço Inkore (&quot;serviço&quot;) operado por nós.
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar nosso serviço, você concorda em ficar vinculado por estes Termos.
              Se você não concordar com qualquer parte dos termos, então você não poderá acessar o
              serviço.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">2. Contas</h2>
            <p>
              Ao criar uma conta conosco, você deve nos fornecer informações que sejam precisas,
              completas e atuais em todos os momentos. A falha em fazer isso constitui uma violação
              dos Termos, o que pode resultar na rescisão imediata de sua conta em nosso serviço.
              Você é responsável por manter a segurança da sua conta vinculada (ex: Google) e por
              quaisquer atividades ou ações que ocorram sob ela.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">3. Propriedade Intelectual</h2>
            <p>
              O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão
              propriedade exclusiva da Inkore e seus licenciadores. O serviço é protegido por
              direitos autorais, marcas registradas e outras leis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">4. Assinaturas e Pagamentos</h2>
            <p>
              Algumas partes do serviço são cobradas com base em uma assinatura. Você será cobrado
              antecipadamente de forma recorrente e periódica (&quot;ciclo de faturamento&quot;). No
              final de cada ciclo de faturamento, sua assinatura será renovada automaticamente, a
              menos que você a cancele ou que a Inkore a cancele.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">5. Rescisão</h2>
            <p>
              Podemos rescindir ou suspender sua conta imediatamente, sem aviso prévio ou
              responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os
              Termos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              6. Limitação de Responsabilidade
            </h2>
            <p>
              Em nenhuma circunstância a Inkore, nem seus diretores, funcionários, parceiros,
              agentes, fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos,
              incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda
              de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes do seu
              acesso ou uso ou incapacidade de acessar ou usar o serviço.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">7. Alterações</h2>
            <p>
              Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes
              Termos a qualquer momento. O que constitui uma alteração material será determinado a
              nosso exclusivo critério.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">8. Contate-Nos</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco em:
              contato@inkore.com.br.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
