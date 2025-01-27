import style from "./style.less";

const CategoryBlocker = ({
    selectedCategories,
    onChange,
    title,
    categories,
}) => {
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
                </div>
            </div>
        </div>
    );
};

export default CategoryBlocker;
