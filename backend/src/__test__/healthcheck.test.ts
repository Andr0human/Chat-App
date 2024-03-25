import request, { Response } from 'supertest';
import express from 'express';
import Server from '../Server';
import { serverConfig } from '../config';

describe('API Integration Tests', () => {
    let server: Server;
    let app: express.Application;

    beforeAll(async () => {
        // server = Server.getInstance(serverConfig);
        server = new Server(serverConfig);
        app = server.getApp();
    });

    test('GET /health', async () => {
        const response: Response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Health OK!',
            data: {},
        });
    });

    test('GET /not-found', async () => {
        const response: Response = await request(app).get('/not-found');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: '404 not found!',
            error: {},
        });
    });
});
