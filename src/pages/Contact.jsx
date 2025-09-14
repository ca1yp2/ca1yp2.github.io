import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const {
        formData,
        chatLogs,
        currentQuestion,
    } = useOutletContext();

    const scrollRef = useRef();
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(prev => prev || window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const EMAIL_SERVICE_ID = "service_xtd73vg";
    const EMAIL_TEMPLATE_ID = "template_f8defwa";
    const EMAIL_PUBLIC_KEY = "-WiLQAselBdOV_CAD";

    // 채팅 로그가 업데이트될 때 스크롤
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLogs]);

    const handleSendEmail = () => {
        emailjs
            .send(
                EMAIL_SERVICE_ID,
                EMAIL_TEMPLATE_ID,
                formData,
                EMAIL_PUBLIC_KEY
            )
            .then(
                () => alert("메일이 성공적으로 전송되었습니다!"),
                () => alert("메일 전송에 실패했습니다.")
            );
    };

    return (
        <div
            className="flex flex-col flex-1 overflow-y-auto p-4 sm:p-6"
            style={{ height: viewportHeight }}
        >
            <h1 className="text-4xl font-bold mb-6 text-white">Contact Me</h1>

            <div className="flex-1 space-y-4">
                {chatLogs.map((log, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-lg w-full max-w-full sm:max-w-md break-words ${log.type === "question"
                            ? "bg-[#40444b] text-white"
                            : log.type === "answer"
                                ? "bg-indigo-500 text-white sm:ml-8 ml-4"
                                : "bg-green-600 text-white text-center"
                            }`}
                    >
                        {log.text}

                    </div>
                ))}
                {currentQuestion === null && chatLogs.length > 0 && (
                    <button
                        className="mt-4 px-6 sm:px-12 py-3 bg-green-500 rounded-lg hover:bg-green-600 text-white w-full sm:w-auto"
                        onClick={handleSendEmail}
                    >
                        메일 전송하기
                    </button>
                )}
                <div ref={scrollRef} />
            </div>


        </div>
    );
}
