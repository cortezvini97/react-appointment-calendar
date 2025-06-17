import React, { useState } from "react";
import Calendar, { Appointment } from "react-appointment-calendar";
import { HolidayCalculator } from "react-appointment-calendar";
import type { Holiday } from "react-appointment-calendar";
import 'react-appointment-calendar/dist/Calendar.css';
import './MovableHolidaysExample.css';

const MovableHolidaysExample = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [enableChristianHolidays, setEnableChristianHolidays] = useState(true);
    const [allowChristianHolidayBooking, setAllowChristianHolidayBooking] = useState(false);
    
    const handleSubmit = (data: any, date: Date, event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        console.log('Dados:', data);
        console.log('Data:', date);
        
        const newAppointment: Appointment = {
            id: Date.now().toString(),
            title: data.title,
            date: date,
            data: data
        };
        setAppointments([...appointments, newAppointment]);
    };

    const getHolidays = () => {        
        const holidays = [
            {
                label: "Natal",
                date: "25/12"
            },
            {
                label: "Ano Novo",
                date: "01/01"
            }
        ];
        return holidays;
    };

    // Exemplo de como usar o HolidayCalculator diretamente
    const christianHolidays2025 = HolidayCalculator.calculateMovableHolidays(2025, {
        includeChristianHolidays: true
    });

    return (
        <div className="christian-holidays-example">
            <h1>Feriados Móveis Automáticos</h1>
            
            <div className="controls">
                <h3>Controles:</h3>
                <label>
                    <input 
                        type="checkbox" 
                        checked={enableChristianHolidays}
                        onChange={(e) => setEnableChristianHolidays(e.target.checked)}
                    />
                    Habilitar Feriados Móveis
                </label>
                <br />
                <label>
                    <input 
                        type="checkbox" 
                        checked={allowChristianHolidayBooking}
                        onChange={(e) => setAllowChristianHolidayBooking(e.target.checked)}
                        disabled={!enableChristianHolidays}
                    />
                    Permitir Agendamentos em Feriados Móveis
                </label>
            </div>

            <div className="holidays-info">                <h3>Feriados Móveis de 2025:</h3>
                <ul>
                    {christianHolidays2025.map((holiday: Holiday, index: number) => (
                        <li key={index}>
                            <strong>{holiday.label}</strong>: {holiday.date}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="calendar-container">
                <Calendar 
                    appointments={appointments}
                    onSubmit={handleSubmit}
                    holidays={getHolidays()}
                    allowHolidayBooking={false}
                    enableChristianHolidays={enableChristianHolidays}
                    allowChristianHolidayBooking={allowChristianHolidayBooking}
                    currentDate="2025-03-01" // Março para ver o Carnaval
                />            
            </div>
        </div>
    );
};

export default MovableHolidaysExample;
