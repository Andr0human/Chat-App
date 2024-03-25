import { type Response } from 'express';
import HttpStatusCode from './StatusCodes';

class SystemResponse {
    private readonly res: Response;

    private readonly message: string;

    private readonly data: any;

    constructor(res: Response, message: string, data: any) {
        this.res = res;
        this.message = message;
        this.data = data;
    }

    ok = (): Response => {
        return this.res.status(HttpStatusCode.Ok).json({
            status: true,
            message: this.message,
            data: this.data,
        });
    };

    created = (): Response => {
        return this.res.status(HttpStatusCode.Created).json({
            status: true,
            message: this.message,
            data: this.data,
        });
    };

    badRequest = (): Response => {
        return this.res.status(HttpStatusCode.BadRequest).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    unauthorized = (): Response => {
        return this.res.status(HttpStatusCode.Unauthorized).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    forbidden = (): Response => {
        return this.res.status(HttpStatusCode.Forbidden).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    notFound = (): Response => {
        return this.res.status(HttpStatusCode.NotFound).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    conflict = (): Response => {
        return this.res.status(HttpStatusCode.Confict).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    tooManyRequests = (): Response => {
        return this.res.status(HttpStatusCode.TooManyRequests).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };

    internalServerError = (): Response => {
        return this.res.status(HttpStatusCode.InternalServerError).send({
            status: false,
            message: this.message,
            error: this.data,
        });
    };
}

export default SystemResponse;
