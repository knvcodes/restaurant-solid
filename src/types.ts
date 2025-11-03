export interface IResponse<T = unknown> {
  data: {
    message: string;
    data: T;
  };
}

export interface IRestaurant {
  address: {
    building: string;
    coord: [number, number]; // longitude, latitude
    street: string;
    zipcode: string;
  };
  borough: string;
  cuisine: string;
  grades: {
    date: string; // ISO date string
    grade: string;
    score: number;
  }[];
  name: string;
  restaurant_id: string;
}

export interface ICardProps {
  name: string;
  address: string;
  city: string;
}
