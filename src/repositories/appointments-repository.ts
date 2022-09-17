import { Appointment } from "../entities/appointments";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(
    startAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
