import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3">
              <Music className="size-7 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription className="py-2 font-bold">
              Manage your songs here
            </CardDescription>
          </div>
          <Button className="mr-2 font-bold text-xl">+</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full">
          <SongsTable />
        </div>
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
