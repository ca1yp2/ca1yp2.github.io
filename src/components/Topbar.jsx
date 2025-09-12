import React from "react";
import { Search, PlusCircle } from "lucide-react";

export default function Topbar({ children }) {
    return (
        <header className="h-10 md:h-12 bg-[#1e1f22] flex items-center justify-between px-3 md:px-4 border-b border-[#202225] shadow">
            {/* 왼쪽 영역: 모바일 메뉴 버튼 + 제목 */}
            <div className="flex items-center">
                {children} {/* App.jsx에서 전달한 메뉴 버튼이 여기에 표시됨 */}
                <span className="font-semibold text-sm md:text-base ml-2 md:ml-4">
                    블로그 채널
                </span>
            </div>

            {/* 오른쪽 아이콘 영역 */}
            <div className="flex items-center space-x-2 md:space-x-3">
                <button className="p-1.5 rounded hover:bg-[#2b2d31] transition">
                    <Search size={18} className="text-gray-300 hover:text-white transition" />
                </button>
                <button className="p-1.5 rounded hover:bg-[#2b2d31] transition">
                    <PlusCircle size={18} className="text-gray-300 hover:text-white transition" />
                </button>
            </div>
        </header>
    );
}
