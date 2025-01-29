import Compressor from "compressorjs";

import api from "utils/uhttpd.service";

export const getPortalConfig = () =>
    api.call("guarita", "get_portal_config", {});

export const setPortalConfig = (config) =>
    api.call("guarita", "set_portal_config", config);

export const getPortalContent = () =>
    api.call("guarita", "get_portal_page_content", {});

export const setPortalContent = (content) =>
    api.call("guarita", "set_portal_page_content", content);

export const createCompression = (file) =>
    new Promise((res) => {
        new Compressor(file, {
            quality: 0.6,
            maxHeight: 150,
            maxWidth: 150,
            success: (result) => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    res(reader.result);
                };
                reader.readAsDataURL(result);
            },
        });
    });
export function listVouchers() {
    return api
        .call("guarita", "list_vouchers", {})
        .then((response) => response.vouchers)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

export function addVoucher(formData) {
    return api
        .call("guarita", "add_vouchers", formData)
        .then((response) =>
            response.vouchers.map((v) => ({ ...v, ...formData }))
        )
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

export function rename(input) {
    return api
        .call("guarita", "rename", input)
        .then((response) => response)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

export function invalidate(id) {
    return api
        .call("guarita", "invalidate", { id })
        .then((response) => response)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}
// Funções para o Controle de Internet
export function setInternetSchedule(scheduleData) {
    return api
        .call("guarita", "set_internet_schedule", {
            block_time: scheduleData.blockTime,
            unblock_time: scheduleData.unblockTime,
            selected_days: scheduleData.selectedDays,
            // Dados de bloqueio
            blocked: {
                categories: scheduleData.selectedCategories,
                ips: scheduleData.blockedIps || [],
            },
            // Dados de desbloqueio
            unblocked: {
                categories: scheduleData.selectedCategoriesUnblock,
                ips: scheduleData.unblockedIps || [],
            },
        })
        .then((response) => response)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

export function getInternetSchedule() {
    return api
        .call("guarita", "get_internet_schedule", {})
        .then((response) => ({
            blockTime: response.block_time,
            unblockTime: response.unblock_time,
            selectedDays: response.selected_days,
            selectedCategories: response.blocked.categories,
            blockedIps: response.blocked.ips,
            selectedCategoriesUnblock: response.unblocked.categories,
            unblockedIps: response.unblocked.ips,
        }))
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

// Funções auxiliares específicas para IPs (opcional)
export function addBlockedIp(ip) {
    return api
        .call("guarita", "add_blocked_ip", { ip })
        .then((response) => response)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}

export function removeBlockedIp(ip) {
    return api
        .call("guarita", "remove_blocked_ip", { ip })
        .then((response) => response)
        .catch((error) => {
            if (error.code === -32000) {
                return Promise.resolve(null);
            }
            throw error;
        });
}
