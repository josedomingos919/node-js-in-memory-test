import { Appointment } from "../entities/appointments";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentsRepository) {}

  async execute({
    customer,
    endsAt,
    startAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointments =
      await this.appointmentRepository.findOverlappingAppointment(
        startAt,
        endsAt
      );

    if (overlappingAppointments) {
      throw new Error("There is an appointment with the same date");
    }

    const appointment = new Appointment({ customer, endsAt, startAt });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
