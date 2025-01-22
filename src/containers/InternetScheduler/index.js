import React, { useState } from "react";

import TimePicker from "../../components/timepicker";

// import WeekDaySelector from '../../components/WeekDaySelector';

const InternetScheduler = () => {
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const handleSubmit = () => {
        // Lógica para enviar os dados do agendamento
        console.log("Horário:", selectedTime);
        console.log("Dias:", selectedDays);
    };

    return (
        <div>
            <h1>Agendamento de Internet</h1>

            <TimePicker
                value={selectedTime}
                onChange={setSelectedTime}
                label={"Time"}
            />

            {/* <WeekDaySelector 
        selectedDays={selectedDays}
        onChange={setSelectedDays}
      /> */}

            <button onClick={handleSubmit}>Agendar</button>
        </div>
    );
};

export default InternetScheduler;
