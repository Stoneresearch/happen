'use client'

import React, { useState } from 'react'
import { 
  Airplane, Bell, ChevronLeft, ChevronRight, ClipboardList, 
  FileText, LayoutDashboard, Menu, Settings, Truck, Upload, Users, File
} from 'lucide-react'
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function DashboardComponent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Truck size={20} />, label: 'Logistics' },
    { icon: <File size={20} />, label: 'File Uploads' },
    { icon: <ClipboardList size={20} />, label: 'Tasks' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white border-r transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} hidden md:block`}>
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && <h1 className="text-2xl font-bold text-purple-600">Happen Ninja</h1>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              <div className={`${sidebarCollapsed ? 'mx-auto' : ''}`}>
                {item.icon}
              </div>
              {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-4 w-4" />
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event1">Summer Music Festival</SelectItem>
                <SelectItem value="event2">Tech Conference 2023</SelectItem>
                <SelectItem value="event3">Art Exhibition</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Input type="text" placeholder="Search..." className="w-full max-w-xs hidden md:block" />
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="file-uploads">File Uploads</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Files</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Flights</CardTitle>
                    <Airplane className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Logistics Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Artist</TableHead>
                            <TableHead>Travel</TableHead>
                            <TableHead>Accommodation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>The Rockers</TableCell>
                            <TableCell>AA1234 - Jul 14</TableCell>
                            <TableCell>Sunset Hotel</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>DJ Awesome</TableCell>
                            <TableCell>UA5678 - Jul 15</TableCell>
                            <TableCell>Beachside Resort</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Confirm stage setup</TableCell>
                            <TableCell>Paris</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                In Progress
                              </span>
                            </TableCell>
                            <TableCell>Jul 13, 2023</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Arrange equipment delivery</TableCell>
                            <TableCell>Macca</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            </TableCell>
                            <TableCell>Jul 14, 2023</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Finalize rehearsal schedule</TableCell>
                            <TableCell>Luisa</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                Overdue
                              </span>
                            </TableCell>
                            <TableCell>Jul 15, 2023</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="logistics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Logistics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Artist</TableHead>
                          <TableHead>Travel</TableHead>
                          <TableHead>Accommodation</TableHead>
                          <TableHead>Transportation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>The Rockers</TableCell>
                          <TableCell>
                            <div>Flight: AA1234</div>
                            <div>From: JFK to LAX</div>
                            <div>Date: Jul 14, 2023</div>
                          </TableCell>
                          <TableCell>
                            <div>Sunset Hotel</div>
                            <div>Room: 301-303</div>
                            <div>Check-in: Jul 14, 2023</div>
                          </TableCell>
                          <TableCell>
                            <div>SUV from airport</div>
                            <div>Driver: John Doe</div>
                            <div>Contact: +1234567890</div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>DJ Awesome</TableCell>
                          <TableCell>
                            <div>Flight: UA5678</div>
                            <div>From: LHR to LAX</div>
                            <div>Date: Jul 15, 2023</div>
                          </TableCell>
                          <TableCell>
                            <div>Beachside Resort</div>
                            <div>Room: Suite 42</div>
                            <div>Check-in: Jul 15, 2023</div>
                          </TableCell>
                          <TableCell>
                            <div>Limo service</div>
                            <div>Company: LuxeDrive</div>
                            <div>Booking Ref: LD78901</div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="file-uploads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>File Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File Name</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>stage_plan.pdf</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Jul 10, 2023</TableCell>
                          <TableCell>2.4 MB</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>equipment_list.xlsx</TableCell>
                          <TableCell>Jane Smith</TableCell>
                          <TableCell>Jul 11, 2023</TableCell>
                          <TableCell>1.8 MB</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>contract.docx</TableCell>
                          <TableCell>Mike Johnson</TableCell>
                          <TableCell>Jul 12, 2023</TableCell>
                          <TableCell>523 KB</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4">
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <Tabs
Content value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Task and Schedule Coordination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Confirm stage setup for The Rockers</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Paris</TableCell>
                          <TableCell>Jul 13, 2023</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              In Progress
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Arrange DJ Awesome's equipment delivery</TableCell>
                          <TableCell>Jane Smith</TableCell>
                          <TableCell>Macca</TableCell>
                          <TableCell>Jul 14, 2023</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Finalize The Rockers' rehearsal schedule</TableCell>
                          <TableCell>Mike Johnson</TableCell>
                          <TableCell>Luisa</TableCell>
                          <TableCell>Jul 15, 2023</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Overdue
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}