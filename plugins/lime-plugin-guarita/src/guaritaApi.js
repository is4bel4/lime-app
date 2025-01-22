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
