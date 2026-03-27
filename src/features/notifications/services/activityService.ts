import { apiRequest } from "@/shared/api/client";

import type {
  ActivityPagination,
  UserActivity,
} from "@/features/notifications/types/activity";

type ActivitiesResponse =
  | UserActivity[]
  | {
      items?: UserActivity[];
      pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
      message?: string;
    };

type GetUserActivitiesOptions = {
  limit?: number;
  page?: number;
};

type UserActivitiesResult = {
  items: UserActivity[];
  pagination: ActivityPagination | null;
};

function normalizeActivity(
  activity: Partial<UserActivity>,
  index: number,
): UserActivity {
  return {
    id: activity.id ?? `activity-${index}`,
    title: activity.title ?? activity.type ?? "New activity",
    message: activity.message ?? "",
    createdAt: activity.createdAt,
    type: activity.type,
    isRead: activity.isRead,
  };
}

export async function getUserActivities(
  accessToken: string,
  options: GetUserActivitiesOptions = {},
): Promise<UserActivitiesResult> {
  const { page = 1, limit = 10 } = options;
  const response = await apiRequest<ActivitiesResponse>("/activities/user", {
    method: "GET",
    params: {
      limit,
      page,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (Array.isArray(response)) {
    return {
      items: response.map(normalizeActivity),
      pagination: null,
    };
  }

  const activities = response?.items ?? [];
  return {
    items: activities.map(normalizeActivity),
    pagination: response.pagination ?? null,
  };
}
