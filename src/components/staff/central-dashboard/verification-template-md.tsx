import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
import Markdown from "react-markdown";

const VerificationTemplateMD = ({ template }: { template: string }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="verification-template" className="border-0">
        <AccordionTrigger className="hover:no-underline p-0 w-full border-l-4 border-blue-300 bg-blue-100 rounded-r-lg px-3 py-3 items-center">
          <div className="">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-blue-800">
                  Verification Template
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Template used by LLM for verification
                </p>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-3">
          <div className="border border-blue-100 rounded-lg bg-white">
            <ScrollArea className="h-[60vh] w-full p-4">
              <div className="prose prose-sm max-w-none">
                <Markdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl font-semibold text-slate-900 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-medium text-slate-800 mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-3 space-y-1 text-sm text-slate-600">
                        {children}
                      </ul>
                    ),
                    code: ({ children }) => (
                      <code className="bg-blue-50 px-1.5 py-0.5 rounded text-xs text-blue-800">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {template}
                </Markdown>
              </div>
            </ScrollArea>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default VerificationTemplateMD;
