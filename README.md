# Inkore - Gestão de Agendamentos para Estúdios de Tatuagem


![Versão](https://img.shields.io/github/package-json/v/gabrielmlemes/inkore-saas)

**Inkore** é uma plataforma SaaS robusta e intuitiva, projetada para revolucionar a gestão de agendamentos em estúdios de tatuagem, otimizando operações e aprimorando a experiência do cliente.


![Prévia da Aplicação](public/landingExample.jpg)

---

## 🚀 Sobre o Projeto

Este projeto oferece uma solução completa para que estúdios de tatuagem possam gerenciar suas agendas, serviços, horários e perfis de forma digital. A plataforma permite que clientes finais visualizem a disponibilidade e agendem sessões de forma autônoma através de uma página pública com URL amigável (slug).

O objetivo é reduzir a carga administrativa dos artistas, permitindo que se concentrem em sua arte, enquanto proporcionam uma experiência de agendamento moderna e eficiente para seus clientes.

### ✨ Funcionalidades Principais

-   **Gestão de Agenda:** Calendário completo para visualizar e gerenciar todos os agendamentos.
-   **Configuração de Serviços:** Cadastro de serviços com preços, durações e descrições personalizadas.
-   **Horários de Funcionamento:** Definição de horários de trabalho e pausas (almoço, etc.).
-   **Página de Agendamento Pública:** Cada estúdio possui uma página com URL única e amigável (`/estudio/nome-do-estudio`) para que os clientes possam agendar.
-   **Autenticação Social:** Login seguro para os donos de estúdio via contas Google.
-   **Gestão de Assinaturas:** Integração com a Stripe para gerenciar planos e pagamentos.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto de tecnologias modernas e escaláveis:

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Autenticação:** [NextAuth.js (Auth.js)](https://authjs.dev/)
-   **Pagamentos:** [Stripe](https://stripe.com/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI:** Componentes customizados inspirados no Shadcn/ui, utilizando Radix UI e Tailwind CSS
-   **Validação de Formulários:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

---

## ⚙️ Começando: Configuração Local

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 20.x ou superior)
-   [npm](https://www.npmjs.com/) ou um gerenciador de pacotes compatível

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repo.git
    cd seu-repo
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    -   Renomeie o arquivo `.env.sample` para `.env.local`.
    -   Preencha todas as variáveis de ambiente necessárias. Elas incluem:
        ```env
        # Banco de Dados (PostgreSQL)
        DATABASE_URL="..."

        # Autenticação (NextAuth.js)
        AUTH_SECRET="..."
        AUTH_GOOGLE_ID="..."
        AUTH_GOOGLE_SECRET="..."
        
        # Pagamentos (Stripe)
        STRIPE_API_KEY="..."
        STRIPE_WEBHOOK_SECRET_KEY="..."
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY="..."
        ```

4.  **Aplique as Migrações do Banco de Dados:**
    Este comando irá garantir que o schema do seu banco de dados esteja em sincronia com o Prisma.
    ```bash
    npx prisma migrate dev
    ```

5.  **Rode o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação funcionando.

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👤 Contato

Desenvolvido por **Gabriel Lemes**.

-   **Website:** [gabrielmlemes.vercel.app](https://gabrielmlemes.vercel.app/)


Sinta-se à vontade para entrar em contato!