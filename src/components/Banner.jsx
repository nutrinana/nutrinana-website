"use client";
import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importing ShadCN Button

export default function Banner() {
    const [isVisible, setIsVisible] = useState(true);
    
    if (!isVisible) return null;

    return (
        <div className="bg-yellow-200 text-black text-sm py-2 px-4 flex items-center justify-center relative">
            <p>
                <strong>Tasting Session on 7th July!</strong>{" "}
                <Link href="#" className="underline hover:text-green-700">
                    More info
                </Link>
            </p>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="absolute right-4 text-gray-700 hover:text-gray-900"
            >
                <X size={16} />
            </Button>
        </div>
    );
}