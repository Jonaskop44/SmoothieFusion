export type ApiResponse<T> = {
  data: T | null;
  status: boolean;
};
