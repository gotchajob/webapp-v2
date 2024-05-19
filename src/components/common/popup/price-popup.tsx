"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ImageCard } from "../common/image-card";
import Stack from "@mui/material/Stack";
import { FlexBox, FlexCenter } from "../common/flex-box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Text } from "../common/text";
import { PRIMARYCOLOR } from "../config";
import Box from "@mui/material/Box";
import { Input } from "../common/input/input";
import { ContainedButton } from "../common/button";
import { ContainedCard } from "../common/card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { UserCurrentResponse } from "@/package/api/user/current";
import {
  CreateOrderServiceRequest,
  CreateOrderServiceResponse,
} from "@/package/api/order-service";
import { apiClientFetch } from "@/package/api/api-fetch";
import { enqueueSnackbar } from "notistack";
import { ContainedLoadingButton } from "../common/loading-button";

export interface Tab {
  title: string;
  component: ReactNode;
}

export interface PricePopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user?: UserCurrentResponse;
}
export const PricePopup = ({ isOpen, setIsOpen, user }: PricePopupProps) => {
  const [tabList, setTabList] = useState<Tab[]>([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderServiceProps, setOrderServiceProps] =
    useState<CreateOrderServiceRequest>({
      email: user?.data?.email ? user?.data.email : "",
      name: user?.data?.fullName ? user?.data.fullName : "",
      phone: "",
      paymentId: 1,
      serviceId: 1,
      total: 375000,
    });
  const [nextPageTitle, setNextPageTitle] = useState("");
  const tabListCard: Tab[] = [
    {
      title: "Điền thông tin cá nhân",
      component: (
        <TakeInformation
          initvalue={orderServiceProps}
          setNextPageTitle={setNextPageTitle}
          setOrderServiceProps={setOrderServiceProps}
        />
      ),
    },
    {
      title: "Chú thích",
      component: <ServiceInformation setNextPageTitle={setNextPageTitle} />,
    },
    {
      title: "Thanh toán",
      component: <ServicePayment setNextPageTitle={setNextPageTitle} />,
    },
    {
      title: "Quét mã QR",
      component: (
        <QRPayment
          orderServiceProps={orderServiceProps}
          setIsLoading={setIsLoading}
          setIsOpen={setIsOpen}
        />
      ),
    },
  ];
  useEffect(() => {
    setTabList([tabListCard[0]]);
  }, [isOpen]);
  // setOpenSuccess(true);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 7,
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent
          sx={{
            padding: 0,
            width: "100%",
            overflow: "hidden",
            height: "580px",
          }}
        >
          <Grid container height={"100%"}>
            <Grid
              item
              xs={12}
              sm={7}
              sx={{
                py: {
                  xs: 7,
                  sm: 7,
                },
                px: {
                  xs: 3,
                  sm: "48px !important",
                },
              }}
              position={"relative"}
            >
              <Stack spacing={3} mb={2}>
                <FlexBox>
                  <ArrowBackIcon
                    fontSize={"small"}
                    sx={{
                      color: "#6DB3DC",
                    }}
                    onClick={() => {
                      if (tabList.length === 1) {
                        setIsOpen(false);
                      } else {
                        setTabList(tabList.slice(0, tabList.length - 1));
                      }
                    }}
                  />
                  <Text color={"#b7b8b9"} fontSize={12} ml={2}>
                    Mock Interview/
                    {tabList.slice(0, tabList.length - 1).map((tab) => (
                      <span key={tab.title}>{tab.title}/</span>
                    ))}
                    <span style={{ color: "#49a0d3" }}>
                      {tabList.at(tabList.length - 1)?.title}
                    </span>
                  </Text>
                </FlexBox>
                <Box>
                  <Text fontSize={12}>
                    Bạn đang trong quá trình thanh toán dịch vụ
                  </Text>
                  <Text fontSize={45} fontWeight={"700"} color={PRIMARYCOLOR}>
                    Mock Interview
                  </Text>
                </Box>
              </Stack>
              <Box
                sx={{
                  height: 300,
                  pl: 1,
                  overflowY: "scroll",
                }}
              >
                {tabList.at(tabList.length - 1)?.component}
              </Box>

              {tabList.length < 4 ? (
                <FlexCenter
                  position={"absolute"}
                  bottom={64}
                  width={"100%"}
                  right={0}
                >
                  <ContainedButton
                    disabled={nextPageTitle.length === 0}
                    onClick={() => {
                      if (nextPageTitle.length > 0) {
                        setTabList([
                          ...tabList,
                          tabListCard[
                            tabListCard.findIndex(
                              (value) => value.title === nextPageTitle
                            )
                          ],
                        ]);
                        setNextPageTitle("");
                      }
                    }}
                  >
                    Tiếp tục
                  </ContainedButton>
                </FlexCenter>
              ) : (
                <FlexCenter
                  position={"absolute"}
                  bottom={70}
                  width={"100%"}
                  right={0}
                >
                  <ContainedLoadingButton
                    loading={isLoading}
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSuccess(true);
                    }}
                  >
                    Kiểm tra thanh toán
                  </ContainedLoadingButton>
                </FlexCenter>
              )}
            </Grid>
            <Grid
              item
              xs={0}
              sm={5}
              sx={{
                display: {
                  xs: "none",
                  sm: "block !important",
                },
              }}
            >
              <ImageCard height={"100%"} src="/assets/images/illu-2.png" />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <PriceSuccessPopup isOpen={openSuccess} setIsOpen={setOpenSuccess} />
    </>
  );
};

export const PriceSuccessPopup = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 7,
        },
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogContent
        sx={{ padding: 0, width: "100%", overflow: "hidden", height: "580px" }}
      >
        <Grid container height={"100%"}>
          <Grid item xs={7} py={8} px={15} position={"relative"}>
            <FlexCenter height={"100%"}>
              <Stack spacing={2}>
                <Box>
                  <Text fontSize={14} textAlign={"center"}>
                    Bạn đã hoàn thành quá trình thanh toán dịch vụ
                  </Text>
                  <Text
                    textAlign={"center"}
                    fontSize={45}
                    fontWeight={"700"}
                    color={PRIMARYCOLOR}
                  >
                    Mock Interview
                  </Text>
                </Box>
                <Text fontSize={14} textAlign={"center"}>
                  Vui lòng kiểm tra mail đã liên kết với tài khoản Gotcha Job để
                  nhận mail xác nhận thông tin sớm nhất.
                </Text>
                <Text fontSize={14} textAlign={"center"}>
                  Nếu hơn 1 ngày chưa nhận được mail, vui lòng liên hệ với chúng
                  tôi qua tin nhắn hoặc hotline để được hỗ trợ.
                </Text>
              </Stack>
            </FlexCenter>
          </Grid>

          <Grid item xs={5}>
            <ImageCard height={"100%"} src="/assets/images/illu-2.png" />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
const TakeInformation = ({
  setNextPageTitle,
  setOrderServiceProps,
  initvalue,
}: {
  initvalue: CreateOrderServiceRequest;
  setNextPageTitle: Dispatch<SetStateAction<string>>;
  setOrderServiceProps: Dispatch<SetStateAction<CreateOrderServiceRequest>>;
}) => {
  const [name, setName] = useState(initvalue.name);
  const [phone, setPhone] = useState(initvalue.phone);
  const [email, setEmail] = useState(initvalue.email);
  useEffect(() => {
    if (name.length > 0 && phone.length > 0 && email.length > 0) {
      setOrderServiceProps({ ...initvalue, email, name, phone });
      setNextPageTitle("Chú thích");
    } else {
      setNextPageTitle("");
    }
  }, [name, phone, email]);
  return (
    <Box>
      <Text fontSize={12} color={PRIMARYCOLOR} mb={1} fontWeight={"700"}>
        Vui lòng điền đầy đủ thông tin dưới đây
      </Text>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Input
            value={name}
            placeholder="Họ và tên"
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            style={{
              width: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Input
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const ServiceInformation = ({
  setNextPageTitle,
}: {
  setNextPageTitle: Dispatch<SetStateAction<string>>;
}) => {
  useEffect(() => {
    setNextPageTitle("Thanh toán");
  }, []);
  return (
    <>
      <Box mb={2}>
        <Text fontSize={12} color={PRIMARYCOLOR} mb={1} fontWeight={700}>
          Bạn được
        </Text>
        <ContainedCard>
          <Text fontSize={12.5} fontWeight={"200"} color={"#04273B"}>
            1 buổi phỏng vấn trong 1 tiếng.
          </Text>
          <Text fontSize={12.5} fontWeight={"200"} color={"#04273B"}>
            30 phút cho Q&A và nhận feedback của bên tuyển dụng.
          </Text>
        </ContainedCard>
      </Box>
      <Box>
        <Text fontSize={12} color={PRIMARYCOLOR} mb={1} fontWeight={700}>
          Sau khi thanh toán
        </Text>
        <ContainedCard>
          <Text fontSize={12.5} fontWeight={"200"} color={"#04273B"}>
            Chúng tôi sẽ gửi mail xác nhận hoàn tất thanh toán và mail xác nhận
            lịch hẹn kèm những bước cần làm tiếp theo, bạn vui lòng kiểm tra
            mail đã liên kết với tài khoản Gotcha Job.
          </Text>
          <Text fontSize={12.5} fontWeight={"200"} color={"#04273B"} mt={1}>
            Nếu hơn 1 ngày chưa nhận được mail, vui lòng liên hệ với chúng tôi
            để được hỗ trợ.
          </Text>
        </ContainedCard>
      </Box>
    </>
  );
};
const ServicePayment = ({
  setNextPageTitle,
}: {
  setNextPageTitle: Dispatch<SetStateAction<string>>;
}) => {
  const paymentList = [
    {
      name: "Quét mã QR",
      value: "Quét mã QR",
    },
  ];
  return (
    <Box>
      <Text fontSize={12} fontWeight={700} color={PRIMARYCOLOR} mb={1}>
        Chọn phương thức thanh toán
      </Text>
      <RadioGroup
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e) => {
          setNextPageTitle(e.target.value);
        }}
      >
        <Stack spacing={2} width={250}>
          {paymentList.map((payment) => (
            <FlexBox
              key={payment.value}
              borderRadius={2}
              sx={{
                boxShadow: "0px 0px 20px rgba(8.40, 78, 117.60, 0.20)",
                alignItems: "center",
              }}
            >
              <Radio
                value={payment.value}
                size="small"
                sx={{
                  color: "#0E82C4",
                  m: 1.5,
                }}
              />
              <Text color={"#0E82C4"} fontSize={14}>
                {payment.name}
              </Text>
            </FlexBox>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

const QRPayment = ({
  setIsLoading,
  setIsOpen,
  orderServiceProps,
}: {
  setIsLoading: (data: boolean) => void;
  setIsOpen: (data: boolean) => void;
  orderServiceProps: CreateOrderServiceRequest;
}) => {
  const [code, setCode] = useState<string | null>(null);
  const confirmOrderService = async () => {
    try {
      setIsLoading(true);
      const data: CreateOrderServiceResponse = await apiClientFetch(
        "/api/order-service",
        orderServiceProps
      );
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      console.log(data)
      setCode(data.data.code);
      setIsLoading(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    } finally {
    }
  };
  useEffect(() => {
    confirmOrderService();
  }, []);
  return (
    <FlexCenter>
      {code ? (
        <>
          <FlexCenter
            padding={1}
            mb={1}
            width={"fit-content"}
            borderRadius={2}
            border={"2px solid #0E82C4"}
          >
            <ImageCard src="/assets/images/QRPay.png" width={150} />
          </FlexCenter>
          <Text textAlign={"center"} fontSize={14}>
            Võ Thị Như Ngọc
          </Text>
          <Text textAlign={"center"} fontSize={14}>
            5904205128102
          </Text>
          <Text textAlign={"center"} fontSize={14}>
            Ngân hàng Agribank
          </Text>
          <Text textAlign={"center"} fontSize={14}>
            Nội dung chuyển khoản: {code}
          </Text>
        </>
      ) : (
        <></>
      )}
    </FlexCenter>
  );
};
