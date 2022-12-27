// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MovieIcon from '@mui/icons-material/Movie';
import DomainIcon from '@mui/icons-material/Domain';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
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
      { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
      // { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
      // { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Organization',
    items: [
      // {
      //   title: 'user',
      //   path: '/dashboard/user',
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: '/dashboard/user/four' },
      //     { title: 'Five', path: '/dashboard/user/five' },
      //     { title: 'Six', path: '/dashboard/user/six' },
      //   ],
      // },
      {
        title: 'organization',
        path: '/dashboard/organization',
        icon: <DomainIcon />,
        children: [
          { title: 'Organizations List', path: '/dashboard/organization/list' },
          { title: 'Add Organization', path: '/dashboard/organization/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'organizationType',
        path: '/dashboard/organizationType',
        icon: <DomainAddIcon />,
        children: [
          { title: 'Organization Types List', path: '/dashboard/organization-type/list' },
          { title: 'Add OrganizationType', path: '/dashboard/organization-type/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'station',
        path: '/dashboard/station',
        icon: <LiveTvIcon />,
        children: [
          { title: 'Stations List', path: '/dashboard/station/list' },
          { title: 'Add Station', path: '/dashboard/station/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'program',
        path: '/dashboard/program',
        icon: <MovieIcon />,
        children: [
          { title: 'Programs List', path: '/dashboard/program/list' },
          { title: 'Add program', path: '/dashboard/program/add' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'schedule',
        path: '/dashboard/schedule',
        icon: <ScheduleIcon />,
        children: [
          // { title: 'schedules List', path: '/dashboard/schedule/list' },
          { title: 'Schedule Timeline', path: '/dashboard/schedule/timeline' },
          { title: 'Add schedule', path: '/dashboard/schedule/add' },
          { title: 'Add Single schedule', path: '/dashboard/schedule/add-single' },
        ],
      },
    ],
  },
  {
    subheader: 'Prices',
    items: [
      {
        title: 'price category',
        path: '/dashboard/price-category',
        icon: <AttachMoneyIcon />,
        children: [
          { title: 'Price Category List', path: '/dashboard/price-category/list' },
          // { title: 'Add Price Category', path: '/dashboard/price-category/add' },
          { title: 'Add Price Category', path: '/dashboard/price-category/add-multiple' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      {
        title: 'price config',
        path: '/dashboard/price-config',
        icon: <AttachMoneyIcon />,
        children: [
          { title: 'Price config List', path: '/dashboard/price-config/list' },
          // { title: 'Add Price config', path: '/dashboard/price-config/add' },
          { title: 'Add Price config', path: '/dashboard/price-config/add-multiple' },
          // { title: 'Six', path: '/dashboard/station/six' },
        ],
      },
      // {
      //   title: 'price classification',
      //   path: '/dashboard/price-classification',
      //   icon: <MonetizationOnIcon/>,
      //   children: [
      //     { title: 'Price Classification List', path: '/dashboard/price-classification/list' },
      //     { title: 'Add Price Classification', path: '/dashboard/price-classification/add' },
      //     // { title: 'Six', path: '/dashboard/station/six' },
      //   ],
      // },
    ],
  },
];

export default navConfig;
