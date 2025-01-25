import style from "./style.less";

const WeekDaysPicker = ({
    selectedDays,
    onChange,
    label,
    labelClass = "text-gray-700",
}) => {
    const weekDays = [
        { id: 0, name: "Domingo" },
        { id: 1, name: "Segunda" },
        { id: 2, name: "Terça" },
        { id: 3, name: "Quarta" },
        { id: 4, name: "Quinta" },
        { id: 5, name: "Sexta" },
        { id: 6, name: "Sábado" },
    ];

    return (
        <div className="mt-4">
            <label className={`block text-sm font-medium mb-2 ${labelClass}`}>
                {label}
            </label>
            <div className="flex flex-wrap gap-3">
                {weekDays.map((day) => (
                    <div
                        key={day.id}
                        className="flex items-center space-x-2 bg-white border rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                        <input
                            type="checkbox"
                            id={`day-${day.id}`}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            checked={selectedDays.includes(day.id)}
                            onChange={() => {
                                const newDays = selectedDays.includes(day.id)
                                    ? selectedDays.filter((d) => d !== day.id)
                                    : [...selectedDays, day.id];
                                onChange(newDays);
                            }}
                        />
                        <label
                            htmlFor={`day-${day.id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                        >
                            {day.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekDaysPicker;
