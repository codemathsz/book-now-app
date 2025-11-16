export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  label: string;
  max_tables: number;
  is_active: boolean;
}

export interface Reservation {
  id: string
  user_id: string
  time_slot_id: number
  date: string
  table_number: number
  status: string
  created_at: string
  updated_at: string
  time_slots: {
    label: string
    end_time: string
    start_time: string
  }
}

export interface CreateReservationDTO {
  time_slot_id: number;
  date: string;
}

export interface AvailabilityTimeSlots {
  time_slot_id: number;
  label: string;
  start_time: string;
  end_time: string;
  available_tables: number;
  max_tables: number;
  is_available: boolean;
}