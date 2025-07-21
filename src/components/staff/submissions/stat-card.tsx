import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { StatCardProps } from "@/types/staff/submission.types";

const StatCard = ({
  title,
  mainValue,
  icon: Icon,
  breakdowns,
  colorPalette,
}: StatCardProps) => {
  return (
    <Card className="group bg-white/90 border border-blue-100 outline-none transition-all duration-300 overflow-hidden hover:bg-slate-50 shadow-none">
      <CardContent className="px-3">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-500 mb-0.5">{title}</p>
            <p className="text-lg font-semibold text-slate-900 truncate">
              {mainValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex space-x-0.5 h-2.5 bg-blue-50 rounded-full overflow-hidden">
            {breakdowns.map((breakdown, index) => (
              <div
                key={index}
                className={`${
                  colorPalette[index % colorPalette.length]
                } transition-opacity duration-300 hover:opacity-80`}
                style={{ width: `${breakdown.percentage}%` }}
                title={`${breakdown.label}: ${
                  breakdown.value
                } (${breakdown.percentage.toFixed(1)}%)`}
              ></div>
            ))}
          </div>
        </div>

        {/* Breakdown Details */}
        <div className="space-y-2">
          {breakdowns.map((breakdown, index) => (
            <div
              key={index}
              className="group/item flex items-center justify-between text-sm hover:bg-blue-25 rounded-md p-2 -m-2 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                    colorPalette[index % colorPalette.length]
                  } flex-shrink-0`}
                ></div>
                <span className="text-slate-700 font-medium truncate">
                  {breakdown.label}
                </span>
              </div>
              <Badge
                variant="outline"
                className="text-sm px-1.5 sm:px-2 py-0.5 bg-blue-25 text-blue-700 border-blue-200"
              >
                {breakdown.value.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-4 pt-3 border-t border-blue-100/50">
          <div className="h-0.5 sm:h-1 bg-blue-200 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
