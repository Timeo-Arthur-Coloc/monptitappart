import { Request } from "express";

interface ResponseFormat {
  data: any;
  page: number;
  limit: number;
  count: number;
}

/**
 * Formats the response object with automatic pagination details.
 * @param req - The Express request object to extract pagination details.
 * @param data - The data to include in the response.
 * @param totalCount - Optionally, the total number of items matching the query. If not provided, it will default to the size of the data array.
 * @returns A formatted response object.
 */
export function formatResponse(req: Request, data: any, totalCount?: number): ResponseFormat {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const count = totalCount ?? (Array.isArray(data) ? data.length : 0);

  return {
    data,
    page,
    limit,
    count,
  };
}
