import type { AxiosError } from "axios";

export type ResponseStatus = "success" | "error" | "warning";

// Pagination metadata
export interface PaginationMeta {
  /** Current page number */
  page: number;

  /** Items per page */
  perPage: number;

  /** Total number of items */
  total: number;

  /** Total number of pages */
  totalPages: number;

  /** Whether there's a next page */
  hasNext: boolean;

  /** Whether there's a previous page */
  hasPrev: boolean;

  /** Next page number */
  nextPage?: number;

  /** Previous page number */
  prevPage?: number;
}

// Main API Response interface
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;

  /** Response status */
  status: ResponseStatus;

  /** Human-readable message */
  message: string;

  /** Response data */
  data?: T;

  /** Additional metadata */
  meta?: Record<string, unknown>;

  /** Pagination information */
  pagination?: PaginationMeta;

  /** Error details */
  errors?: Array<Record<string, unknown>>;

  /** Warning messages */
  warnings?: string[];

  /** Response timestamp */
  timestamp: string;

  /** Unique request identifier */
  requestId: string;

  /** Request path */
  path?: string;

  /** API version */
  version: string;
}

export type ApiError<T = unknown> = AxiosError<ApiResponse<T>>;
