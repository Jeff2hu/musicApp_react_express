export class BadRequestError extends Error {
  constructor(message, code = "00002") {
    super(message);
    this.code = code;
  }
}

export class UnauthorizedError extends Error {
  constructor(message, code = "00001") {
    super(message);
    this.code = code;
  }
}

export class ServerError extends Error {
  constructor(message, code = "99999") {
    super(message);
    this.code = code;
  }
}

export const handleErrorResponse = async (
  res,
  err,
  status = 500,
  code = "99999"
) => {
  if (err instanceof URIError) {
    return res.status(400).json({
      message: "Invalid URL encoding",
      code: "00003",
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid request syntax",
      code: "00004",
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof ServerError) {
    return res.status(500).json({
      message: err.message,
      code: err.code,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      message: err.message,
      code: err.code,
    });
  }

  res.status(status).json({ message: err.message, code });
};

export const handleSuccessResponse = (res, data, message = "成功") => {
  res.status(200).json({
    code: "00000",
    message,
    data,
  });
};
