import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import { useState } from "react";
import AddSongDialog from "./AddSongDialog";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  const [openAddSongDialog, setOpenAddSongDialog] = useState(false);

  return (
    <>
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
            <AddSongDialog
              open={openAddSongDialog}
              onOpenChange={setOpenAddSongDialog}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full">
            <SongsTable />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SongsTabContent;
