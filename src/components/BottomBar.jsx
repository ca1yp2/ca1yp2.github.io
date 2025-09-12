import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Send, Smile, Paperclip } from "lucide-react";

export default function BottomBar({ formData, onSubmit, currentQuestion, isContactPage }) {
    const [input, setInput] = useState("");
    const location = useLocation();

    const handleSend = () => {
        if (!input.trim() || !currentQuestion) return;
        onSubmit(input.trim());
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="sticky bottom-0 left-0 w-full bg-[#2f3136] p-2 md:p-3 flex items-center gap-2 md:gap-3 shadow-inner z-10">
            <button className="p-2 rounded-full hover:bg-[#40444b] disabled:opacity-50" disabled={!isContactPage}>
                <Smile size={20} className="text-gray-400" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#40444b] disabled:opacity-50" disabled={!isContactPage}>
                <Paperclip size={20} className="text-gray-400" />
            </button>

            <textarea
                placeholder={isContactPage ? currentQuestion || "질문이 모두 완료되었습니다."
                    : window.innerWidth < 640
                        ? "메시지 권한 없음"
                        : "메시지를 보낼 권한이 없습니다."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`flex-1 resize-none rounded-lg md:rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 max-h-24 ${isContactPage
                    ? "bg-[#40444b] text-white focus:ring-indigo-500"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                rows={1}
                disabled={!isContactPage || !currentQuestion}
            />

            <button
                onClick={handleSend}
                className={`p-2 rounded-full flex items-center justify-center transition disabled:opacity-50 ${isContactPage && currentQuestion
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                disabled={!isContactPage || !currentQuestion}
            >
                <Send size={20} />
            </button>
        </div>
    );
}
