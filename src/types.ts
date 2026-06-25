export interface IResponse<T = unknown> {
  data: {
    message: string;
    data: T;
  };
}

export interface ICardProps {
  name: string;
  address: string;
  city: string;
  onClick: () => void;
}

export interface IRestaurant {
  id: string;
  address: Address;
  borough: string;
  cuisine: string;
  grades: Grade[];
  name: string;
  restaurant_id: string;
  cancellationFee: CancellationFee;
  deliveryFee: CancellationFee;
  deliveryHours: DeliveryHours;
  description: string;
  minimumDelivery: CancellationFee;
  openDays: DeliveryHours;
  dishes: IDish[];
}

interface IServing {
  title: string;
  value: number;
  price: number;
  currency: string;
  _id: string;
}

export interface IDish {
  id: string;
  name: string;
  description: string;
  tags: string[];
  metadata: Record<string, string | number>;
  supplements: string[];

  serving: IServing[];
  restaurantId: string;
}

export interface DeliveryHours {
  from: string;
  to: string;
}

interface CancellationFee {
  amount: number;
  currency: string;
  _id: string;
}

interface Grade {
  date: string;
  grade: string;
  score: number;
}

interface Address {
  building: string;
  coord: number[];
  street: string;
  zipcode: string;
}

// USER

export type UserRole = "admin" | "owner" | "customer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

// SERVICE

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  role: string;
  isOAuth: boolean;
}

// ADMIN

export type LoginForm = {
  email: string;
  password: string;
};

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
