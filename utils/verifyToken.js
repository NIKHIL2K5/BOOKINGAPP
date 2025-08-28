import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(createError(403, "Token is not valid!"));
    request.user = user; // user = decoded payload { id, isAdmin }
    next();
  });
};

export const verifyUser = (request, response, next) => {
  verifyToken(request, response, () => {
    if (
      request.user &&
      (request.user.id === request.params.id || request.user.isAdmin)
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user && request.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};