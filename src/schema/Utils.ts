export type AvailabilitySchedulesType = { id: number, name: string, shifts: shiftType[] }
export type shiftType = { availableWeekDays: number[], period: number[] }