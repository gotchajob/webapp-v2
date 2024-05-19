export interface PostData {
  id?: string;
  content: string;
  images: PostImage[];
  video?: string;
  likes: Likes;
  comments?: CommentType[];
}

export interface PostImage {
  img: string;
  featured?: boolean;
  title?: string;
}

export interface Profile {
  id: string;
  avatar: string;
  name: string;
  time: string;
}

export interface Likes {
  like: boolean;
  value: number;
}

export interface CommentType {
  id: string;
  profile: Profile;
  data?: CommentData;
}

export type CommentData = {
  name?: string;
  comment?: string;
  likes?: Likes;
  replies?: CommentType[];
};

export type PostDataType = { id: string; data: PostData; profile: Profile };

export const data: PostDataType[] = [
  {
    id: '#1POST_JONE_DOE',
    profile: {
      id: '#52JONE_DOE',
      avatar: 'avatar-1.png',
      name: 'John Doe',
      time: '15 min ago'
    },
    data: {
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. There are many variations of passages.',
      images: [
        {
          img: 'img-profile1.png',
          featured: true
        }
      ],
      // images: [],
      // video: '4QDEWNg5hAM?si=Sij9Xn27Q0nSZiRL',
      likes: {
        like: true,
        value: 102
      },
      comments: [
        {
          id: '#COMMENT_1',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'avatar-1.png',
            name: 'John Doe',
            time: '15 min ago'
          },
          data: {
            comment: 'Test',
            likes: {
              like: true,
              value: 1
            },
            replies: [
              {
                id: '#REPLY_1',
                profile: {
                  id: '#52JONE_DOE',
                  avatar: 'avatar-1.png',
                  name: 'John Doe',
                  time: '15 min ago'
                },
                data: {
                  comment: 'Test Reply',
                  likes: {
                    like: true,
                    value: 1
                  },
                  replies: [
                    {
                      id: '#REPLY_#REPLY_1',
                      profile: {
                        id: '#52JONE_DOE',
                        avatar: 'avatar-1.png',
                        name: 'John Doe',
                        time: '15 min ago'
                      },
                      data: {
                        comment: 'Test Reply',
                        likes: {
                          like: true,
                          value: 1
                        },
                        replies: []
                      }
                    }
                  ]
                }
              },
              {
                id: '#REPLY_1',
                profile: {
                  id: '#52JONE_DOE',
                  avatar: 'avatar-1.png',
                  name: 'JWT User',
                  time: '15 min ago'
                },
                data: {
                  comment: 'Demo',
                  likes: {
                    like: false,
                    value: 0
                  },
                  replies: []
                }
              }
            ]
          }
        },
        {
          id: '#3COMMENT_JONE_DOE',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'avatar-3.png',
            name: 'Barney Thea',
            time: '8 min ago '
          },
          data: {
            comment: 'It is a long established fact that a reader will be distracted by the readable content of a page.',
            likes: {
              like: true,
              value: 55
            }
          }
        },
        {
          id: '#2COMMENT_JONE_DOE',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'avatar-4.png',
            name: 'Maddison Wilber',
            time: '5 min ago '
          },
          data: {
            comment:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.There are many variations of passages.',
            likes: {
              like: true,
              value: 69
            },
            replies: [
              {
                id: '#1REPLY_JONE_DOE',
                profile: {
                  id: '#52JONE_DOE',
                  avatar: 'avatar-5.png',
                  name: 'John Doe',
                  time: 'just now '
                },
                data: {
                  comment: 'It is a long established fact that a reader will be distracted by the readable content.',
                  likes: {
                    like: true,
                    value: 10
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }
];
