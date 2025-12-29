import { useEffect, useState } from "react";
import "./calendar.css";
import { getDaysInMonth, getDay } from "date-fns";
import { MonthEnum } from "../Enum/monthEnum";

interface Props {
  date: string;
}

const calendar = (props: Props) => {
  const { date } = props;
  const [calendarArr, setCalendarArr] = useState<any>([]);
  const [month, setMonth] = useState<string>(MonthEnum[0]);
  const [year, setYear] = useState<number>(2000);
  const [currentDate, setCurrentDate] = useState<number>(1);

  useEffect(() => {
    const dateSplit: string[] = date.split("/");
    setCurrentDate(Number(dateSplit[0]));
    let thisMonth: number = Number(dateSplit[1]);
    setMonth(MonthEnum[thisMonth - 1]);
    let thisYear: number = Number(dateSplit[2]);
    setYear(thisYear);
    const numberOfDays: number = getDaysInMonth(
      new Date(thisYear, thisMonth - 1)
    );
    const firstday: number = getDay(new Date(thisYear, thisMonth - 1, 1));
    generateRawCalendar(numberOfDays, firstday);
  }, [date]);

  const generateRawCalendar = (numberOfDays: number, firstday: number) => {
    //Here I am generating calendar dates in an array like - [["","",1,2,3,4,5],[6,7,8,9,10,11,12],...,[28,29,30]] format for looping and rendering calender. Inner array is alwasy of length 7 representing 7 days.
    let tempCalendarArr = [];
    let dateCounter: number = 1;
    while (dateCounter <= numberOfDays) {
      let rowArr = [];
      for (let i = 0; i < 7 && dateCounter <= numberOfDays; i++) {
        if (dateCounter < 2 && i < firstday) {
          rowArr.push("");
        } else if (firstday === i) {
          rowArr.push(dateCounter);
          dateCounter++;
        } else {
          rowArr.push(dateCounter);
          dateCounter++;
        }
      }
      tempCalendarArr.push(rowArr);
    }
    setCalendarArr(tempCalendarArr);
  };

  return (
    <div className="p-1 border calendar-container">
      <div className="text-center">
        <b>
          {month} {year}
        </b>
      </div>
      <table>
        <thead>
          <tr>
            <th className="px-1">Su</th>
            <th className="px-1">Mo</th>
            <th className="px-1">Tu</th>
            <th className="px-1">We</th>
            <th className="px-1">Th</th>
            <th className="px-1">Fr</th>
            <th className="px-1">Sa</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {calendarArr &&
            calendarArr.map((row: any, index: number) => {
              return (
                <tr key={index}>
                  {row.map((date: string | number, index: number) => {
                    return (
                      <td
                        key={index + "+" + date}
                        className={currentDate == date ? "currentDate" : ""}
                      >
                        {date}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default calendar;
