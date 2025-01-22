import style from "./style.less";

const TimePicker = ({ value, onChange, label }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target?.value || "")}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default TimePicker;
