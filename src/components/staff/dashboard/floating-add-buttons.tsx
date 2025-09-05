import { Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FloatingAddButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky z-50 bottom-4 w-full flex justify-end">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            size="lg"
            className="group w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm transition-all duration-200"
          >
            <Plus className="h-6 w-6 size-2 transition-transform duration-200 group-hover:rotate-45" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          align="end"
          side="top"
          className="w-full p-2 bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-xl mb-2"
        >
          <div
            onClick={() => navigate("/staff/programs/new")}
            className="group rounded-lg p-2 cursor-pointer transition-colors duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 border-0 focus:bg-gradient-to-r focus:from-blue-50 focus:to-blue-100"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-800 text-sm">Program</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/staff/requirements/new")}
            className="group rounded-lg p-2 cursor-pointer transition-colors duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 border-0 focus:bg-gradient-to-r focus:from-purple-50 focus:to-purple-100"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                <Plus className="h-4 w-4 text-purple-600" />
              </div>
              <span className="font-medium text-gray-800 text-sm">
                Requirement
              </span>
            </div>
          </div>
          <div
            onClick={() => navigate("/staff/schedules/new")}
            className="group rounded-lg p-2 cursor-pointer transition-colors duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 border-0 focus:bg-gradient-to-r focus:from-green-50 focus:to-green-100"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                <Plus className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-800 text-sm">
                Schedule
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default FloatingAddButtons;
