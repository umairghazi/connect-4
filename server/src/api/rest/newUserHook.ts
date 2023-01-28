import { Request, Response } from 'express';
import { UserController } from '../../controllers';

const userController = new UserController();

export async function newUserHook(req: Request, res: Response) {
  // const { userId, email } = req?.body || {};
  // const response = await userController.createUser({ userId, email });
  // res.json(response);
}
