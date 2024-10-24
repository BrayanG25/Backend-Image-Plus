// import fs from 'node:fs/promises';
import { sendStandardResponse } from '../Utils/responseBuilder.util.js';
import { createDataApiDTO, createImageApiDTO } from '../Dto/api.dto.js';
import { findImageById, createImage, findFavoriteByUserImage, createFavorite, updateLikeFavorite, findAllFavoriteByUser } from '../Service/image.service.js';
import { createUserDTO, createImageDTO } from '../Dto/image.dto.js';
import { fetchImagesByKeywords } from '../Api/images.js'

export const searchImagesByKeywords = async (req, res) => {
    const { page, perpage: perPage, search: searchQuery} = req.query;

    if(!page || !perPage || !searchQuery) return res.json({data: null});
    
    const response = await fetchImagesByKeywords(searchQuery, page, perPage);
    const jsonMapped = createDataApiDTO(response);

    // Leer el archivo 'data.json' y parsearlo a un objeto JavaScript
    // const data = await fs.readFile('./src/Controllers/data.json', 'utf8');
    // const jsonData = JSON.parse(data);
    // const jsonMapped = createDataApiDTO(jsonData);

    return res.json({ data: jsonMapped });
}

export const likeImage = async (req, res) => { 
    try {
        const { decoded } = req;        
        const { image } = req.body;

        const userObj = createUserDTO(decoded);
        const imageObj = createImageDTO(image);
    
        if(!userObj || !imageObj) return await sendStandardResponse(res, false, `The body request have invalid information`, 400, { data: null});

        let imageRecord = await findImageById(imageObj.imageId);
        if (!imageRecord) imageRecord = await createImage(imageObj);

        let favoriteRecord = await findFavoriteByUserImage({userId: userObj.userId, imageId: imageObj.imageId});
        if (!favoriteRecord) {
            favoriteRecord = await createFavorite({userId: userObj.userId, imageId: imageObj.imageId});
        } else if (!favoriteRecord.like) {
            favoriteRecord = await updateLikeFavorite({ favoriteId: favoriteRecord.id, like: true });
        }

        return await sendStandardResponse(res, true, `Like registered successfully`, 200, { data: { imageRecord, favoriteRecord } });

    } catch (error) {
        console.error(error);
        return await sendStandardResponse(res, false, `Internal Server Error`, 500, { data: null});
    }
};

export const unlikeImage = async (req, res) => { 
    try {
        const { decoded } = req;        
        const { image } = req.body;

        const userObj = createUserDTO(decoded);
        const imageObj = createImageDTO(image);
    
        if(!userObj || !imageObj) return await sendStandardResponse(res, false, `The body request have invalid information`, 400, { data: null});

        let favoriteRecord = await findFavoriteByUserImage({userId: userObj.userId, imageId: imageObj.imageId});
        if (favoriteRecord?.like) favoriteRecord = await updateLikeFavorite({ favoriteId: favoriteRecord.id, like: false });

        return await sendStandardResponse(res, true, `Unlike registered successfully`, 200, { data: { favoriteRecord }});

    } catch (error) {
        console.error(error);
        return await sendStandardResponse(res, false, `Internal Server Error`, 500, { data: null});
    }
};

export const getUserFavoriteImages = async (req, res) => { 
    try {
        const { decoded } = req;        

        const userObj = createUserDTO(decoded);
        if(!userObj) return await sendStandardResponse(res, false, `The body request have invalid information`, 400, { data: null });
        
        const favoriteRecords = await findAllFavoriteByUser({ userId: userObj.userId });        
        if(!favoriteRecords) return await sendStandardResponse(res, true, `Favorites images not found`, 200, { data: null });

        const imagesDTO = createImageApiDTO(favoriteRecords);        
        return await sendStandardResponse(res, true, `Favorites images found`, 200, { images: imagesDTO });

    } catch (error) {
        console.error(error);
        return await sendStandardResponse(res, false, `Internal Server Error`, 500, { data: null});
    }
};

export const likeImages = async (req, res) => { 
    try {
        const { decoded } = req;        
        const { images } = req.body;

        const userObj = createUserDTO(decoded);

        if (!userObj || !Array.isArray(images) || images.length === 0) {
            return await sendStandardResponse(res, false, `The body request has invalid information`, 400, { data: null });
        }

        const results = [];

        for (let image of images) {
            const imageObj = createImageDTO(image);

            if (!imageObj) {
                results.push({ error: `Invalid image data for ${image.imageId}` });
                continue;
            }

            let imageRecord = await findImageById(imageObj.imageId);
            if (!imageRecord) {
                imageRecord = await createImage(imageObj);
            }

            let favoriteRecord = await findFavoriteByUserImage({
                userId: userObj.userId,
                imageId: imageObj.imageId
            });

            if (!favoriteRecord) {
                favoriteRecord = await createFavorite({
                    userId: userObj.userId,
                    imageId: imageObj.imageId
                });
            } else if (!favoriteRecord.like) {
                favoriteRecord = await updateLikeFavorite({ 
                    favoriteId: favoriteRecord.id, 
                    like: true 
                });
            }

            results.push({ imageRecord, favoriteRecord });
        }

        return await sendStandardResponse(res, true, `Likes registered successfully`, 200, { data: results });

    } catch (error) {
        console.error(error);
        return await sendStandardResponse(res, false, `Internal Server Error`, 500, { data: null });
    }
};