import PropTypes from "prop-types";

import style from "./style.less";

const TimePicker = ({
    value,
    onChange,
    label,
    labelColor = "text-gray-700",
}) => {
    return (
        <div>
            <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                {label}
            </label>
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default TimePicker;
