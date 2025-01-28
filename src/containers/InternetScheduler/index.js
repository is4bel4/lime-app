import React, { useState } from "react";

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
    // Novos estados para os IPs
    const [blockedIps, setBlockedIps] = useState([]);
    const [unblockedIps, setUnblockedIps] = useState([]);

    const handleSubmit = () => {
        // Atualizada a lógica para incluir os IPs
        console.log("Bloqueio:", blockTime);
        console.log("Desbloqueio:", unblockTime);
        console.log("Dias:", selectedDays);
        console.log("Categorias Bloqueadas:", selectedCategories);
        console.log("IPs Bloqueados:", blockedIps);
        console.log("Categorias Desbloqueadas:", selectedCategoriesUnblock);
        console.log("IPs Desbloqueados:", unblockedIps);

        // Objeto com todos os dados para enviar ao backend
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

        console.log("Dados completos do agendamento:", scheduleData);
        // Aqui você pode adicionar a chamada para sua API
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
                        type="block" // Especifica que é para bloqueio
                    />
                    <CategoryBlocker
                        selectedCategories={selectedCategoriesUnblock}
                        onChange={setSelectedCategoriesUnblock}
                        onIpsChange={setUnblockedIps}
                        title="Categorias Desbloqueadas"
                        categories={categoriesUnblock}
                        type="unblock" // Especifica que é para desbloqueio
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className={`${primaryButton} w-full md:w-auto text-base font-bold`}
                    onClick={handleSubmit}
                >
                    Salvar Agendamento
                </button>
            </div>
        </div>
    );
};

export default InternetScheduler;
