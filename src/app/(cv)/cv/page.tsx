'use client';

import { useState } from 'react';

import Container from '@mui/material/Container';

import { data, PostDataType, CommentType } from '../../../components/common/post/interface';

import PostComment from "../../../components/common/post"

import Grid from '@mui/material/Grid';

import { gridSpacing } from 'store/constant - vh';

export default function Page() {
    const [posts, setPosts] = useState<PostDataType>(data[0]);

    const postCommentAdd = async (postId: string, comment: CommentType) => { }

    const commentAdd = async (id: string, comment: CommentType, reply: CommentType) => { };

    const handlePostLikes = async (postId: string) => { };

    const handleCommentLikes = async (postId: string, comment: CommentType) => { };

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={5} lg={5}>
                <PostComment
                    commentAdd={commentAdd}
                    postCommentAdd={postCommentAdd}
                    handleCommentLikes={handleCommentLikes}
                    handlePostLikes={handlePostLikes}
                    post={posts}
                />
            </Grid>
        </Grid>
    );
}