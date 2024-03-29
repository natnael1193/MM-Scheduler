import { enableRipple } from '@syncfusion/ej2-base';
import {
  TimelineViews,
  TimelineMonth,
  Day,
  Week,
  WorkWeek,
  Month,
  Print,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
  ExcelExport,
  // PopupOpenEventArgs,
} from '@syncfusion/ej2-react-schedule';
import moment from 'moment';

const TimelineComponent = ({ scheduleData, programData }: any) => {
  enableRipple(true);

  console.log(scheduleData);
  console.log(programData);

  const newScheduleData =
    scheduleData &&
    scheduleData.map(function (schedule: any) {
      return {
        Subject: schedule.key,
        StartTime: moment.utc(schedule.startTime).format().replace(/Z/g, ''),
        EndTime: moment.utc(schedule.endTime).format().replace(/Z/g, ''),
        Id: schedule.id,
        // TaskId: schedule.program.id,
        TaskId: schedule.programId,
        ProjectId: schedule.ProjectId,
        // IsAllDay: schedule.IsAllDay,
        IsReadonly: true,
      };
    });

  const newProgramData =
    programData &&
    programData.map(function (program: any) {
      return {
        id: program.id,
        programName: program.name,
        Id: program.id,
        IsReadonly: true,
      };
    });

    console.log(newProgramData)

  return (
    <div>
      <ScheduleComponent
        cssClass="timeline-resource-grouping"
        height="700px"
        width="100%"
        selectedDate={new Date()}
        eventSettings={{ dataSource: newScheduleData }}
        firstDayOfWeek={4}
        group={{
          byDate: false,
          resources: ['Stations', 'Categories'],
          // enableCompactView: false
        }}
        popupOpen={(args: any) => {
          // args.cancel = true;
          // let isEmptyCell =  args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells'); // checking whether the cell is empty or not
          // if ((args.type === 'QuickInfo' || args.type === 'Editor') ) {
          //   args.cancel = true;
          // }
          let isEmptyCell =
            args.target.classList.contains('e-work-cells') ||
            args.target.classList.contains('e-header-cells'); // checking whether the cell is empty or not
          if ((args.type === 'QuickInfo' || args.type === 'Editor') && isEmptyCell) {
            args.cancel = true;
          }
        }}
        //    currentView="TimelineDay"
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="TimelineDay" />
          <ViewDirective option="TimelineWeek" />
          {/* <ViewDirective option='TimelineWorkWeek'/> */}
          <ViewDirective option="Month"  allowVirtualScrolling={true} showWeekNumber={true} readonly={true}/>
          <ViewDirective option="TimelineMonth" />
          <ViewDirective option="Agenda" />
          {/* <ViewDirective option='Print' /> */}
        </ViewsDirective>

        <ResourcesDirective>
          <ResourceDirective
            field="TaskId"
            title="Category"
            name="Categories"
            allowMultiple={true}
            dataSource={newProgramData}
            textField="programName"
            idField="id"
            groupIDField="groupId"
            colorField="color"
          />
        </ResourcesDirective>
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            TimelineViews,
            TimelineMonth,
            DragAndDrop,
            Resize,
            Print,
            Agenda,
            ExcelExport,
          ]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default TimelineComponent;
