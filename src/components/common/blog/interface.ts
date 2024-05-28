export interface PostData {
  id?: string;
  content: string;
  images: PostImage[];
  video?: string;
  likes: Likes;
  comments: number;
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
  parentId: string;
  profile: Profile;
  data?: CommentData;
}

export type CommentData = {
  name?: string;
  comment?: string;
  likes?: Likes;
  replies?: number;
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
      likes: {
        like: true,
        value: 102
      },
      comments: 3
    }
  }
];

export interface ReplyCommentType {
  id: string;
  parentId: string;
  profile: Profile;
  data: {
    comment: string;
    likes: Likes;
    replies: number;
  };
}

export const comments_post: CommentType[] = [
  {
    id: '#COMMENT_1',
    parentId: '#1POST_JONE_DOE',
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
      replies: 2
    }
  },
  {
    id: '#3COMMENT_JONE_DOE',
    parentId: '#1POST_JONE_DOE',
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
      },
      replies: 0
    }
  },
  {
    id: '#2COMMENT_JONE_DOE',
    parentId: '#1POST_JONE_DOE',
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
      replies: 1
    }
  }
];

export const replies_comment: CommentType[] = [
  {
    id: '#REPLY_1',
    parentId: '#COMMENT_1',
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
      replies: 1
    }
  },
  {
    id: '#REPLY_2',
    parentId: '#COMMENT_1',
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
      replies: 0
    }
  },
  {
    id: '#1REPLY_JONE_DOE',
    parentId: '#2COMMENT_JONE_DOE',
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
      },
      replies: 0
    }
  },
  {
    id: '#REPLY_#REPLY_1',
    parentId: '#REPLY_1',
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
      replies: 0
    }
  }
];

// export const replies_reply: CommentType[] = [
//   {
//     id: '#REPLY_#REPLY_1',
//     parentId: '#REPLY_1',
//     profile: {
//       id: '#52JONE_DOE',
//       avatar: 'avatar-1.png',
//       name: 'John Doe',
//       time: '15 min ago'
//     },
//     data: {
//       comment: 'Test Reply',
//       likes: {
//         like: true,
//         value: 1
//       },
//       replies: 0
//     }
//   }
// ];
