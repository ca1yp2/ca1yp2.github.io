import React from "react";
import { Search, PlusCircle } from "lucide-react";

export default function Topbar() {
    return (
        <header className="h-12 bg-[#1e1f22] flex items-center justify-between px-4 border-b border-[#202225] shadow">
            <span className="font-semibold">블로그 채널</span>
            <div className="flex items-center space-x-3">
                <Search size={18} className="hover:text-white transition" />
                <PlusCircle size={18} className="hover:text-white transition" />
            </div>
        </header>
    );
}
