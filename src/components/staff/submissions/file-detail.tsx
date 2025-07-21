import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Submission } from "@/mock/submissions.mock";
import { formatDate, formatFileSize } from "@/utils/shared.utils";
import {
  Bot,
  Download,
  Eye,
  FileCheck,
  FileIcon,
  FileText,
  ImageIcon,
} from "lucide-react";

const FileDetails = ({ submission }: { submission: Submission }) => (
  <div className="space-y-4">
    {/* File Info */}
    <Card className="shadow-none border border-blue-100">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-slate-200 rounded-lg">
              <FileIcon className="h-5 w-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{submission.file_name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(submission.file_size)} • {submission.mime_type}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* File Preview */}
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 bg-slate-50/50">
          <div className="text-center">
            {submission.mime_type.startsWith("image/") ? (
              <ImageIcon className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            ) : (
              <FileText className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            )}
            <p className="text-sm text-muted-foreground">
              {submission.mime_type.startsWith("image/") ? "Image" : "PDF"}{" "}
              Preview
            </p>
            <Button variant="ghost" size="sm" className="mt-2">
              <Eye className="h-4 w-4 mr-2" />
              View Full Size
            </Button>
          </div>
        </div>

        {/* AI Confidence Score */}
        {submission.agent_confidence_score && (
          <div className="space-y-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium flex items-center text-sm">
                <Bot className="h-4 w-4 mr-2 text-purple-600" />
                AI Confidence Score
              </span>
              <span className="font-semibold">
                {(submission.agent_confidence_score * 100).toFixed(0)}%
              </span>
            </div>
            <Progress
              value={submission.agent_confidence_score * 100}
              className="h-1.5 bg-white"
            />
          </div>
        )}
      </CardContent>
    </Card>

    {/* Timeline */}
    <Card className="shadow-none border border-blue-100">
      <CardContent className="">
        <div className="flex items-center justify-between text-center">
          <div className="space-y-1">
            <div className="p-1.5 bg-blue-100 rounded-full mx-auto w-fit">
              <FileIcon className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Submitted
            </p>
            <p className="text-xs font-semibold">
              {formatDate(submission.submitted_at, {})}
            </p>
          </div>
          <div className="h-px bg-slate-200 flex-1 mx-3"></div>
          <div className="space-y-1">
            <div className="p-1.5 bg-amber-100 rounded-full mx-auto w-fit">
              <FileCheck className="h-3.5 w-3.5 text-amber-600" />
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Last Updated
            </p>
            <p className="text-xs font-semibold">
              {formatDate(submission.updated_at, {})}
            </p>
          </div>
          <div className="h-px bg-slate-200 flex-1 mx-3"></div>
          <div className="space-y-1">
            <div className="p-1.5 bg-red-100 rounded-full mx-auto w-fit">
              <FileCheck className="h-3.5 w-3.5 text-red-600" />
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Expires At
            </p>
            <p className="text-xs font-semibold">
              {submission.expired_at
                ? formatDate(submission.expired_at, {})
                : "No Expiry"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default FileDetails;
