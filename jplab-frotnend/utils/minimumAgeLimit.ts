export function minAgeLimit(minAge = 0) {
  const today = new Date();
  today.setFullYear(today.getFullYear() - minAge);
  return today.toISOString().split("T")[0];
}
