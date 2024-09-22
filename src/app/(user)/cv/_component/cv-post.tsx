import { apiServerFetch } from 'package/api/api-fetch';
import PostComment from '../../../../components/common/post';
import { C } from '@fullcalendar/core/internal-common';


export const CVPost = async ({ postData }: any) => {
  const res1 = await apiServerFetch('/cv-comment?cvShareId=' + postData.id, 'GET');
  return <PostComment post={postData} showTotalFeedback={false} showAddFeedback={true} listComment={res1.data.list} />;
};
