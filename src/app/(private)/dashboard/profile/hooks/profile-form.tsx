import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProfileFormData, profileSchema } from '../schemas/profile-schema';

const useProfileForm = () => {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      status: false,
      times: [],
      timezone: '',
    },
  });
};

export default useProfileForm;
