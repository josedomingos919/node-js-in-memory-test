import { test, expect } from "vitest";
import { getFutureDate } from "../tests/util/get-future-date";
import { Appointment } from "./appointments";

test("create an appointments", () => {
  const startAt = new Date();
  const endsAt = new Date();
  startAt.setDate(startAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "José Ndonge",
    startAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("José Ndonge");
});

test("validate date and", () => {
  const startAt = getFutureDate("2022-09-10");
  const endsAt = getFutureDate("2022-09-09");

  expect(() => {
    return new Appointment({
      customer: "José Ndonge",
      startAt,
      endsAt,
    });
  }).toThrow();
});
