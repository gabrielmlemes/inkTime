import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProfileFormData, profileSchema } from '../_schemas/profile-schema';

interface UserProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
}

export default function useProfileForm({ name, address, phone, status }: UserProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      name: name || '',
      address: address || '',
      phone: phone || '',
      status: status || false,
    },
  });
  return form;
}
