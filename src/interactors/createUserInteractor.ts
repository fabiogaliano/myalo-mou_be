import { CreateIUser } from '@/persistence/models/user.model';
import createUserPersistence from '@/persistence/createUserPersistence';

type ICreateUserPersistence = {
  createUserPersistence: typeof createUserPersistence;
};

export default async (
  {
    createUserPersistence /** sendRegistrationEmailPersistence: logic of what the email should say belongs here where business logic is applied */,
  }: ICreateUserPersistence,
  { email, password }: CreateIUser
) => await createUserPersistence({ email, password });
