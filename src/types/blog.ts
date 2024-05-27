// ==============================|| TYPES - BLOG ||============================== //

export type BlogCategory = {
  id: string;
  name: string;
};

export type BlogTag = {
  id: string;
  name: string;
};

export type BlogAuthor = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

export type BlogComment = {
  id: string;
  author: BlogAuthor;
  content: string;
  createdAt: string;
  replies?: BlogComment[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categories: BlogCategory[];
  tags: BlogTag[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  likes: number;
  comments: BlogComment[];
};

export type BlogPostData = {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
};


export type BlogPostProps = {
  error: object | string | null;
  posts: BlogPostData;
  post: BlogPost;
  onLike: (postId: string) => Promise<void>;
  onComment: (postId: string, comment: BlogComment) => Promise<void>;
  onReply: (postId: string, commentId: string, reply: BlogComment) => Promise<void>;
};

export type BlogHomeProps = {
  posts: BlogPostData;
  onPageChange: (page: number) => void;
};
