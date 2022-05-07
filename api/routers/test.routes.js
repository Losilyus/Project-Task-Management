import { TestGet } from '../controllers/test';
import { Auth } from '../middlewares';

export default [
  {
    method: 'POST',
    url: '/api/test',
    preHandler: Auth,
    handler: TestGet,
  },
];
