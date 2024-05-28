'use client';
import Stack from '@mui/material/Stack';
import { FlexBox } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { Text } from 'components/common/text/text';
import Image from 'next/image';
import Link from 'next/link';
import { BlogList } from 'package/api/blog';
import { formatDate } from 'package/util';
import Avatar from 'ui-component/extended/Avatar';

export const BlogCard = ({ params }: { params: BlogList }) => {
  return (
    <StyledLink href={`/blog/${params.title.replace(/[^a-zA-Z0-9]/g, '')}-${params.id}`}>
      <FlexBox sx={{ cursor: 'pointer' }}>
        <Image
          src={params.thumbnail}
          alt=""
          width={300}
          height={156}
          style={{ borderRadius: 10, marginRight: 20, objectFit: 'cover', objectPosition: 'center' }}
        />
        <Stack spacing={1} height={'inherit'} sx={{ height: 156, width: 400 }}>
          <Text fontSize={20}>{params.title}</Text>
          <FlexBox>
            <Avatar src={params.profile.avatar} size="badge" />
            <Text variant="subtitle2" ml={1}>
              {params.profile.fullName}
            </Text>
            <Text variant="subtitle2" ml={4}>
              {formatDate(params.createdAt, 'dd/MM/yyyy')}
            </Text>
          </FlexBox>
          <Text>{params.shortDescription}</Text>
        </Stack>
      </FlexBox>
    </StyledLink>
  );
};
