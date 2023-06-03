import createUserInteractor from '@/interactors/createUserInteractor';
import { Router } from 'express';
import createUserPersistence from '@/persistence/createUserPersistence';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  // Create User
  route.post('/', async (req, res) => {
    const { email, password } = <CreateUserBody>req.body;

    const newUser = await createUserInteractor(
      { createUserPersistence },
      { email, password }
    );

    res.json(newUser);
  });

  // Get User
  route.get('/users/:userId', (req, res) => {
    // Handle user retrieval logic
  });

  // Update User
  route.put('/users/:userId', (req, res) => {
    // Handle user update logic
  });

  // Delete User
  route.delete('/users/:userId', (req, res) => {
    // Handle user deletion logic
  });
};

interface CreateUserBody {
  email: string;
  password: string;
}
