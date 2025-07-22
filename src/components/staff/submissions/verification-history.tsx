import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SUBMISSION_STATUS_CONFIGS } from "@/constants/staff/submission.constants";
import {
  verificationHistories,
  type VerificationHistory,
} from "@/mock/verification-histories.mock";
import { formatDate } from "@/utils/shared.utils";
import { ArrowRight, Bot, MessageSquare, User } from "lucide-react";

const VerificationHistoryComp = () => {
  const HistoryItem = ({
    history,
    isLast,
  }: {
    history: VerificationHistory;
    isLast: boolean;
  }) => {
    const oldStatusConfig =
      SUBMISSION_STATUS_CONFIGS[
        history.old_status as keyof typeof SUBMISSION_STATUS_CONFIGS
      ];
    const newStatusConfig =
      SUBMISSION_STATUS_CONFIGS[
        history.new_status as keyof typeof SUBMISSION_STATUS_CONFIGS
      ];
    const isAgent = history.verification_type === "AGENT";

    return (
      <div className="relative">
        {!isLast && (
          <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 to-slate-100"></div>
        )}

        <div className="flex gap-4">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              isAgent ? "bg-purple-100" : "bg-blue-100"
            }`}
          >
            {isAgent ? (
              <Bot className="h-6 w-6 text-purple-600" />
            ) : (
              <User className="h-6 w-6 text-blue-600" />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{isAgent ? "Agent" : "Staff"}</p>
                  <Badge variant="outline">
                    {isAgent ? "Automated" : "Manual"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(history.created_at, {})}
                </p>
              </div>

              <p className="text-sm mb-4">{history.comments}</p>

              <div className="flex items-center space-x-3 text-sm">
                <Badge className={`${oldStatusConfig.color}`}>
                  <oldStatusConfig.icon
                    className={`h-3 w-3 mr-1 ${oldStatusConfig.iconColor}`}
                  />
                  {oldStatusConfig.label}
                </Badge>
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <Badge className={`${newStatusConfig.color}`}>
                  <newStatusConfig.icon
                    className={`h-3 w-3 mr-1 ${newStatusConfig.iconColor}`}
                  />
                  {newStatusConfig.label}
                </Badge>
              </div>

              {history.reasons && (
                <div className="bg-slate-50 p-3 rounded-lg border mt-3">
                  <p className="text-sm font-medium mb-1">Reason:</p>
                  <p className="text-sm text-slate-600">{history.reasons}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-none border border-blue-100">
      <CardHeader className="">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Verification History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {verificationHistories.map((history, index) => (
          <HistoryItem
            key={history.id}
            history={history}
            isLast={index === verificationHistories.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default VerificationHistoryComp;
