import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { addVoucher } from "./guaritaApi";

export function useAddVoucher() {
    return useMutation(addVoucher, {
        onSuccess: (data) => {
            queryCache.invalidateQueries(["guarita", "list_vouchers"]);
            return data;
        },
    });
}
