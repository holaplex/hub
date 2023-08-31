import { SettingsFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import {
  Control,
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { uploadFile } from '../modules/upload';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { GetUser } from './../queries/user.graphql';
import { useSession } from './useSession';
import { useProfileUpdateFlow, ProfileUpdateFlowContext } from './useProfileUpdateFlow';

interface ProfileUpdateForm {
  name: { first: string; last: string };
  file?: string | File | undefined;
}

interface ProfileUpdateContext {
  submit: (values: ProfileUpdateForm) => Promise<void>;
  register: UseFormRegister<ProfileUpdateForm>;
  handleSubmit: UseFormHandleSubmit<ProfileUpdateForm>;
  formState: FormState<ProfileUpdateForm>;
  setValue: UseFormSetValue<ProfileUpdateForm>;
  control: Control<ProfileUpdateForm, any>;
  reset: UseFormReset<ProfileUpdateForm>;
  flowContext: ProfileUpdateFlowContext;
}

export function useProfileUpdate(): ProfileUpdateContext {
  const flowContext = useProfileUpdateFlow();
  const router = useRouter();
  const { ory } = useOry();
  const client = useApolloClient();
  const { session } = useSession();

  const flow = flowContext.flow;
  const { register, handleSubmit, formState, setError, setValue, control, reset } =
    useForm<ProfileUpdateForm>();

  const onSubmit = async ({ name, file }: ProfileUpdateForm): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      let profileImageUrl = file;

      if (file instanceof File) {
        const { url } = await uploadFile(file);
        profileImageUrl = url;
      }

      await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: {
          traits: {
            email: session?.identity.traits.email,
            name,
            profile_image: profileImageUrl,
          },
          csrf_token: csrfToken,
          method: 'profile',
        },
      });

      client.cache.updateQuery(
        {
          query: GetUser,
          variables: { user: session?.identity.id },
        },
        (data) => {
          return {
            user: {
              ...data.user,
              firstName: name.first,
              lastName: name.last,
              profileImageUrl,
            },
          };
        }
      );

      toast.success('Profile updated successfully');

      router.push(`/projects`);
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const nameErr = extractFlowNode('name')(nodes).messages[0]?.text;
      const profileImageErr = extractFlowNode('profile_image')(nodes).messages[0]?.text;

      if (nameErr) {
        setError('name', { message: nameErr });
      } else if (profileImageErr) {
        setError('file', { message: profileImageErr });
      }
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
    setValue,
    control,
    reset,
    flowContext
  };
}
