import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="text-2xl md:text-3xl font-light text-foreground mt-4">
            Oops! Page Not Found
          </p>
          <p className="mt-2 text-muted-foreground">
            The page you are looking for does not exist. It might have been moved
            or deleted.
          </p>
        </div>
        <Button asChild className="mt-6">
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
