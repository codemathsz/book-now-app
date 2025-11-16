export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  label: string;
  max_tables: number;
  is_active: boolean;
}

export interface Reservation {
  id: string;
  user_id: string;
  time_slot_id: number;
  date: string; // YYYY-MM-DD
  table_number: number;
  status: 'active' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateReservationDTO {
  time_slot_id: number;
  date: string;
}