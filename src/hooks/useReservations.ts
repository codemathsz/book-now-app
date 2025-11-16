import { useContext } from 'react';
import { ReservationContext } from '@/contexts/ReservationContext';


export const useReservations = () => {
    const context = useContext(ReservationContext);

    if (!context) {
        throw new Error('useReservations deve ser usado dentro de um ReservationProvider');
    }

    return context;
};