export const sampleData = {
  status: 'success',
  responseText: 'Data retrieved successfully',
  data: {
    id: 4,
    customerId: 22,
    caption: '',
    cvImage: 'https://res.cloudinary.com/dfwqbf3xr/image/upload/v1723309619/rvcbs834cadhqadvnmfj.png',
    categoryId: 0,
    category: 'coming soon!',
    status: 1,
    createdAt: '2024-09-13T07:43:18.000+00:00',
    rating: [{ rating: 5, count: 1 }],
    userInfo: {
      userId: 81,
      fullName: 'string string',
      email: 'user@gmail.com',
      avatar: null
    }
  }
};

export type PostDataType = typeof sampleData.data;

export const CommentData = {
  status: 'success',
  responseText: 'Comments retrieved successfully',
  data: {
    list: [
      {
        id: 2,
        cvShareId: 102,
        customerId: 22,
        rating: 5,
        useInfo: {
          fullName: 'Tran Minh H',
          email: 'tranminhh@example.com',
          avatar: 'https://example.com/avatars/avatar10.jpg'
        },
        comment: 'The design is clean and professional.'
      }
    ],
    totalPage: 1
  }
};

export type CommentType = (typeof CommentData.data.list)[0];
