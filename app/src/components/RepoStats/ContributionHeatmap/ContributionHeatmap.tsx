import React from "react";
import "./ContributionHeatmap.css";
import { format, parseISO } from "date-fns";

type ContributionEntry = { date: string; commits: number };

interface HeatmapProps {
  data: ContributionEntry[];
  days?: number; // Defaults to 365
}

const levels = [
  "#ebedf0", // 0
  "#9be9a8", // 1-3
  "#40c463", // 4-6
  "#30a14e", // 7-9
  "#216e39", // 10+
];

const getColor = (count: number): string => {
  if (count === 0) return levels[0];
  if (count <= 3) return levels[1];
  if (count <= 6) return levels[2];
  if (count <= 9) return levels[3];
  return levels[4];
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat"];

const ContributionHeatmap: React.FC<HeatmapProps> = ({ data, days = 365 }) => {
  // Convert array to a map for quick lookup
  const contributionMap = new Map<string, number>();
  data.forEach((entry) => contributionMap.set(entry.date, entry.commits));

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  // Align to the nearest Sunday for GitHub-style grid
  const currentDate = new Date(startDate);
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  const weeks: { date: string; count: number; day: number }[][] = [];
  const months: string[] = [];

  while (currentDate <= today) {
    const week: { date: string; count: number; day: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = currentDate.toISOString().slice(0, 10);
      week.push({
        date: dateStr,
        count: contributionMap.get(dateStr) || 0,
        day: currentDate.getDay(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  // Prepare month labels based on the first day of each week
  weeks.forEach((week) => {
    const firstDay = new Date(week[0].date);
    const month = firstDay.toLocaleString("default", { month: "short" });
    months.push(month);
  });

  return (
    <div>
      <div className="heatmap-container">
        <div className="weekdays">
          {weekdays.map((day) => (
            <div key={day} className="weekday-label">
              {day}
            </div>
          ))}
        </div>

        <div className="heatmap">
          {weeks.map((week, wi) => (
            <div className="week" key={wi}>
              {week.map((day, di) => (
                <div
                  key={di}
                  className="day"
                  style={{ backgroundColor: getColor(day.count) }}
                >
                  <span className="tooltip">
                    {format(parseISO(day.date), "EEEE, MMM d yyyy")} :{" "}
                    {day.count} commit{day.count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Month labels */}
      <div className="month-labels">
        {months.map((month, index) =>
          index === 0 || months[index - 1] !== month ? (
            <span key={index} className="month-label">
              {month}
            </span>
          ) : (
            <span key={index} className="month-label empty" />
          )
        )}
      </div>
    </div>
  );
};

export default ContributionHeatmap;
