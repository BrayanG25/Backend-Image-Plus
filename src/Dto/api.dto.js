export const createDataApiDTO = (data) => {
    return {
        totalItems: data.total,
        totalPages: data.total_pages,
        results: data.results.map(item => ({
            id: item.id,
            slug: item.slug,
            altDescription: item.alt_description,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            dimensions: {
                width: item.width,
                height: item.height
            },
            urls: {
                raw: item.urls.raw,
                full: item.urls.full,
                regular: item.urls.regular,
                small: item.urls.small,
                thumb: item.urls.thumb,
            }
        })),
    };
};

export const createImageApiDTO = (data) => {
    return data.map(item => ({
        id: item.image.image_id,
        slug: item.image.slug,
        altDescription: item.image.description,
        createdAt: item.image.created_at,
        updatedAt: item.image.updated_at,
        dimensions: {
            width: item.image.width,
            height: item.image.height
        },
        urls: {
            raw: item.image.url_raw,
            small: item.image.url_small,
        }
    }))
};