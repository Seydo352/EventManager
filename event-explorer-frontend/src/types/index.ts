// TypeScript interfaces and types

export interface Event {
  id: number;
  attributes: {
    title: string;
    date: string;
    location: string;
    description: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
          formats: {
            thumbnail: { url: string };
            small: { url: string };
            medium: { url: string };
            large: { url: string };
          };
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface EventsResponse {
  data: Event[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface EventResponse {
  data: Event;
  meta: {};
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
} 