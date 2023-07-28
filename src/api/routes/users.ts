import createUserInteractor from '@/interactors/createUserInteractor';
import { Router } from 'express';
import createUserPersistence from '@/persistence/createUserPersistence';
import userModel from '@/persistence/models/user.model';

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

  // Get Users
  route.get('/', async (req, res) => {
    // Handle user retrieval logic
    let users;
    try {
      users = (await userModel.find()).map((model) => model.toJSON());
    } catch (error) {
      console.log(error)
    }
    res.json(users)
  });

  // Get User
  route.get('/users/:userId', async (req, res) => {
    const { id } = <GetUserBody>req.body;

    let user;
    try {
      user = await userModel.findById(id)
      if (!user) {
        res.statusCode = 404
        res.send()
      }
      res.json(user?.toJSON())
    } catch (error) {
      console.log(error)
    } 

    res.send('working')
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

interface GetUserBody {
  id: string;
}
