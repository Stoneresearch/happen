// src/app/dashboard/DashboardContent.tsx

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, MapPinIcon, PlaneIcon, Hotel, Car, Users, FileText, ClipboardList, Mail, List, MessageCircle, Send, DollarSign, Bot, X } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";

// Simulated WebSocket connection
const mockWebSocket = {
    send: (message: string) => {
        console.log('Sent message:', message);
    },
    onmessage: null as ((event: { data: string }) => void) | null,
};

type Message = {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
};

type BudgetItem = {
    id: string;
    category: string;
    amount: number;
    spent: number;
};

type AIChatMessage = {
    id: string;
    role: 'user' | 'ai';
    content: string;
};

export default function DashboardContent() {
    const [activeTab, setActiveTab] = useState('overview');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        { id: '1', category: 'Artist Fees', amount: 50000, spent: 30000 },
        { id: '2', category: 'Venue Rental', amount: 20000, spent: 20000 },
        { id: '3', category: 'Marketing', amount: 15000, spent: 10000 },
        { id: '4', category: 'Production', amount: 25000, spent: 15000 },
    ]);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [aiChatMessages, setAIChatMessages] = useState<AIChatMessage[]>([
        { id: '1', role: 'ai', content: "Hello! I'm your AI assistant. How can I help you today?" }
    ]);
    const [aiChatInput, setAIChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const aiChatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulated WebSocket connection setup
        mockWebSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setChatMessages((prevMessages) => [...prevMessages, message]);
        };

        // Cleanup function
        return () => {
            mockWebSocket.onmessage = null;
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    useEffect(() => {
        aiChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiChatMessages]);

    const handleSendEmail = () => {
        console.log('Sending email:', { subject: emailSubject, body: emailBody });
        setEmailSubject('');
        setEmailBody('');
    };

    const handleAddGuest = () => {
        console.log('Adding guest to guestlist:', { name: guestName, email: guestEmail });
        setGuestName('');
        setGuestEmail('');
    };

    const handleSendChatMessage = () => {
        if (chatMessage.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: 'User',
                content: chatMessage,
                timestamp: new Date(),
            };
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
            mockWebSocket.send(JSON.stringify(newMessage));
            setChatMessage('');
        }
    };

    const getTotalBudget = () => budgetItems.reduce((total, item) => total + item.amount, 0);
    const getTotalSpent = () => budgetItems.reduce((total, item) => total + item.spent, 0);

    const handleSendAIChatMessage = async () => {
        if (aiChatInput.trim()) {
            const userMessage: AIChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: aiChatInput,
            };
            setAIChatMessages((prevMessages) => [...prevMessages, userMessage]);
            setAIChatInput('');

            // Simulated AI response (replace this with actual LLM integration)
            setTimeout(() => {
                const aiResponse: AIChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'ai',
                    content: `I understand you said: "${aiChatInput}". How can I assist you further?`,
                };
                setAIChatMessages((prevMessages) => [...prevMessages, aiResponse]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Happen Ninja Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                            Notifications
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
                        <TabsTrigger value="overview" className="rounded-md text-sm">Overview</TabsTrigger>
                        <TabsTrigger value="logistics" className="rounded-md text-sm">Logistics</TabsTrigger>
                        <TabsTrigger value="requests" className="rounded-md text-sm">Requests</TabsTrigger>
                        <TabsTrigger value="riders" className="rounded-md text-sm">Riders</TabsTrigger>
                        <TabsTrigger value="tasks" className="rounded-md text-sm">Tasks</TabsTrigger>
                        <TabsTrigger value="workflow" className="rounded-md text-sm">Workflow</TabsTrigger>
                        <TabsTrigger value="emails" className="rounded-md text-sm">Emails</TabsTrigger>
                        <TabsTrigger value="guestlist" className="rounded-md text-sm">Guestlist</TabsTrigger>
                        <TabsTrigger value="chat" className="rounded-md text-sm">Chat</TabsTrigger>
                        <TabsTrigger value="budget" className="rounded-md text-sm">Budget</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
                                    <Users className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24</div>
                                    <p className="text-xs text-gray-500">+2 from last month</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">6</div>
                                    <p className="text-xs text-gray-500">Next event in 3 days</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                                    <ClipboardList className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-gray-500">4 urgent requests</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                                    <FileText className="h-4 w-4 text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">18</div>
                                    <p className="text-xs text-gray-500">7 due today</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle>Upcoming Events Timeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <CalendarIcon className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">Summer Music Festival</h3>
                                                <p className="text-sm text-gray-500">July 15-17, 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <CalendarIcon className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">City Park Concert Series</h3>
                                                <p className="text-sm text-gray-500">Every Saturday, August 2023</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <CalendarIcon className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">Fall Arts Showcase</h3>
                                                <p className="text-sm text-gray-500">September 22-24, 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle>Recent Activities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <Users className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">New artist onboarded</h3>
                                                <p className="text-sm text-gray-500">Jane Doe added to roster</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <FileText className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">Contract signed</h3>
                                                <p className="text-sm text-gray-500">Summer Music Festival agreement completed</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Mail className="h-6 w-6 text-gray-500" />
                                            <div>
                                                <h3 className="font-semibold">Bulk email sent</h3>
                                                <p className="text-sm text-gray-500">Event details sent to all artists</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="logistics" className="space-y-6">
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>Logistics Management</CardTitle>
                                <CardDescription>Track flights, accommodations, and transportation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <PlaneIcon className="h-6 w-6 text-gray-500" />
                                        <div>
                                            <h3 className="font-semibold">Flight Tracking</h3>
                                            <p className="text-sm text-gray-500">3 upcoming flights</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Hotel className="h-6 w-6 text-gray-500" />
                                        <div>
                                            <h3 className="font-semibold">Accommodations</h3>
                                            <p className="text-sm text-gray-500">5 hotel bookings</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Car className="h-6 w-6 text-gray-500" />
                                        <div>
                                            <h3 className="font-semibold">Transportation</h3>
                                            <p className="text-sm text-gray-500">2 shuttle routes active</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="emails" className="space-y-6">
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>Automated Emails</CardTitle>
                                <CardDescription>Send automated emails to artists, vendors, and team members</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-subject">Email Subject</Label>
                                        <Input
                                            id="email-subject"
                                            placeholder="Enter email subject"
                                            value={emailSubject}
                                            onChange={(e) => setEmailSubject(e.target.value)}
                                            className="border-gray-300 focus:border-black focus:ring-black"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-body">Email Body</Label>
                                        <Textarea
                                            id="email-body"
                                            placeholder="Enter email body"
                                            value={emailBody}
                                            onChange={(e) => setEmailBody(e.target.value)}
                                            className="border-gray-300 focus:border-black focus:ring-black"
                                        />
                                    </div>
                                    <Button type="submit" variant="outline" className="border-black text-black hover:bg-gray-100">
                                        Send Email
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Add other TabsContent sections here (requests, riders, tasks, workflow, guestlist, chat, budget) */}

                </Tabs>
            </main>

            {/* AI Chat Agent */}
            <div className={`fixed bottom-4 right-4 transition-all duration-300 ${isAIChatOpen ? 'w-96 h-[500px]' : 'w-16 h-16'}`}>
                <Card className="w-full h-full flex flex-col bg-white border border-gray-200 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
                        <CardTitle className={`${isAIChatOpen ? 'block' : 'hidden'}`}>AI Assistant</CardTitle>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-black text-black hover:bg-gray-100"
                            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
                        >
                            {isAIChatOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                        </Button>
                    </CardHeader>
                    {isAIChatOpen && (
                        <>
                            <CardContent className="flex-grow overflow-auto p-4">
                                <ScrollArea className="h-full w-full pr-4">
                                    {aiChatMessages.map((message) => (
                                        <div key={message.id} className={`mb-4 ${message.role === 'ai' ? 'text-gray-800' : 'text-gray-600'}`}>
                                            <div className="font-semibold">{message.role === 'ai' ? 'AI' : 'You'}</div>
                                            <div className="text-sm">{message.content}</div>
                                        </div>
                                    ))}
                                    <div ref={aiChatEndRef} />
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 border-t border-gray-200">
                                <form onSubmit={(e) => { e.preventDefault(); handleSendAIChatMessage(); }} className="w-full">
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Ask me anything..."
                                            value={aiChatInput}
                                            onChange={(e) => setAIChatInput(e.target.value)}
                                            className="border-gray-300 focus:border-black focus:ring-black"
                                        />
                                        <Button type="submit" variant="outline" className="border-black text-black hover:bg-gray-100">
                                            <Send className="h-4 w-4" />
                                            <span className="sr-only">Send</span>
                                        </Button>
                                    </div>
                                </form>
                            </CardFooter>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
