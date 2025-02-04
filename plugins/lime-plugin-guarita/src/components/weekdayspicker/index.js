import { Trans } from "@lingui/macro";

const WeekDaysPicker = ({
    selectedDays,
    onChange,
    label,
    labelClass = "text-black",
}) => {
    const weekDays = [
        { id: 0, name: <Trans>Sunday</Trans> },
        { id: 1, name: <Trans>Monday</Trans> },
        { id: 2, name: <Trans>Tuesday</Trans> },
        { id: 3, name: <Trans>Wednesday</Trans> },
        { id: 4, name: <Trans>Thursday</Trans> },
        { id: 5, name: <Trans>Friday</Trans> },
        { id: 6, name: <Trans>Saturday</Trans> },
    ];

    return (
        <div className="mt-4">
            <label className={`block text-base font-bold mb-2 ${labelClass}`}>
                {label}
            </label>
            <div className="flex flex-wrap gap-3">
                {weekDays.map((day) => (
                    <div
                        key={day.id}
                        className="flex items-center space-x-2 bg-white border-none text-black rounded-lg px-4 py-3 hover:bg-gray-50"
                    >
                        <input
                            type="checkbox"
                            id={`day-${day.id}`}
                            className="h-6 w-6 text-blue-600 rounded border-gray-300"
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
                            className="text-sm text-black cursor-pointer"
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
