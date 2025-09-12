import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function ChannelSidebar({ isMobile = false, closeSidebar }) {
    const location = useLocation();

    const menus = [
        { label: "Home", icon: "🏠", path: "/" },
        { label: "About", icon: "👤", path: "/about" },
        { label: "Resume", icon: "📄", path: "/resume" },
        { label: "Portfolio", icon: "💼", path: "/portfolio" },
        { label: "Contact", icon: "📌", path: "/contact" }
    ];

    return (
        <motion.aside
            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
            transition={{ type: "tween", stiffness: 300 }}
            className={`flex flex-col bg-[#2b2d31] shadow-lg ${isMobile
                    ? "fixed top-0 left-0 w-64 h-full z-50"
                    : "min-w-[10rem] md:min-w-[15rem] w-40 md:w-60"
                }`}
        >
            {/* 헤더 */}
            <header className="p-2 md:p-4 border-b border-[#202225] text-white font-bold text-md md:text-base">
                내 블로그
            </header>

            {/* 메뉴 네비게이션 */}
            <nav className="flex-1 p-1 md:p-2 space-y-1 md:space-y-2">
                {menus.map((menu, idx) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <Link
                            key={idx}
                            to={menu.path}
                            onClick={() => isMobile && closeSidebar && closeSidebar()}
                        >
                            <motion.button
                                whileHover={{ x: 5 }}
                                className={`block w-full text-left px-2 py-1 md:px-3 md:py-2 rounded flex items-center gap-2 text-sm md:text-base transition-colors ${isActive
                                        ? "bg-[#5865F2] text-white font-semibold"
                                        : "text-gray-300 hover:bg-[#40444b]"
                                    }`}
                            >
                                <span>{menu.icon}</span>
                                <span>{menu.label}</span>
                            </motion.button>
                        </Link>
                    );
                })}
            </nav>
        </motion.aside>
    );
}
