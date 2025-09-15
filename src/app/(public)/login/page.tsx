'use client';

import { handleLogin } from '@/app/(private)/_actions/login';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  // const session = null; // adicionar lógica da sessão aqui

  async function handleSignIn() {
    await handleLogin('github');
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Acesso ao Stúdio</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <Button
            onClick={handleSignIn}
            className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
