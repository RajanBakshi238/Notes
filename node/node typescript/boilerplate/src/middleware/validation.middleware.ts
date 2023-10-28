import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,    // it is for allowing the value which is not the part of schema will fail if pass false and extrafields come
            stripUnknown: true,     // this will remove the values which are not the part of schema
        };

        try{
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            )

            req.body = value;
            next()
        } catch(e: any) { // @fixme i.e any
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            })
            res.status(400).send({error: errors});
        }

    }
}

export default validationMiddleware
