import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.intialiseRoutes();
    }

    private intialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    public create = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try{
            const {title, body} = req.body;
            const post = await this.PostService.create(title,body);
            res.status(201).json({post});

        } catch(error){
            next(new HttpException(400, 'Cannot create post'));
            // next(new HttpException(400, error.message));
        }
    }

    public delete = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try{
            
            // const post = await 
        } catch (error){
            next(new HttpException(400, 'can\'t update post'))
        }
    }



}

export default PostController