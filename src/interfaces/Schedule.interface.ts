export interface Schedule {
  id: any;
  key: string;
  programId: string;
  startDate: string;
  endDate: string;
  schedules: [id: any, day: string, startTime: string, endTime: string, priceClassificationId: any];
  priceClasification : object
}
