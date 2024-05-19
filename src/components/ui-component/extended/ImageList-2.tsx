
import Image from 'next/image';

// material-ui
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MImageList from '@mui/material/ImageList';

// project imports
import useConfig from 'hooks/useConfig';

// types
import { PostImage } from 'types/user-profile';
import { ImageCard } from 'components/common/image/image-card';

// ==============================|| IMAGE LIST/GRID ||============================== //

interface ImageListProps {
  itemData: PostImage[];
}

const ImageList = ({ itemData }: ImageListProps) => {
  const { borderRadius } = useConfig();

  return (
    <MImageList
      sx={{
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflowY: 'visible',
        mb: 0
      }}
      gap={8}
    >
      {itemData.map((item, index) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={index} cols={cols} rows={rows} sx={{ overflow: 'hidden', borderRadius: `${borderRadius}px` }}>
            <Box sx={{ height: "100%", maxWidth: "100%" }}>
              <img src={`/assets/images/profile/${item.img}`} style={{ height: '100%', width: "100%", objectFit: 'cover' }}></img>
            </Box>
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
              }}
              title={item.title}
              position="top"
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </MImageList>
  );
};

export default ImageList;
