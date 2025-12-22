import { Calendar, UserRoundCheck } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import getServerSession from '@/lib/get-server-session';

import { Appointments } from './_components/appointments/appointments';
import { CopyLinkButton } from './_components/copy-link-button';
import { Reminders } from './_components/reminder/reminders';

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <main>
      <div className="flex justify-end gap-4 mt-4">
        <Link target="_blank" href={`/estudio/${session.user.id!}`}>
          <Button>
            <Calendar size="5" />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <CopyLinkButton userId={session.user.id} />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Appointments userId={session.user.id} />

        <Reminders userId={session.user.id} />
      </section>
    </main>
  );
};

export default Dashboard;
