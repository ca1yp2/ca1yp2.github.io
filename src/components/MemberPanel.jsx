import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MemberPanel = ({ user }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="right-0 top-0 h-screen w-80 bg-[#2b2d31] shadow-lg flex flex-col text-white overflow-hidden"
        >
            {/* Cover Image */}
            <div className="relative h-28 w-full">
                <img
                    src={user.cover || "https://picsum.photos/400/150"}
                    alt="Cover"
                    className="object-cover w-full h-full"
                />
                {/* Avatar & Name/Tag */}
                <div
                    className="absolute left-4 bottom-[-10%] flex flex-col items-start"
                    style={{ transform: "translateY(50%)" }}
                >
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full border-2 border-[#2b2d31]"
                        />
                        <span
                            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#2b2d31] ${user.status === "online"
                                ? "bg-green-500"
                                : user.status === "idle"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                                }`}
                        ></span>
                    </div>
                    {/* Name & Tag - 1줄(horizontal) */}
                    <div className="flex items-center gap-2 mt-2">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-400">{user.tag}</p>
                    </div>
                </div>
            </div>

            {/* Spacer to account for avatar overlap */}
            <div className="h-12"></div>

            {/* Meta Info */}
            <div className="bg-[#242629] rounded-lg p-4 mt-6 mb-4 mx-4 flex flex-col gap-2">
                <div>
                    <span className="text-gray-400 text-xs">내소개</span>
                    <p className="text-white text-sm">{user.joinDate}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-3 px-4 mb-4">
                <button
                    className="flex-1 bg-[#3a3c41] hover:bg-[#50535a] rounded-md py-2 text-sm"
                    onClick={() => navigate("/contact")}
                >
                    이메일 보내기
                </button>
            </div>
        </motion.div>
    );
};

export default MemberPanel;
