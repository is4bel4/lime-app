import api from "utils/uhttpd.service";

export function setInternetSchedule(scheduleData) {
    return api
        .call("guarita", "set_internet_schedule", {
            block_time: scheduleData.blockTime,
            unblock_time: scheduleData.unblockTime,
            selected_days: scheduleData.selectedDays,
            blocked: {
                categories: scheduleData.selectedCategories,
                ips: scheduleData.blockedIps || [],
            },
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
