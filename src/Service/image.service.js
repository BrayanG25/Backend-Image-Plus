import { Image } from '../Database/Models/image.model.js';
import { Favorite } from '../Database/Models/favorite.model.js';

export const findImageById = async (id) => {
    try {
        const image = await Image.findOne({ where: { image_id: id } });
        return image ? image.dataValues : null;
        
    } catch (error) {
        throw new Error('Error fetching image from the database');
    }
};

export const createImage = async ({ imageId, slug, description, width, height, url_raw, url_small }) => {
    try {
        const newImage = await Image.create({
            image_id: imageId,
            slug: slug,
            description: description,
            width: width,
            height: height,
            url_raw: url_raw,
            url_small: url_small,
            created_at: new Date(),
        });
        return newImage;
        
    } catch (error) {
        throw new Error('Error creating a new image in the database');
    }
};

export const findFavoriteByUserImage = async ({ userId, imageId }) => {
    try {
        const favorite = await Favorite.findOne({ where: { fk_user_id: userId, fk_image_id: imageId }});
        return favorite ? favorite.dataValues : null;
        
    } catch (error) {
        throw new Error('Error fetching favorite from the database');
    }
};

export const findAllFavoriteByUser = async ({ userId }) => {
    try {
        const favorites = await Favorite.findAll({ 
            where: {
                fk_user_id: userId,
                like: true
            },
            include: [
                {
                    model: Image,
                    as: 'image',
                    attributes: ['image_id', 'slug', 'description', 'url_raw', 'url_small','width', 'height', 'created_at', 'updated_at']
                }
            ]
        });
        return favorites.length > 0 ? favorites : [];
        
    } catch (error) {
        throw new Error('Error fetching favorite from the database');
    }
};

export const createFavorite = async ({ userId, imageId }) => {
    try {
        const newFavorite = await Favorite.create({
            fk_user_id: userId,
            fk_image_id: imageId,
            like: true,
            created_at: new Date(),
        });
        return newFavorite;
        
    } catch (error) {
        throw new Error('Error creating a new image in the database');
    }
};

export const updateLikeFavorite = async ({ favoriteId, like }) => {
    try {
        const [updatedRowsCount] = await Favorite.update(
            { like: like },
            { where: { id: favoriteId } }
        );

        if (updatedRowsCount === 0) {
            throw new Error('Failed to update the favorite.');
        }

        return { message: 'Favorite successfully updated', updatedRowsCount };
        
    } catch (error) {
        throw new Error('Error updating a favorite in the database: ' + error.message);
    }
};