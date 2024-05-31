"use client";

import ActivityCalendar from "react-activity-calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

// Example data: array of objects with date and count
const calendarData = [
  { date: "2023-01-01", count: 2, level: 1 },
  { date: "2023-01-02", count: 5, level: 2 },
  { date: "2023-01-03", count: 1, level: 0 },
  { date: "2023-02-16", count: 1, level: 1 },

  // Add more data points as needed
  { date: "2023-03-31", count: 3, level: 1 },
];

export function UserGridActivity() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Calendar</CardTitle>
        <CardDescription>
          A visualization of user activity throughout the year.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ height: "auto", width: "100%" }}>
          <ActivityCalendar
            data={calendarData}
            blockSize={15}
            blockMargin={5}
            fontSize={14}
            hideTotalCount={false}
            showWeekdayLabels
            hideMonthLabels={false}
            theme={{
              light: ["#ebedf0", "#c6e48b", "#7bc96f", "#82ca9d", "#239a3b"],
              dark: ["#282828", "#5c4e4e", "#946b6b", "#b74d4d", "#82ca9d"],
            }}
            labels={{
              months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              totalCount: "{{count}} activities in {{year}}",
              legend: {
                less: "Less",
                more: "More",
              },
            }}
            colorScheme="light" // Use "dark" for dark mode
            eventHandlers={{
              onClick: (event) => (activity) => {
                alert(JSON.stringify(activity));
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
