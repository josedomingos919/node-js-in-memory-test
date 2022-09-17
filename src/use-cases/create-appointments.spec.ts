import { describe, it, expect } from "vitest";
import { Appointment } from "../entities/appointments";
import { CreateAppointment } from "./create-appointments";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create appointments", () => {
  it("Should be able to create an appointments", () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();

    const createAppointment = new CreateAppointment(appointmentRepository);

    const startAt = new Date();
    const endsAt = new Date();
    startAt.setDate(startAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "José Ndonge",
        startAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("Should be able to create an appointments with duplicated dates", async () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();

    const createAppointment = new CreateAppointment(appointmentRepository);

    const startAt = new Date();
    const endsAt = new Date();
    startAt.setDate(startAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    await createAppointment.execute({
      customer: "José Ndonge",
      startAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "José Ndonge",
        startAt,
        endsAt,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
