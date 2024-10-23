export const transformData = async (data) => {
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
}