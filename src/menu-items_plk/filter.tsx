// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types';

// assets
import {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
} from '@tabler/icons-react';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| MENU ITEMS - FILTER ||============================== //

const filter: NavItemType = {
  id: 'filter',
  title: <FormattedMessage id="Bộ lọc" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'all',
      title: <FormattedMessage id="Tất cả bài đăng" />,
      icon: icons.IconUserCheck,
      type: 'collapse',
      children: [
        {
          id: 'city',
          title: <FormattedMessage id="Tỉnh/Thành phố" />,
          type: 'collapse',
          children: [
            {
              id: 'city-filter-1',
              title: (
                <>
                  <FormattedMessage id="Nhiều việc" />
                </>
              ),
              type: 'item',
              url: '/apps/user/account-profile/profile1'
            },
            {
              id: 'city-filter-2',
              title: (
                <>
                  <FormattedMessage id="Phổ biến" />
                </>
              ),
              type: 'item',
              url: '/apps/user/account-profile/profile2'
            }
          ]
        },
        {
          id: 'people',
          title: <FormattedMessage id="Mọi người" />,
          type: 'collapse',
          children: [
            {
              id: 'people-filter-1',
              title: (
                <>
                  <FormattedMessage id="Tương tác" />
                </>
              ),
              type: 'collapse',
              children: [
                {
                  id: 'asc',
                  title: (<><FormattedMessage id="Tương tác từ cao đến thấp" /></>),
                  type: 'item',
                  url: "",
                },
                {
                  id: 'desc',
                  title: (
                    <>
                      <FormattedMessage id="Tương tác từ thấp đến cao" />
                    </>
                  ),
                  type: 'item',
                  url: '',
                },
              ]
            },
          ]
        },
        {
          id: 'cv-type',
          title: <FormattedMessage id="Kiểu CV" />,
          type: 'collapse',
          children: [
            {
              id: 'people-filter-1',
              title: (
                <>
                  <FormattedMessage id="Phổ biến" />
                </>
              ),
              type: 'collapse',
              children: [
                {
                  id: 'asc',
                  title: (<><FormattedMessage id="Được dùng nhiều nhất" /></>),
                  type: 'item',
                  url: "",
                },
                {
                  id: 'desc',
                  title: (
                    <>
                      <FormattedMessage id="Được dùng ít nhất" />
                    </>
                  ),
                  type: 'item',
                  url: '',
                },
              ]
            },
          ]
        },
        {
          id: 'time',
          title: <FormattedMessage id="Thời gian" />,
          type: 'collapse',
          children: [
            {
              id: "time-filter-1",
              title: <FormattedMessage id="Ngày/Tháng/Năm - Ngày/Tháng/Năm" />,
              type: 'item',
              url: '',
            },
            {
              id: 'time-filter-2',
              title: (
                <>
                  <FormattedMessage id="Thời gian đăng" />
                </>
              ),
              type: 'collapse',
              children: [
                {
                  id: 'asc',
                  title: (<><FormattedMessage id="Cũ nhất" /></>),
                  type: 'item',
                  url: "",
                },
                {
                  id: 'desc',
                  title: (
                    <>
                      <FormattedMessage id="Gần đây" />
                    </>
                  ),
                  type: 'item',
                  url: '',
                },
              ]
            },

          ]
        },
      ],
    },
    {
      id: 'job',
      title: <FormattedMessage id="Ngành nghề" />,
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: "job-name",
          title: <FormattedMessage id="Tên công việc" />,
          type: 'item',
          url: ""
        },
        {
          id: "salary",
          title: <FormattedMessage id="Mức lương" />,
          type: 'collapse',
          children: [
            {
              id: "desc",
              title: <FormattedMessage id="Lương từ cao đến thấp" />,
              type: 'item',
              url: ""
            },
            {
              id: "asc",
              title: <FormattedMessage id="Lương từ thấp đến cao" />,
              type: 'item',
              url: ""
            }
          ]
        },
        {
          id: "nominee",
          title: <FormattedMessage id="Vị trí" />,
          type: 'collapse',
          children: [
            {
              id: "intern",
              title: <FormattedMessage id="Thực tập IT" />,
              type: 'item',
              url: ""
            },
            {
              id: "staff",
              title: <FormattedMessage id="Nhân viên bán hàng" />,
              type: 'item',
              url: ""
            },
            {
              id: "engineer",
              title: <FormattedMessage id="Kỹ sư" />,
              type: 'item',
              url: ""
            }
          ]
        },
        {
          id: "exp",
          title: <FormattedMessage id="Kinh nghiệm" />,
          type: 'collapse',
          children: [
            {
              id: "non-year",
              title: <FormattedMessage id="Chưa có kinh nghiệm" />,
              type: 'item',
              url: ""
            },
            {
              id: "1-year",
              title: <FormattedMessage id="1 năm" />,
              type: 'item',
              url: ""
            },
            {
              id: "2-year",
              title: <FormattedMessage id="2 năm" />,
              type: 'item',
              url: ""
            }
          ]
        },
      ]
    },

    // {
    //   id: 'customer',
    //   title: <FormattedMessage id="customer" />,
    //   type: 'collapse',
    //   icon: icons.IconBasket,
    //   children: [
    //     {
    //       id: 'customer-list',
    //       title: <FormattedMessage id="customer-list" />,
    //       type: 'item',
    //       url: '/apps/customer/customer-list'
    //     },
    //     {
    //       id: 'order-list',
    //       title: <FormattedMessage id="order-list" />,
    //       type: 'item',
    //       url: '/apps/customer/order-list'
    //     },
    //     {
    //       id: 'create-invoice',
    //       title: <FormattedMessage id="create-invoice" />,
    //       type: 'item',
    //       url: '/apps/customer/create-invoice',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'order-details',
    //       title: <FormattedMessage id="order-details" />,
    //       type: 'item',
    //       url: '/apps/customer/order-details'
    //     },
    //     {
    //       id: 'product',
    //       title: <FormattedMessage id="product" />,
    //       type: 'item',
    //       url: '/apps/customer/product'
    //     },
    //     {
    //       id: 'product-review',
    //       title: <FormattedMessage id="product-review" />,
    //       type: 'item',
    //       url: '/apps/customer/product-review',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
  ]
};

export default filter;
