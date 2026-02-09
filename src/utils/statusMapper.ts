export function statusMapper(status: keyof typeof httpMapper): number {
  return httpMapper[status];
}

const httpMapper = {
  SUCCESSFUL: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_CONTENT: 422,
  default: 500,
};
