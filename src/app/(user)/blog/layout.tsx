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
import { useGetSearchParams, useSearchParamsNavigation } from 'hooks/use-get-params';

export default function Layout({ children }: { children: ReactNode }) {

  const { categories } = useGetCategories({});

  useEffect(() => { }, [])

  const { push } = useSearchParamsNavigation();

  const handleChangeCategory = (categoryId: number, categoryName: string) => {
    push([{
      name: "category", value: `${categoryName.replace(/[^a-zA-Z0-9]/g, '')}-${categoryId}`
    }])
  }

  const { category: paramsCategory } = useGetSearchParams(["category"]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <MainCard boxShadow hover>
        <FlexBox flexDirection={'row'} alignItems={'end'} mb={3} borderBottom={`2px solid ${PRIMARYCOLOR}`}>
          <Box pb={0.5} mr={1}>
            <Iconify icon={'heroicons:home-20-solid'} width={25} color={PRIMARYCOLOR} />
          </Box>
          {categories.map((category, index) => (
            <Text
              key={index}
              minWidth={160}
              textAlign={'center'}
              fontSize={16}
              fontWeight={'600'}
              sx={{
                p: 1,
                cursor: 'pointer',
                transition: 'all 200ms ease',
                ':hover': {
                  bgcolor: '#f1f8fc'
                },
                ...(category.id == paramsCategory.split("-")[1] ? {
                  bgcolor: '#f1f8fc'
                } : {
                  bgcolor: ''
                })
              }}
              onClick={() => { handleChangeCategory(category.id, category.name) }}
            >
              {category.name}
            </Text>
          ))}
        </FlexBox>
        {children}
      </MainCard>
    </Container >
  );
}
