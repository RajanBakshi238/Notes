import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validate.Env';
import App from './app';
import PostController from './resources/post/post.controller';
import UserController from './resources/user/user.controller';

validateEnv();

const app = new App([new PostController(), new UserController() ], Number(process.env.port));

app.listen()