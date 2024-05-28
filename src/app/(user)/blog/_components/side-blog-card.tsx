'use client';
import Box from '@mui/material/Box';
import { FlexBox } from 'components/common/box/flex-box';
import Image from 'next/image';
import { BlogList } from 'package/api/blog';
import { Text } from 'components/common/text/text';
import { formatDate } from 'package/util';

export const SideBlogCard = ({ params }: { params: BlogList }) => {
  return (
    <FlexBox>
      <Image
        src={params.thumbnail}
        alt=""
        width={60}
        height={60}
        style={{ borderRadius: 5, marginRight: 10, objectFit: 'cover', objectPosition: 'center' }}
      />
      <Box sx={{ height: 60 }}>
        <Text fontSize={16}>{params.title}</Text>
        <Text variant="subtitle2">
            {formatDate(params.createdAt, 'dd/MM/yyyy')}
          </Text>
      </Box>
    </FlexBox>
  );
};
