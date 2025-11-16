import type { ReservationAdmin } from "@/types";

/**
 * Calculates the most popular time slot based on reservation count
 */
export const getMostPopularTimeSlot = (reservations: ReservationAdmin[]): string => {
    if (reservations.length === 0) return '-';

    const countByTimeSlot: Record<number, { count: number; label: string }> = {};

    reservations.forEach((reservation) => {
        const id = reservation.time_slot_id;
        const label = reservation.time_slots.label;

        if (!countByTimeSlot[id]) {
            countByTimeSlot[id] = { count: 0, label };
        }
        countByTimeSlot[id].count++;
    });

    const mostPopular = Object.values(countByTimeSlot).reduce(
        (max, slot) => (slot.count > max.count ? slot : max),
        { count: 0, label: '-' }
    );

    return mostPopular.label;
};

/**
 * Calculates occupancy rate percentage
 */
export const calculateOccupancyRate = (
    reservations: ReservationAdmin[],
    timeSlotsPerDay: number = 3,
    tablesPerSlot: number = 6
): number => {
    if (reservations.length === 0) return 0;

    const activeReservations = reservations.filter(
        (reservation) => reservation.status === 'active'
    ).length;

    const totalCapacity = timeSlotsPerDay * tablesPerSlot;
    const percentage = (activeReservations / totalCapacity) * 100;

    return Math.round(percentage);
};

/**
 * Groups reservations by time slot and calculates statistics
 */
export const getTimeSlotStats = (reservations: ReservationAdmin[], maxTables: number = 6) => {
    if (reservations.length === 0) return [];

    const groupedByTimeSlot: Record<
        number,
        {
            label: string;
            reservations: ReservationAdmin[];
            maxTables: number;
        }
    > = {};

    reservations.forEach((reservation) => {
        const id = reservation.time_slot_id;

        if (!groupedByTimeSlot[id]) {
            groupedByTimeSlot[id] = {
                label: reservation.time_slots.label,
                reservations: [],
                maxTables,
            };
        }

        groupedByTimeSlot[id].reservations.push(reservation);
    });

    return Object.values(groupedByTimeSlot).map((slot) => ({
        timeRange: slot.label,
        reservedTables: slot.reservations.filter((r) => r.status === 'active').length,
        totalTables: slot.maxTables,
    }));
};
