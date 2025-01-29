import React, { useState } from "react";

import { setInternetSchedule } from "../../../plugins/lime-plugin-guarita/src/guaritaApi";
import CategoryBlocker from "../../components/categoryblocker";
import {
    cardSpacing,
    cardStyles,
    containerStyles,
    formContainer,
    headerStyles,
    primaryButton,
} from "../../components/common/styles";
import TimePicker from "../../components/timepicker";
import WeekDaysPicker from "../../components/weekdayspicker";

const InternetScheduler = () => {
    const [blockTime, setBlockTime] = useState("");
    const [unblockTime, setUnblockTime] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoriesUnblock, setSelectedCategoriesUnblock] = useState(
        []
    );
    const [blockedIps, setBlockedIps] = useState([]);
    const [unblockedIps, setUnblockedIps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(
            () => setNotification({ show: false, message: "", type: "" }),
            3000
        );
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const scheduleData = {
                blockTime,
                unblockTime,
                selectedDays,
                blocked: {
                    categories: selectedCategories,
                    ips: blockedIps,
                },
                unblocked: {
                    categories: selectedCategoriesUnblock,
                    ips: unblockedIps,
                },
            };

            await setInternetSchedule(scheduleData);
            console.log("Dados enviados:", scheduleData);

            showNotification("Configurações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar agendamento:", error);
            showNotification(
                "Erro ao salvar as configurações. Tente novamente.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const categoriesBlock = [
        { id: "adult", name: "Sites Adultos" },
        { id: "games", name: "Jogos" },
        { id: "bets", name: "Bets" },
    ];

    const categoriesUnblock = [
        { id: "message", name: "Mensagem" },
        { id: "search", name: "Busca" },
        { id: "bla", name: "Youtube" },
    ];

    return (
        <div className={`${containerStyles} space-y-8`}>
            {notification.show && (
                <div
                    className={`
                        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        p-4 rounded-lg shadow-lg z-50
                        ${
                            notification.type === "error"
                                ? "bg-red-500"
                                : "bg-[#38927f]"
                        }
                        text-white transition-all duration-300 ease-in-out
                        min-w-[200px] text-center
                    `}
                >
                    {notification.message}
                </div>
            )}

            <h1
                className={`${headerStyles} bg-[#38927f] text-white block px-4 py-2 rounded-none text-xl text-2xl font-bold`}
            >
                Controle de Acesso à Internet
            </h1>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className={formContainer}>
                    <TimePicker
                        value={blockTime}
                        onChange={setBlockTime}
                        label="Horário de Bloqueio"
                        labelColor="bg-[#38927f] text-white inline-block px-6 py-3 rounded w-full text-base font-bold"
                    />
                    <TimePicker
                        value={unblockTime}
                        onChange={setUnblockTime}
                        label="Horário de Desbloqueio"
                        labelColor="bg-[#38927f] text-white block px-6 py-3 rounded w-full text-base font-bold"
                    />
                </div>
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <WeekDaysPicker
                    selectedDays={selectedDays}
                    onChange={setSelectedDays}
                    label="Dias da Semana"
                    labelClass="bg-[#38927f] text-white block px-6 py-3 rounded w-full"
                />
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className="text-black text-base space-y-6">
                    <CategoryBlocker
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                        onIpsChange={setBlockedIps}
                        title="Categorias Bloqueadas"
                        categories={categoriesBlock}
                        type="block"
                    />
                    <CategoryBlocker
                        selectedCategories={selectedCategoriesUnblock}
                        onChange={setSelectedCategoriesUnblock}
                        onIpsChange={setUnblockedIps}
                        title="Categorias Desbloqueadas"
                        categories={categoriesUnblock}
                        type="unblock"
                    />
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className={`
                        ${primaryButton} 
                        w-full md:w-auto 
                        text-base font-bold
                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Salvando...
                        </span>
                    ) : (
                        "Salvar Agendamento"
                    )}
                </button>
            </div>
        </div>
    );
};

export default InternetScheduler;
