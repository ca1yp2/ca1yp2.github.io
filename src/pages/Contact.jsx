import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const {
        formData,
        chatLogs,
        currentQuestion,
    } = useOutletContext();

    const scrollRef = useRef();

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
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-6 text-white">Contact Me</h1>

            <div className="flex-1 overflow-y-auto space-y-4 p-2">
                {chatLogs.map((log, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-lg max-w-md ${log.type === "question"
                            ? "bg-[#40444b] text-white"
                            : log.type === "answer"
                                ? "bg-indigo-500 text-white ml-8"
                                : "bg-green-600 text-white text-center"
                            }`}
                    >
                        {log.text}

                    </div>
                ))}
                {currentQuestion === null && chatLogs.length > 0 && (
                    <button
                        className="mt-4 px-12 py-3 bg-green-500 rounded-lg hover:bg-green-600 text-white"
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
