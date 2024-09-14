export const sampleData = {
  status: 'success',
  responseText: 'Data retrieved successfully',
  data: {
    id: 10,
    caption: 'A day at the amusement park',
    cvImage: 'https://example.com/images/amusement_park.jpg',
    categoryId: 7,
    category: 'Leisure',
    createdAt: '2024-08-25T06:48:38.291Z',
    rating: [
      {
        rating: 4.5,
        count: 250
      }
    ],
    userInfo: {
      fullName: 'Tran Minh H',
      email: 'tranminhh@example.com',
      avatar: 'https://example.com/avatars/avatar10.jpg'
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
