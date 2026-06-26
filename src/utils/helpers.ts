import { toastActions } from "../store/toastStore";
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

export const getErrorMessage = (error: unknown): string | string[] => {
  // Axios error
  if (typeof error === "object" && error !== null) {
    const err = error as any;

    console.info("err.response:===>", err.response);

    if (
      Array.isArray(err.response?.data?.details) &&
      err.response?.data?.details?.length > 0
    ) {
      return err.response?.data?.details.map(
        (errorItem: { message: string }) => errorItem.message,
      );
    }

    // Server returned error response
    if (err.response?.data?.message || err.response?.data?.error) {
      return err.response.data.message || err.response?.data?.error;
    }

    // Axios error message (e.g., "Request failed with status code 404")
    if (err.message) {
      return err.message;
    }
  }

  // Fallback
  return "Something went wrong";
};

export const isEmpty = (value: unknown): boolean => {
  try {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === "string") {
      return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }

    return false;
  } catch {
    return true;
  }
};

export const showToastErrors = (errors: string | string[]) => {
  if (Array.isArray(errors)) {
    errors.forEach((error) => toastActions.show(error, "Validation failed"));
  } else {
    toastActions.show(errors, "Error");
  }
};

export const generateRandomId = () => {
  return crypto.randomUUID();
};

// js data helpers

export const addObjToArray = <T>(arr: T[], obj: T, prop: keyof T): T[] => {
  const exists = arr.find((item) => item[prop] === obj[prop]);

  return exists ? arr : [...arr, obj];
};

export const removeObjFromArray = <T>(
  arr: T[],
  value: string | number,
  prop: keyof T,
): T[] => {
  return arr.filter((item) => item[prop] !== value);
};
