export interface IResponse<T = unknown> {
  data: {
    message: string;
    data: T;
  };
}

export interface ICardProps {
  name: string;
  onClick: () => void;
  cuisine: string;
  trending?: boolean;
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
  views: number;
}

export interface IServing {
  type: string;
  value: number;
  price: number;
  currency: string;
  _id: string;
  total: number;
}

export interface IDish {
  restaurantName: string;
  _id: string;
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

// BREADCRUMBS

export interface Path {
  pathName: string;
  path: string;
}

export interface CustomBreadCrumbsProps {
  paths: Path[];
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
