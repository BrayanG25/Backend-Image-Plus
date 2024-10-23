export const createImageDTO = (image) => {
    const {
        id: imageId,
        slug,
        altDescription: description,
        dimensions: { width, height } = {},
        urls: { raw: url_raw, small: url_small } = {},
    } = image;

    if (!imageId || !slug || !description || !width || !height || !url_raw || !url_small) {
        throw new Error('All attributes must be provided: imageId, slug, description, width, height, url_raw, url_small.');
    }

    return { imageId, slug, description, width, height, url_raw, url_small };
};

export const createUserDTO = (user) => {
    const { user_id: userId } = user;
    
    if (!userId) {
        throw new Error('Invalid user data: userId is missing');
    }

    return { userId };
}