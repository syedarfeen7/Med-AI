export type UserActivity = {
  id: string;
  title?: string;
  message: string;
  createdAt?: string;
  type?: string;
  isRead?: boolean;
};

export type ActivityPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
