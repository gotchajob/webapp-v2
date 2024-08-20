"Use client";

import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { FlexCenter } from "components/common/box/flex-box";
import { Text } from "components/common/text/text";
import {
  CVTemplate
} from "components/cv-component/interface";
import * as React from "react";
import { ComponentTab } from "./component-tab";
import { SuggestTab } from "./suggest-tab";
import ShareIcon from '@mui/icons-material/Share';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { PostCVShare } from "package/api/cv-share";
import { enqueueSnackbar } from "notistack";
import { CustomerToken } from "hooks/use-login";
import useSnackbarDialog from "components/common/snackbar-dialog/snackbar-dialog";
import Image from "next/image";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabs = [
  { icon: <InfoIcon />, title: "Hướng dẫn" },
  // { icon: <InfoIcon />, title: "Cấu hình" },
  { icon: <EditIcon />, title: "Chỉnh sửa", },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const TabsTable = ({
  params,
  cv,
  onChangeCV,
  currentImage
}: {
  currentImage: string;
  cv: CVTemplate;
  params: { id: string };
  onChangeCV: (cv: CVTemplate) => void;
}) => {

  const { customerToken } = CustomerToken();

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState<boolean>(false);

  const [caption, setCaption] = React.useState<string>('');

  const handleTabChange = (tabIndex: number) => {
    setValue(tabIndex);
  };

  const handleShare = async () => {
    try {
      const response = await PostCVShare({ cvId: +params.id, caption }, customerToken);
      if (response.status === 'success') {
        showSnackbarDialog('Chia sẻ CV thành công', 'success');
      } else {
        showSnackbarDialog('Có lỗi xảy ra khi chia sẻ CV', 'error');
      }
    } catch (error: any) {
      console.error('Error sharing CV:', error);
      showSnackbarDialog('Lỗi hệ thống khi chia sẻ CV', 'error');
    } finally {
      setOpen(false);
      setCaption('')
    }
  };

  React.useEffect(() => {
    console.log("cv:", cv);
  }, [cv])

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <TabPanel value={value} index={0}>
          <SuggestTab cv={cv} onChangeCV={onChangeCV} />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <ConfigTab cv={cv} onChangeCV={onChangeCV} />
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <ComponentTab cv={cv} onChangeCV={onChangeCV} />
        </TabPanel>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={2}>
          {tabs.map((content, index) => (
            <Button
              sx={{ textTransform: "none" }}
              key={index}
              variant={value === index ? "contained" : "outlined"}
              onClick={() => handleTabChange(index)}
            >
              <FlexCenter>
                {content.icon}
                <Text fontSize={10} mt={1}>
                  {content.title}
                </Text>
              </FlexCenter>
            </Button>
          ))}
          <Button sx={{ textTransform: "none" }} variant={"outlined"} onClick={() => setOpen(true)}>
            <FlexCenter>
              <ShareIcon />
              <Text fontSize={10} mt={1}>
                Chia sẻ CV
              </Text>
            </FlexCenter>
          </Button>
        </Stack>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", pb: 1 }}>
          Xác nhận chia sẻ CV
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="column" spacing={2}>
            <TextField
              placeholder="Nội dung..."
              variant="standard"
              onChange={(e) => setCaption(e.target.value)}
              fullWidth
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputBase-root": {
                  fontSize: "14px",
                },
              }}
            />
            <Box>
              <Image
                src={currentImage}
                alt={"cv-image"}
                width={595}
                height={842}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              mr: 1,
            }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleShare}
            color="primary"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#1877F2",
              color: "#fff",
            }}
          >
            Chia sẻ
          </Button>
        </DialogActions>
      </Dialog>

      < SnackbarDialog />
    </Grid>
  );
};

export default TabsTable;
