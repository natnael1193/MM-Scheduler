export interface Schedule {
  id: any;
  programId: string;
  startDate: string;
  endDate: string;
  schedules: [id: any, day: string, startTime: string, endTime: string, priceClassificationId: any];
}
