import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Progress } from "@dingify/ui/components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dingify/ui/components/tabs";

const mockEvents = [
  {
    id: "1",
    channel: "New-channel-name",
    projectName: "ProjectName",
    name: "You got a new payment",
    userId: "user-123",
    icon: "🎉",
    notify: true,
    amount: "$150.00",
    createdAt: "2024-05-16T05:49:41.185Z",
  },
  {
    id: "2",
    channel: "Another-channel",
    projectName: "ProjectName",
    name: "New message received",
    userId: "user-456",
    icon: "💬",
    notify: false,
    amount: "$0.00",
    createdAt: "2024-05-16T06:00:00.000Z",
  },
  {
    id: "3",
    channel: "Third-channel",
    projectName: "ProjectName",
    name: "New task assigned",
    userId: "user-789",
    icon: "📝",
    notify: false,
    amount: "$0.00",
    createdAt: "2024-05-16T06:15:30.500Z",
  },
];

export default function EventsDashboardTable() {
  return (
    <>
      <Tabs defaultValue="week">
        <div className="flex items-center">
          {/* <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList> */}
          {/* <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-7 gap-1 text-sm"
                  size="sm"
                  variant="outline"
                >
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-7 gap-1 text-sm" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div> */}
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Monitor your app's real-time events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead className="hidden sm:table-cell">Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      UserID
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Icon</TableHead>
                    <TableHead className="text-right">Notify</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map((event) => (
                    <TableRow
                      key={event.id}
                      className={event.notify ? "bg-accent" : ""}
                    >
                      <TableCell>
                        <div className="font-medium">{event.channel}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {event.projectName}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {event.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs"
                          variant={event.notify ? "secondary" : "outline"}
                        >
                          {event.userId}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {event.icon}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs"
                          variant={event.notify ? "secondary" : "outline"}
                        >
                          {event.notify.toString()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function ListFilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}
