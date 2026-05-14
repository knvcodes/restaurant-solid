import { DeliveryHours, IRestaurant } from "../types";

export const generateRandomImageUrl = (length: number) => {
  return Math.floor(Math.random() * length);
};

export function generateAddress(item: IRestaurant) {
  const {
    address: { building, street, zipcode },
  } = item;
  return building + ", " + street + ", " + zipcode;
}

export function generateOpenHours(openDays: DeliveryHours) {
  const dayArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const firstIndex = dayArray.findIndex((day) =>
    day.toLowerCase().includes(openDays.from.toLowerCase()),
  );
  const lastIndex = dayArray.findIndex((day) =>
    day.toLowerCase().includes(openDays.to.toLowerCase()),
  );

  return dayArray.filter(
    (days, _index) => _index >= firstIndex && _index <= lastIndex,
  );
}

export function formatDateTime(timeString: string) {
  // Handle ISO string (e.g., "2024-01-15T14:30:00.000Z", "2024-01-15T09:00:00Z")
  // OR plain "HH:MM" format (e.g., "14:30", "09:00")

  const date = new Date(timeString);

  // Check if valid date from ISO string
  if (!isNaN(date.getTime()) && timeString.includes("T")) {
    // Valid ISO string — use as-is, auto-detect user's timezone
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  // Fallback: Handle plain "HH:MM" format
  const [hours, minutes] = timeString.split(":").map(Number);
  const fallbackDate = new Date();
  fallbackDate.setHours(hours, minutes, 0);

  return fallbackDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
