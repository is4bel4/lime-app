import { useState } from "preact/hooks";

import style from "./style.less";

const CategoryBlocker = ({
    selectedCategories,
    onChange,
    title,
    categories,
    onIpsChange,
    type = "block", // nova prop para definir se é bloqueio ou desbloqueio
}) => {
    const [newIp, setNewIp] = useState("");
    const [customIps, setCustomIps] = useState([]);
    const [error, setError] = useState("");

    const isValidIP = (ip) => {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip)) return false;

        const parts = ip.split(".");
        return parts.every((part) => {
            const num = parseInt(part, 10);
            return num >= 0 && num <= 255;
        });
    };

    const handleCategoryToggle = (categoryId) => {
        const updatedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];
        onChange(updatedCategories);
    };

    const handleSelectAll = () => {
        onChange(
            selectedCategories.length === categories.length
                ? []
                : categories.map((category) => category.id)
        );
    };

    const handleAddIp = (e) => {
        e.preventDefault();
        if (!newIp.trim()) {
            setError("Por favor, insira um endereço IP");
            return;
        }

        if (!isValidIP(newIp.trim())) {
            setError(
                "Por favor, insira um endereço IP válido (ex: 192.168.1.1)"
            );
            return;
        }

        setError("");

        const updatedIps = [...customIps, newIp.trim()];
        setCustomIps(updatedIps);

        // Notifica o componente pai sobre a mudança nos IPs
        onIpsChange && onIpsChange(updatedIps);

        console.log(
            `IP ${type === "block" ? "bloqueado" : "desbloqueado"}:`,
            newIp
        );
        console.log(
            `Lista atual de IPs ${
                type === "block" ? "bloqueados" : "desbloqueados"
            }:`,
            updatedIps
        );

        setNewIp("");
    };

    const handleRemoveIp = (ip) => {
        const updatedIps = customIps.filter((i) => i !== ip);
        setCustomIps(updatedIps);
        onIpsChange && onIpsChange(updatedIps);
        console.log(
            `IP removido da lista de ${
                type === "block" ? "bloqueados" : "desbloqueados"
            }:`,
            ip
        );
    };

    return (
        <div className="mt-4">
            <label className="bg-[#38927f] text-white block px-6 py-3 rounded w-full">
                {title}
            </label>
            <div className="space-y-3">
                <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-black text-base font-sm transition-colors w-1/2 border border-gray-300 rounded-lg px-6 py-3 mt-4 mb-4 text-centralized hover:bg-gray-50"
                >
                    {selectedCategories.length === categories.length
                        ? "Desmarcar Todos"
                        : "Selecionar Todos"}
                </button>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(
                                    category.id
                                )}
                                onChange={() =>
                                    handleCategoryToggle(category.id)
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{category.name}</span>
                        </label>
                    ))}

                    {/* Seção IPs */}
                    <div className="mt-6 border-t pt-4">
                        <label className="text-sm font-medium text-black block mb-2">
                            {type === "block" ? "Bloquear" : "Desbloquear"} IPs
                            Específicos
                        </label>
                        <form
                            onSubmit={handleAddIp}
                            className="flex gap-2 mb-4"
                        >
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newIp}
                                    onChange={(e) =>
                                        setNewIp(e.currentTarget.value)
                                    }
                                    placeholder="Digite o endereço IP (ex: 192.168.1.1)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38927f] focus:border-[#38927f]"
                                />
                                {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-[#38927f] text-white px-4 py-2 rounded-lg hover:bg-[#2c7164] transition-colors"
                            >
                                Adicionar
                            </button>
                        </form>

                        {/* Lista de IPs */}
                        {customIps.length > 0 && (
                            <div className="space-y-2">
                                {customIps.map((ip, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                                    >
                                        <span className="text-sm text-gray-700">
                                            {ip}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveIp(ip)}
                                            className="text-red-600 hover:text-red-800 text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryBlocker;
