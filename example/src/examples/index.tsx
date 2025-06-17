import React, { useState } from "react";
import Calendar, { Appointment }  from "react-appointment-calendar";
//import 'react-appointment-calendar/dist/index.css';

const CalendarExample = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const handleSubmit = (data: any, date: Date, event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        console.log('Dados:', data);
        console.log('Data:', date);
        console.log('Event:', event);
        
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
            }
        ];
        return holidays;
    };

    const customForm = (date: Date, onSubmit: (data: any, event?: React.FormEvent) => void, onCancel: () => void) => {
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
            };
            onSubmit(data, e);
        };

        return (
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">Título:</label>
                    <input 
                        id="title"
                        type="text" 
                        name="title" 
                        required 
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="description">Descrição:</label>
                    <textarea 
                        id="description"
                        name="description" 
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={onCancel}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>        );
    };
    
    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>            
            <h1>Exemplo com Controle de Navegação</h1>
            <p>Este exemplo mostra o controle <code>previousMonths</code> que impede navegação para meses anteriores.</p>
            
            <Calendar 
                appointments={appointments}
                onSubmit={handleSubmit}
                workingHours={"08:00-9:00"}
                workingHoursCurrentDayOnly={true}
                holidays={getHolidays()}
                allowHolidayBooking={false}
                enableChristianHolidays={true}
                allowChristianHolidayBooking={false}
                previousMonths={false}
                currentDate="2025-06-01"
                renderForm={customForm}
            />
        </div>
    )
}

export default CalendarExample;
