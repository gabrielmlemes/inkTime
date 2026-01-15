import Link from 'next/link';

export function SubscriptionLabel({ expired }: { expired: boolean }) {
  return (
    <div className="bg-destructive rounded-md px-4 py-2 my-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        {expired ? (
          <h3 className="font-semibold text-lg">
            Seu plano expirou ou você não possui um plano ativo
          </h3>
        ) : (
          <h3 className="font-semibold text-lg">Você excedeu o limite de serviços</h3>
        )}
        <p className="text-sm">Acesse os detalhes do seu plano</p>
      </div>

      <Link
        href="/dashboard/planos"
        className="w-fit px-1 py-1 hover:scale-105 font-semibold duration-200 transition-all underline-offset-2 underline"
      >
        Acessar plano
      </Link>
    </div>
  );
}
