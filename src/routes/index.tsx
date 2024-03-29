import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace />, index: true },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/dashboard/one', element: <PageOne /> },
        { path: '/dashboard/two', element: <PageTwo /> },
        { path: '/dashboard/three', element: <PageThree /> },
        {
          path: '/dashboard/user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: '/dashboard/user/four', element: <PageFour /> },
            { path: '/dashboard/user/five', element: <PageFive /> },
            { path: '/dashboard/user/six', element: <PageSix /> },
          ],
        },
        {
          path: '/dashboard/organization-type',
          children: [
            { element: <Navigate to="/dashboard/organizationType/list" replace />, index: true },
            { path: '/dashboard/organization-type/list', element: <OrganizationTypeList /> },
            { path: '/dashboard/organization-type/add', element: <AddOrganizationType /> },
            {
              path: '/dashboard/organization-type/edit/:organizationTypeId',
              element: <EditOrganizationType />,
            },
          ],
        },
        {
          path: '/dashboard/organization',
          children: [
            { element: <Navigate to="/dashboard/organization/list" replace />, index: true },
            { path: '/dashboard/organization/list', element: <OrganizationList /> },
            { path: '/dashboard/organization/add', element: <AddOrganization /> },
            { path: '/dashboard/organization/edit/:organizationId', element: <EditOrganization /> },
            {
              path: '/dashboard/organization/detail/:organizationId',
              element: <OrganizationDetail />,
            },
          ],
        },
        {
          path: '/dashboard/station',
          children: [
            { element: <Navigate to="/dashboard/station/list" replace />, index: true },
            { path: '/dashboard/station/list', element: <StationList /> },
            { path: '/dashboard/station/add', element: <AddStation /> },
            { path: '/dashboard/station/edit/:stationId', element: <EditStation /> },
            { path: '/dashboard/station/detail/:stationId', element: <StationDetail /> },
          ],
        },
        {
          path: '/dashboard/program',
          children: [
            { element: <Navigate to="/dashboard/program/list" replace />, index: true },
            { path: '/dashboard/program/list', element: <ProgramList /> },
            { path: '/dashboard/program/add', element: <AddProgram /> },
            { path: '/dashboard/program/edit/:programId', element: <EditProgram /> },
            { path: '/dashboard/program/detail/:programId', element: <ScheduleByProgram /> },
          ],
        },
        {
          path: '/dashboard/schedule',
          children: [
            { element: <Navigate to="/dashboard/schedule/list" replace />, index: true },
            { path: '/dashboard/schedule/list', element: <ScheduleByProgram /> },
            { path: '/dashboard/schedule/add', element: <AddSchedule /> },
            { path: '/dashboard/schedule/add-single', element: <AddSingleSchedule /> },
            { path: '/dashboard/schedule/edit/:scheduleId', element: <EditSchedule /> },
            // { path: '/dashboard/station/detail/:stationId', element: <StationDetail /> },
            { path: '/dashboard/schedule/timeline', element: <ScheduleTimeline /> },
          ],
        },
        {
          path: '/dashboard/price-classification',
          children: [
            {
              element: <Navigate to="/dashboard/price-classification/list" replace />,
              index: true,
            },
            { path: '/dashboard/price-classification/list', element: <PriceClassificationList /> },
            { path: '/dashboard/price-classification/add', element: <AddPriceClassification /> },
            {
              path: '/dashboard/price-classification/edit/:priceClassificationId',
              element: <EditPriceClassification />,
            },
            // { path: '/dashboard/price-category/detail/:priceCategoryId', element: <PriceCategoryDetail /> },
          ],
        },
        {
          path: '/dashboard/price-category',
          children: [
            { element: <Navigate to="/dashboard/price-category/list" replace />, index: true },
            { path: '/dashboard/price-category/list', element: <PriceCategoryList /> },
            { path: '/dashboard/price-category/add', element: <AddPriceCategory /> },
            {
              path: '/dashboard/price-category/edit/:priceCategoryId',
              element: <EditPriceCategory />,
            },
            {
              path: '/dashboard/price-category/add-multiple',
              element: <AddMultiplePriceCategory />,
            },
            // AddMultiplePriceCategory
            // { path: '/dashboard/price-category/detail/:priceCategoryId', element: <PriceCategoryDetail /> },
          ],
        },
        {
          path: '/dashboard/price-config',
          children: [
            { element: <Navigate to="/dashboard/price-config/list" replace />, index: true },
            { path: '/dashboard/price-config/list', element: <PriceConfigList /> },
            { path: '/dashboard/price-config/add', element: <AddPriceConfig /> },
            { path: '/dashboard/price-config/edit/:priceConfigId', element: <EditPriceConfig /> },
            { path: '/dashboard/price-config/add-multiple', element: <AddMultiplePriceConfig /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/customPages/dashboard/Dashboard')));
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

//Organization
const OrganizationTypeList = Loadable(
  lazy(() => import('../pages/customPages/organization/organizationType/OrganizationTypeList'))
);
const AddOrganizationType = Loadable(
  lazy(() => import('../pages/customPages/organization/organizationType/AddOrganizationType'))
);
const EditOrganizationType = Loadable(
  lazy(() => import('../pages/customPages/organization/organizationType/EditOrganizationType'))
);

//Organization
const OrganizationList = Loadable(
  lazy(() => import('../pages/customPages/organization/OrganizationList'))
);
const AddOrganization = Loadable(
  lazy(() => import('../pages/customPages/organization/AddOrganization'))
);
const EditOrganization = Loadable(
  lazy(() => import('../pages/customPages/organization/EditOrganization'))
);
const OrganizationDetail = Loadable(
  lazy(() => import('../pages/customPages/organization/OrganizationDetail'))
);

//Station
const StationList = Loadable(lazy(() => import('../pages/customPages/station/StationList')));
const AddStation = Loadable(lazy(() => import('../pages/customPages/station/AddStation')));
const EditStation = Loadable(lazy(() => import('../pages/customPages/station/EditStation')));
const StationDetail = Loadable(lazy(() => import('../pages/customPages/station/StationDetail')));

//Price Category
const PriceCategoryList = Loadable(
  lazy(() => import('../pages/customPages/prices/priceCategory/PriceCategoryList'))
);
const AddPriceCategory = Loadable(
  lazy(() => import('../pages/customPages/prices/priceCategory/AddPriceCategory'))
);
const EditPriceCategory = Loadable(
  lazy(() => import('../pages/customPages/prices/priceCategory/EditPriceCategory'))
);
const AddMultiplePriceCategory = Loadable(
  lazy(() => import('../pages/customPages/prices/priceCategory/AddMultiplePriceCategory'))
);
// const PriceCategoryDetail = Loadable(lazy(() => import('../pages/customPages/prices/priceCategory/PriceCategoryDetail')));

//Price Classification
const PriceClassificationList = Loadable(
  lazy(() => import('../pages/customPages/prices/priceClassification/PriceClassificationList'))
);
const AddPriceClassification = Loadable(
  lazy(() => import('../pages/customPages/prices/priceClassification/AddPriceClassification'))
);
const EditPriceClassification = Loadable(
  lazy(() => import('../pages/customPages/prices/priceClassification/EditPriceClassification'))
);

//Program
const ProgramList = Loadable(lazy(() => import('../pages/customPages/program/ProgramList')));
const AddProgram = Loadable(lazy(() => import('../pages/customPages/program/AddProgram')));
const EditProgram = Loadable(lazy(() => import('../pages/customPages/program/EditProgram')));

//Schedule
const ScheduleByProgram = Loadable(
  lazy(() => import('../pages/customPages/schedule/ScheduleListByProgram'))
);
const AddSchedule = Loadable(lazy(() => import('../pages/customPages/schedule/AddSchedule')));
const AddSingleSchedule = Loadable(
  lazy(() => import('../pages/customPages/schedule/AddSingleSchedule'))
);
const EditSchedule = Loadable(lazy(() => import('../pages/customPages/schedule/EditSchedule')));
// const ScheduleByProgram = Loadable(lazy(() => import('../pages/customPages/schedule/ScheduleListByProgram')));
const ScheduleTimeline = Loadable(
  lazy(() => import('../pages/customPages/schedule/ScheduleTimeline'))
);

// Price Config
const PriceConfigList = Loadable(
  lazy(() => import('../pages/customPages/prices/priceConfig/PriceConfigList'))
);
const AddPriceConfig = Loadable(
  lazy(() => import('../pages/customPages/prices/priceConfig/AddPriceConfig'))
);
const EditPriceConfig = Loadable(
  lazy(() => import('../pages/customPages/prices/priceConfig/EditPriceConfig'))
);
const AddMultiplePriceConfig = Loadable(
  lazy(() => import('../pages/customPages/prices/priceConfig/AddMultiplePriceConfig'))
);
