"use client";
import React from 'react';
import EmojiGenerator from '@/components/dashboard/EmojiGenerator';

export default function EmojiPage() {
    return (
        <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <EmojiGenerator />
        </div>
    );
}
