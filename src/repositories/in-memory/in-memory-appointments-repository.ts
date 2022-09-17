import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointments";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointments = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { end: endsAt, start: startAt },
        { end: appointment.endsAt, start: appointment.startAt },
        { inclusive: true }
      );
    });

    return overlappingAppointments ?? null;
  }
}
