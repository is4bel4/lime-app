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

    const handleSubmit = () => {
        // Lógica para enviar os dados do agendamento
        console.log("Bloqueio:", blockTime);
        console.log("Desbloqueio:", unblockTime);
        console.log("Dias:", selectedDays);
        console.log("Categorias:", selectedCategories);
    };
    const categoriesBlock = [
        { id: "adult", name: "Sites Adultos" },
        { id: "games", name: "Jogos" },
        { id: "bets", name: "Bets" },
    ];
    const categoriesUnblock = [
        { id: "message", name: "Mensagem" },
        { id: "search", name: "Busca" },
        { id: "bla", name: "Bla" },
    ];

    return (
        <div className={`${containerStyles} space-y-8`}>
            <h1 className={headerStyles}>📶 Controle de Acesso à Internet</h1>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className={formContainer}>
                    <TimePicker
                        value={blockTime}
                        onChange={setBlockTime}
                        label="Horário de Bloqueio"
                        labelColor="text-blue-600"
                    />
                    <TimePicker
                        value={unblockTime}
                        onChange={setUnblockTime}
                        label="Horário de Desbloqueio"
                        labelColor="text-emerald-600"
                    />
                </div>
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <WeekDaysPicker
                    selectedDays={selectedDays}
                    onChange={setSelectedDays}
                    label="Dias da Semana"
                    labelClass="text-purple-600 font-medium"
                />
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CategoryBlocker
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                        title="Categorias Bloqueadas"
                        categories={categoriesBlock}
                    />
                    <CategoryBlocker
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                        title="Categorias desbloqueadas"
                        categories={categoriesUnblock}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className={`${primaryButton} w-full md:w-auto`}
                    onClick={handleSubmit}
                >
                    Salvar Agendamento
                </button>
            </div>
        </div>
    );
};

export default InternetScheduler;
