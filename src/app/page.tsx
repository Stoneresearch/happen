// src/app/page.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Users, CheckCircle, Moon, Sun, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Home() {
    return (
        <ClerkProvider>
            <HomeContent />
        </ClerkProvider>
    );
}

function HomeContent() {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const handleLogout = () => {
        router.push('/');
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background dark:bg-card">
            {/* Header Section */}
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background dark:bg-card shadow-md">
                <Link className="flex items-center" href="/">
                    <Image src="/logo.png" alt="Happen.ninja" width={30} height={30} />
                    <span className="sr-only">Happen.ninja</span>
                </Link>
                <nav className="hidden lg:flex gap-6">
                    <Link className="text-sm font-medium hover:underline text-foreground dark:text-card-foreground" href="#">
                        Artists
                    </Link>
                    <Link className="text-sm font-medium hover:underline text-foreground dark:text-card-foreground" href="#">
                        Venues
                    </Link>
                    <Link className="text-sm font-medium hover:underline text-foreground dark:text-card-foreground" href="#">
                        Logistics
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {user ? (
                        <button
                            className="hidden lg:inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background h-10 text-sm font-medium rounded-full px-6 py-2 hover:bg-[#e6f2ff] hover:text-primary text-foreground dark:text-card-foreground"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="hidden lg:inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background h-10 text-sm font-medium rounded-full px-6 py-2 hover:bg-[#e6f2ff] hover:text-primary text-foreground dark:text-card-foreground"
                            >
                                Login
                            </Link>
                            <Link
                                href="/sign-up"
                                className="hidden lg:inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#e6f2ff] hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-card dark:border-card dark:text-card-foreground dark:hover:bg-muted"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <button className="lg:hidden p-2 text-foreground dark:text-card-foreground">
                        <Sun className="h-5 w-5" aria-hidden="true" />
                        <Moon className="h-5 w-5 hidden dark:block" aria-hidden="true" />
                        <span className="sr-only">Toggle theme</span>
                    </button>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="flex-1">
                {/* Section 1 */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-foreground dark:text-card-foreground">
                                        Collaborate Seamlessly on Your Next Big Event
                                    </h1>
                                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground dark:text-card-foreground">
                                        Empower your team with tools to manage every aspect of your festival or event.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <Link
                                        href="/sign-up"
                                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#e6f2ff] hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-card dark:border-card dark:text-card-foreground dark:hover:bg-muted"
                                    >
                                        Sign Up
                                    </Link>
                                    <a
                                        className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#e6f2ff] hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-card dark:border-card dark:text-card-foreground dark:hover:bg-muted"
                                        href="#"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <Image src="/logo.svg" width={550} height={550} alt="Hero" className="w-full h-auto max-w-sm mx-auto lg:mx-0 lg:w-full lg:h-auto object-cover rounded-xl" />
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4 text-center">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Why Happen.ninja?</div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-foreground dark:text-card-foreground">
                                Streamline Your Event Management
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-muted-foreground dark:text-card-foreground">
                                Happen Group Ninja is the all-in-one platform that simplifies artist booking, venue coordination, and logistical planning. Elevate your events and create unforgettable experiences.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <User className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Unified Dashboard</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Manage your event from one platform.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Users className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Collaborative Workspace</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Real-time updates for your team.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <CheckCircle className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Guestlist & VIP Management</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Effortlessly handle and automate time-consuming service processes.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <CheckCircle className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Artist Logistics & Venue Coordination</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Simplify any process with our efficient event management solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3 - Get Started in 3 Steps */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4 text-center">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Get Started in 3 Steps</div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-foreground dark:text-card-foreground">
                                Enhance Your Event Organization
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-muted-foreground dark:text-card-foreground">
                                Happen Group Ninja makes it easy to manage every aspect of your event. Here's how:
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="mt-8 space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Sign Up</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Create your Happen Group Ninja account and get started.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Invite Your Team</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Invite your team members to collaborate on your events.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-card-foreground">Start Managing</h3>
                                    <p className="text-muted-foreground dark:text-card-foreground">Use the Happen.ninja platform to streamline your event management.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-card">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4 text-center">
                            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Trusted by Event Professionals</div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-foreground dark:text-card-foreground">
                                What Our Customers Say
                            </h2>
                        </div>

                        {/* Testimonials */}
                        <div className="mt-8 space-y-8">
                            {/* Testimonial 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-muted">
                                <p className="text-base md:text-lg lg:text-xl text-muted-foreground dark:text-card-foreground">
                                    "Happen Group Ninja has been a game-changer for our event planning business. The unified dashboard and collaborative tools have streamlined our workflows and enabled us to deliver exceptional experiences for our clients. Now we have more time to take scorp during our shifts. Ayyyyyyyyyyyyyy."
                                </p>
                                <p className="mt-4 font-bold text-foreground dark:text-card-foreground">Paris Volpe</p>
                                <p className="text-muted-foreground dark:text-card-foreground">Event Organizer</p>
                            </div>
                            {/* Testimonial 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-muted">
                                <p className="text-base md:text-lg lg:text-xl text-muted-foreground dark:text-card-foreground">
                                    "Happen Group Ninja has been a game-changer for our event planning business. The unified dashboard and collaborative tools have streamlined our workflows and enabled us to deliver exceptional experiences for our noses."
                                </p>
                                <p className="mt-4 font-bold text-foreground dark:text-card-foreground">Daniel MacFayden</p>
                                <p className="text-muted-foreground dark:text-card-foreground">Berghain Owner</p>
                            </div>
                            {/* Testimonial 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-muted">
                                <p className="text-base md:text-lg lg:text-xl text-muted-foreground dark:text-card-foreground">
                                    "Happen Group Ninja has been very positive to my beautiful baby life. My Daddy has enabled since then, more free time to spend at home and to play with me and eat yummy Pizza. I like. :-)"
                                </p>
                                <p className="mt-4 font-bold text-foreground dark:text-card-foreground">Charlie Volpe</p>
                                <p className="text-muted-foreground dark:text-card-foreground">Just a normal Kid</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            <footer className="bg-background dark:bg-card text-muted-foreground dark:text-card-foreground py-8">
                <div className="container px-4 md:px-6 text-center">
                    <p>&copy; 2024 Happen Group Ninja. All rights reserved.</p>
                    <div className="mt-4 flex justify-center gap-6">
                        <a href="#" className="text-muted-foreground dark:text-card-foreground">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="#" className="text-muted-foreground dark:text-card-foreground">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="#" className="text-muted-foreground dark:text-card-foreground">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
