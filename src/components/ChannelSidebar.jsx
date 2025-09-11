import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function ChannelSidebar() {
    const location = useLocation();
    const menus = [
        { label: "Home", icon: "🏠", path: "/" },
        { label: "About", icon: "👤", path: "/about" },
        { label: "Resume", icon: "📄", path: "/resume" },
        { label: "Portfolio", icon: "💼", path: "/portfolio" },
        { label: "Contact", icon: "📌", path: "/contact" }
    ];

    return (
        <aside className="w-60 bg-[#2b2d31] flex flex-col shadow-lg">
            <header className="p-4 border-b border-[#202225] text-white font-bold text-lg">
                내 블로그
            </header>

            <nav className="flex-1 p-2 space-y-2">
                {menus.map((menu, idx) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <Link key={idx} to={menu.path}>
                            <motion.button
                                whileHover={{ x: 5 }}
                                className={`block w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-colors ${isActive
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
        </aside>
    );
}
