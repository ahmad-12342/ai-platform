"use client";
import React from 'react';
import Link from 'next/link';
import { Sparkles, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-20 bg-background border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Sparkles className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold">Promptova AI</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            The world's most advanced AI content platform for professional creators.
                        </p>
                        <div className="flex gap-4">
                            <Twitter className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                            <Github className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                            <Linkedin className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                            <Instagram className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Tools</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/dashboard/images" className="hover:text-white transition-colors">AI Image Generator</Link></li>
                            <li><Link href="/dashboard/videos" className="hover:text-white transition-colors">AI Video Studio</Link></li>
                            <li><Link href="/dashboard/cv" className="hover:text-white transition-colors">Resume Builder</Link></li>
                            <li><Link href="/dashboard/content" className="hover:text-white transition-colors">Content Writer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                    © 2026 Promptova AI. All rights reserved. Precision in Every Prompt.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
