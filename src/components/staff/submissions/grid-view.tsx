import { submissions } from "@/mock/submissions.mock";
import GridViewCard from "./grid-view-card";

const GridView = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <GridViewCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};

export default GridView;
