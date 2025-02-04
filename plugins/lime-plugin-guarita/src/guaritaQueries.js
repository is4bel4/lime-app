import { Trans } from "@lingui/macro";
import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { getInternetSchedule, setInternetSchedule } from "./guaritaApi";

async function _getInternetSchedule() {
    const data = await getInternetSchedule();
    if (!data) {
        return {
            blockTime: "",
            unblockTime: "",
            selectedDays: [],
            selectedCategories: [],
            selectedCategoriesUnblock: [],
            blockedIps: [],
            unblockedIps: [],
        };
    }
    return data;
}

export function useInternetSchedule(queryConfig) {
    return useQuery(
        ["guarita", "internet_schedule"],
        _getInternetSchedule,
        queryConfig
    );
}

export function useSetInternetSchedule() {
    return useMutation(setInternetSchedule, {
        onSuccess: () => {
            queryCache.invalidateQueries(["guarita", "internet_schedule"]);
        },
        onError: (error) => {
            console.error(<Trans>Error saving schedule:</Trans>, error);
        },
    });
}
