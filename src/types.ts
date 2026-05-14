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
