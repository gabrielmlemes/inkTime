import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Planos',
  description: 'Gerencie seus planos.',
};

export default function Plans() {
  return <div>Plans Page</div>;
}

// adicionar suspense depois:

// return (
//   <Suspense
//     fallback={
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2Icon className="animate-spin h-10 w-10" />
//       </div>
//     }
//   >
//     <ComponentePlansAqui />;
//   </Suspense>
// );
