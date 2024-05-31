'use client';

import { ReactNode, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import { useGetCategories } from 'hooks/use-get-category';
import { Text } from 'components/common/text/text';
import { PRIMARYCOLOR } from 'components/common/config';
import Iconify from 'components/iconify/iconify';
import { FlexBox } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {

  const { categories } = useGetCategories({});

  useEffect(() => { }, [])

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <MainCard boxShadow hover>
        <FlexBox flexDirection={'row'} alignItems={'end'} mb={3} borderBottom={`2px solid ${PRIMARYCOLOR}`}>
          <Box pb={0.5} mr={1}>
            <Iconify icon={'heroicons:home-20-solid'} width={25} color={PRIMARYCOLOR} />
          </Box>
          {categories.map((category, index) => (
            <StyledLink key={index} href={`/blog/${category?.name.replace(/[^a-zA-Z0-9]/g, '')}-${category.id}`}>
              <Text
                minWidth={160}
                textAlign={'center'}
                fontSize={16}
                fontWeight={'600'}
                id={category.id}
                sx={{
                  p: 1,
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  ':hover': {
                    bgcolor: '#f1f8fc'
                  },
                  ...(category.id == 1 ? {
                    bgcolor: '#f1f8fc'
                  } : {
                    bgcolor: ''
                  })
                }}
              >
                {category.name}
              </Text>
            </StyledLink>
          ))}
        </FlexBox>
        {children}
      </MainCard>
    </Container>
  );
}
