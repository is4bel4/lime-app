// Shared Tailwind class utilities
export const containerStyles = "bg-gray-50 p-8 rounded-xl shadow-md";
export const headerStyles = "text-3xl font-bold mb-6 text-gray-900";
export const cardStyles =
    "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow";
export const cardSpacing = "mb-6"; // Novo componente de espaçamento
export const formContainer = "space-y-5"; // Espaçamento vertical entre elementos de formulário
export const buttonStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200";
export const primaryButton = `${buttonStyles} bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]`;
export const secondaryButton = `${buttonStyles} border-2 border-blue-100 text-blue-700 hover:bg-blue-50`;

// Sistema de espaçamento ampliado
export const spacing = {
    xsmall: "4px",
    small: "8px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
};

// Nova paleta com melhor contraste
export const colors = {
    primary: "#2563eb", // blue-600
    primaryLight: "#93c5fd", // blue-300
    secondary: "#374151", // gray-700
    accent: "#059669", // emerald-600
    textPrimary: "#111827", // gray-900
    textSecondary: "#4b5563", // gray-600
};
