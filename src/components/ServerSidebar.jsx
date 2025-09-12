import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Plus } from 'lucide-react';

export default function ServerSidebar() {
    const [active, setActive] = useState(0);
    const icons = [
        { component: <Home size={20} />, label: "홈" },
        { component: <MessageSquare size={20} />, label: "채팅" },
        { component: <Plus size={20} />, label: "서버 추가" }
    ];

    return (
        <aside className="hidden md:flex w-16 bg-[#1e1f22] flex flex-col items-center py-4 space-y-4 shadow-lg">
            {icons.map((item, idx) => (
                <motion.button
                    key={idx}
                    onClick={() => setActive(idx)}
                    whileHover={{ scale: 1.1, backgroundColor: "#5865F2" }}
                    animate={{
                        border: idx === active ? "2px solid white" : "2px solid transparent",
                        boxShadow: idx === active ? "0 0 8px rgba(255,255,255,0.6)" : "none"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 bg-[#313338] rounded-full flex items-center justify-center text-white cursor-pointer"
                    title={item.label}
                >
                    {item.component}
                </motion.button>
            ))}
        </aside>
    );
}
