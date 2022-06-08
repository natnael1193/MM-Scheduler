// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.0.0',
    items: [
      { title: 'One', path: '/dashboard/one', icon: ICONS.dashboard },
      { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
      { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: '/dashboard/user',
        icon: ICONS.user,
        children: [
          { title: 'Four', path: '/dashboard/user/four' },
          { title: 'Five', path: '/dashboard/user/five' },
          { title: 'Six', path: '/dashboard/user/six' },
        ],
      },
      {
        title: 'station',
        path: '/dashboard/station',
        icon: ICONS.user,
        children: [
          { title: 'Stations List', path: '/dashboard/station/list' },
          { title: 'Add Station', path: '/dashboard/station/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'price category',
        path: '/dashboard/price-category',
        icon: ICONS.user,
        children: [
          { title: 'Price Category List', path: '/dashboard/price-category/list' },
          { title: 'Add Price Category', path: '/dashboard/price-category/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'price classification',
        path: '/dashboard/price-classification',
        icon: ICONS.user,
        children: [
          { title: 'Price Classification List', path: '/dashboard/price-classification/list' },
          { title: 'Add Price Classification', path: '/dashboard/price-classification/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
    ],
  },
];

export default navConfig;
