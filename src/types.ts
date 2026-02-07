type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "UNPROCESSABLE_CONTENT";

type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

type ServiceResponseSuccess<T> = {
  status: "SUCCESSFUL" | "CREATED";
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
