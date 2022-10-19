import { Grid, Box, Paper, Card, Typography, Divider } from '@mui/material';
// import MovingIcon from '@mui/icons-material/Moving';
import CampaignIcon from '@mui/icons-material/Campaign';
import NextPlanIcon from '@mui/icons-material/NextPlan';
// import SourceIcon from '@mui/icons-material/Source';
import DetailsIcon from '@mui/icons-material/Details';
import { styled } from '@mui/material/styles';
import ErrorComponent from 'src/components/customComponents/shared/ErrorComponent';
import LoadingComponent from 'src/components/customComponents/shared/LoadingComponent';
import { useStationsQuery } from 'src/services/StationApi';
import { useProgramsQuery } from 'src/services/ProgramApi';
import { usePriceClassificationsQuery } from 'src/services/PriceClassificationApi';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';
import BarChart from './BarChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: 'start',
  // color: theme.palette.text.secondary,
  // boxShadow: "",
  // border: "black"
}));

const Dashboard = () => {
  let stationData: any = [];
  let programsData: any = [];
  let priceClassificationsData: any = [];
  let priceCategoriesData: any = [];
  let stationChartData: any = [];
  let programsChartData: any = [];
  let programChartData: any = [];
  let scheduleChartData: any = [];

  // Get All Stations
  const { data, error, isLoading } = useStationsQuery();
  //Get All Programs
  const { data: programData, error: programError, isLoading: programLoading } = useProgramsQuery();
  //Get All Price Classification
  const {
    data: priceClassificationData,
    error: priceClassificationError,
    isLoading: priceClassificationLoading,
  } = usePriceClassificationsQuery();
  //Get All Price Categories
  const {
    data: priceCategoryData,
    error: priceCategoryError,
    isLoading: priceCategoryLoading,
  } = usePriceCategoriesQuery();

  if (isLoading || programLoading || priceClassificationLoading || priceCategoryLoading)
    return <LoadingComponent />;
  if (error || programError || priceClassificationError || priceCategoryError)
    return <ErrorComponent />;

  stationData = data;
  // Get station data
  stationChartData = stationData.data.map(function (stations: any) {
    return stations.name;
  });
  // Get programs data length from it's station data
  programsChartData = stationData.data.map(function (programs: any) {
    return programs.programs.length;
  });

  programsData = programData;
  // Get program data for the chart
  programChartData = programsData.data.map(function (programs: any) {
    return programs.name;
  });

    // Get program schedules for the chart
    scheduleChartData = programsData.data.map(function (schedules: any) {
      return schedules.schedules.length;
    });

  priceClassificationsData = priceClassificationData;
  priceCategoriesData = priceCategoryData;

  console.log(scheduleChartData);

  return (
    <div>
      <Box sx={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Stations <CampaignIcon color="success" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{stationData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Programs <NextPlanIcon color="secondary" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{programsData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Schedules <SourceIcon color="warning" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">664</Typography>
              </Item>
            </Card>
          </Grid> */}
          <Divider />
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">Total Price Classifications</Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{priceClassificationsData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mb: 4 }}>
            <Card sx={{ boxShadow: 5 }}>
              <Item>
                <Typography variant="h6">
                  Total Price Categories <DetailsIcon color="error" />
                </Typography>
              </Item>
              <Item>
                <Typography variant="inherit">
                  {/* +2.6% <MovingIcon color="success" />{' '} */}
                </Typography>
              </Item>
              <Item>
                <Typography variant="h4">{priceCategoriesData.data.length}</Typography>
              </Item>
            </Card>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 5 }}>
          {/* Chart for stations and programs */}
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 4 }}>
            <BarChart
              xData={stationChartData}
              yData={programsChartData}
              title={'Stations With Programs'}
              label={"Programs"}
            />
          </Grid>

        {/* Chart for programs and schedules */}
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 4 }}>
            <BarChart
              xData={programChartData}
              yData={scheduleChartData}
              title={'Programs With Schedules'}
              label={"Schedules"}
            />
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
