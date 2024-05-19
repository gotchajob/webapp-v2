
export const getUniqueCategories = (blogPosts: any[]) => {
    const categorySet = new Set();
    blogPosts.forEach((post) => {
        post.categories.forEach((category: { name: unknown; }) => {
            categorySet.add(category.name);
        });
    });
    return Array.from(categorySet);
};