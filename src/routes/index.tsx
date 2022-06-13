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
        { element: <Navigate to="/dashboard/one" replace />, index: true },
        { path: '/dashboard', element: <Navigate to="/dashboard/one" replace />, index: true },
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
            { path: '/dashboard/schedule/edit/:scheduleId', element: <EditSchedule /> },
            // { path: '/dashboard/station/detail/:stationId', element: <StationDetail /> },
          ],
        },
        {
          path: '/dashboard/price-classification',
          children: [
            { element: <Navigate to="/dashboard/price-classification/list" replace />, index: true },
            { path: '/dashboard/price-classification/list', element: <PriceClassificationList /> },
            { path: '/dashboard/price-classification/add', element: <AddPriceClassification /> },
            { path: '/dashboard/price-classification/edit/:priceClassificationId', element: <EditPriceClassification /> },
            // { path: '/dashboard/price-category/detail/:priceCategoryId', element: <PriceCategoryDetail /> },
          ],
        },
        {
          path: '/dashboard/price-category',
          children: [
            { element: <Navigate to="/dashboard/price-category/list" replace />, index: true },
            { path: '/dashboard/price-category/list', element: <PriceCategoryList /> },
            { path: '/dashboard/price-category/add', element: <AddPriceCategory /> },
            { path: '/dashboard/price-category/edit/:priceCategoryId', element: <EditPriceCategory /> },
            // { path: '/dashboard/price-category/detail/:priceCategoryId', element: <PriceCategoryDetail /> },
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
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));


//Station
const StationList = Loadable(lazy(() => import('../pages/customPages/station/StationList')));
const AddStation = Loadable(lazy(() => import('../pages/customPages/station/AddStation')));
const EditStation = Loadable(lazy(() => import('../pages/customPages/station/EditStation')));
const StationDetail = Loadable(lazy(() => import('../pages/customPages/station/StationDetail')));


//Price Category
const PriceCategoryList = Loadable(lazy(() => import('../pages/customPages/prices/priceCategory/PriceCategoryList')));
const AddPriceCategory = Loadable(lazy(() => import('../pages/customPages/prices/priceCategory/AddPriceCategory')));
const EditPriceCategory = Loadable(lazy(() => import('../pages/customPages/prices/priceCategory/EditPriceCategory')));
// const PriceCategoryDetail = Loadable(lazy(() => import('../pages/customPages/prices/priceCategory/PriceCategoryDetail')));


//Price Classification
const PriceClassificationList = Loadable(lazy(() => import('../pages/customPages/prices/priceClassification/PriceClassificationList')));
const AddPriceClassification = Loadable(lazy(() => import('../pages/customPages/prices/priceClassification/AddPriceClassification')));
const EditPriceClassification = Loadable(lazy(() => import('../pages/customPages/prices/priceClassification/EditPriceClassification')));

//Program
const ProgramList = Loadable(lazy(() => import('../pages/customPages/program/ProgramList')));
const AddProgram = Loadable(lazy(() => import('../pages/customPages/program/AddProgram')));
const EditProgram = Loadable(lazy(() => import('../pages/customPages/program/EditProgram')));


//Schedule
const ScheduleByProgram = Loadable(lazy(() => import('../pages/customPages/schedule/ScheduleListByProgram')));
const AddSchedule = Loadable(lazy(() => import('../pages/customPages/schedule/AddSchedule')));
const EditSchedule = Loadable(lazy(() => import('../pages/customPages/schedule/EditSchedule')));
// const ScheduleByProgram = Loadable(lazy(() => import('../pages/customPages/schedule/ScheduleListByProgram')));