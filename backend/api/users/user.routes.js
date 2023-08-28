import Router from 'koa-router';
import {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  editUser,
} from './user.controller.js';

const router = new Router({ prefix: '/users' });

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', editUser);

export default router;
