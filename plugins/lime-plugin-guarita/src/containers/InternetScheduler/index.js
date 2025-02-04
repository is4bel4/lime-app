import { Trans } from "@lingui/macro";
import React, { useState } from "react";

import {
    cardSpacing,
    cardStyles,
    containerStyles,
    formContainer,
    headerStyles,
    primaryButton,
} from "plugins/lime-plugin-guarita/src/styles";

import CategoryBlocker from "../../components/categoryblocker";
import TimePicker from "../../components/timepicker";
import WeekDaysPicker from "../../components/weekdayspicker";
import {
    useInternetSchedule,
    useSetInternetSchedule,
} from "../../guaritaQueries";

const InternetScheduler = () => {
    const { data: scheduleData } = useInternetSchedule();
    const { mutate: saveSchedule, isLoading: isSaving } =
        useSetInternetSchedule();

    const [blockTime, setBlockTime] = useState(scheduleData?.blockTime || "");
    const [unblockTime, setUnblockTime] = useState(
        scheduleData?.unblockTime || ""
    );
    const [selectedDays, setSelectedDays] = useState(
        scheduleData?.selectedDays || []
    );
    const [selectedCategories, setSelectedCategories] = useState(
        scheduleData?.selectedCategories || []
    );
    const [selectedCategoriesUnblock, setSelectedCategoriesUnblock] = useState(
        scheduleData?.selectedCategoriesUnblock || []
    );
    const [blockedIps, setBlockedIps] = useState(
        scheduleData?.blockedIps || []
    );
    const [unblockedIps, setUnblockedIps] = useState(
        scheduleData?.unblockedIps || []
    );
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
        try {
            const scheduleData = {
                blockTime,
                unblockTime,
                selectedDays,
                selectedCategories,
                selectedCategoriesUnblock,
                blockedIps,
                unblockedIps,
            };

            await saveSchedule(scheduleData);
            showNotification(<Trans>Settings saved successfully!</Trans>);
        } catch (error) {
            console.error("Erro ao salvar agendamento:", error);
            showNotification(
                <Trans>Error saving settings. Please try again.</Trans>,
                "error"
            );
        }
    };

    const categoriesBlock = [
        { id: "adult", name: <Trans>Adult Sites</Trans> },
        { id: "games", name: <Trans>Games</Trans> },
        { id: "bets", name: <Trans>Bets</Trans> },
    ];

    const categoriesUnblock = [
        { id: "message", name: <Trans>Message</Trans> },
        { id: "search", name: <Trans>Search</Trans> },
        { id: "bla", name: <Trans>Youtube</Trans> },
    ];

    return (
        <div className={containerStyles}>
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
                className={`${headerStyles} bg-[#38927f] text-white block px-4 py-6 rounded-none text-2xl font-bold`}
            >
                <Trans>Internet Access Control</Trans>
            </h1>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className={formContainer}>
                    <TimePicker
                        value={blockTime}
                        onChange={setBlockTime}
                        label={<Trans>Block Time</Trans>}
                        labelColor="bg-[#38927f] text-white inline-block px-6 py-4 w-full text-base font-bold"
                    />
                    <TimePicker
                        value={unblockTime}
                        onChange={setUnblockTime}
                        label={<Trans>Unblock Time</Trans>}
                        labelColor="bg-[#38927f] text-white block px-6 py-4 w-full text-base font-bold"
                    />
                </div>
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <WeekDaysPicker
                    selectedDays={selectedDays}
                    onChange={setSelectedDays}
                    label={<Trans>Days of Week</Trans>}
                    labelClass="bg-[#38927f] text-white block px-6 py-4 w-full"
                />
            </div>

            <div className={`${cardStyles} ${cardSpacing}`}>
                <div className="text-black text-base space-y-6">
                    <CategoryBlocker
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                        onIpsChange={setBlockedIps}
                        title={<Trans>Blocked Categories</Trans>}
                        categories={categoriesBlock}
                        type="block"
                    />
                    <CategoryBlocker
                        selectedCategories={selectedCategoriesUnblock}
                        onChange={setSelectedCategoriesUnblock}
                        onIpsChange={setUnblockedIps}
                        title={<Trans>Unblocked Categories</Trans>}
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
                        ${isSaving ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    onClick={handleSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? (
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
                            <Trans>Saving...</Trans>
                        </span>
                    ) : (
                        <Trans>Save Schedule</Trans>
                    )}
                </button>
            </div>
        </div>
    );
};

export default InternetScheduler;
