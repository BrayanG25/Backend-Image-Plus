import express from 'express';
import { getUserFavoriteImages } from '../Controllers/image.controller.js';
import { sendStandardResponse } from '../Utils/responseBuilder.util.js';
import { createUserDTO } from '../Dto/image.dto.js';
import { createImageApiDTO } from '../Dto/api.dto.js';
import { findAllFavoriteByUser } from '../Service/image.service.js';

const app = express();
app.use(express.json());
app.get('/favorite-images', getUserFavoriteImages);

import { jest } from '@jest/globals';

jest.mock('../Utils/responseBuilder.util.js');
jest.mock('../Dto/image.dto.js');
jest.mock('../Dto/api.dto.js');
jest.mock('../Service/image.service.js');

describe('getUserFavoriteImages', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            decoded: { userId: 1 }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    test('should return 400 if user DTO is invalid', async () => {
        createUserDTO.mockReturnValue(null);
        await getUserFavoriteImages(req, res);
        expect(sendStandardResponse).toHaveBeenCalledWith(res, false, 'The body request have invalid information', 400, { data: null });
    });

    test('should return 200 if no favorite records found', async () => {
        createUserDTO.mockReturnValue({ userId: 1 });
        findAllFavoriteByUser.mockResolvedValue(null);
        await getUserFavoriteImages(req, res);
        expect(sendStandardResponse).toHaveBeenCalledWith(res, true, 'Favorites images not found', 200, { data: null });
    });

    test('should return 200 with images DTO if favorites found', async () => {
        const favoriteRecords = [{ imageId: 1, userId: 1 }];
        createUserDTO.mockReturnValue({ userId: 1 });
        findAllFavoriteByUser.mockResolvedValue(favoriteRecords);
        createImageApiDTO.mockReturnValue([{ imageId: 1, url: 'http://example.com/image1.jpg' }]);
        await getUserFavoriteImages(req, res);
        expect(sendStandardResponse).toHaveBeenCalledWith(res, true, 'Favorites images found', 200, { images: [{ imageId: 1, url: 'http://example.com/image1.jpg' }] });
    });

    test('should return 500 if an error occurs', async () => {
        createUserDTO.mockReturnValue({ userId: 1 });
        findAllFavoriteByUser.mockImplementation(() => {
            throw new Error('Test error');
        });
        await getUserFavoriteImages(req, res);
        expect(sendStandardResponse).toHaveBeenCalledWith(res, false, 'Internal Server Error', 500, { data: null });
    });
});