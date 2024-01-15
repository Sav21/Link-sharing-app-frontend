import { API } from "../shared/api";
import { UserLink } from "../store";

export const registerUser = (username, password) => {
  return API.post("/auth/register", {
    username,
    password,
  });
};

export const logIn = (username, password) => {
  return API.post("/auth/login", {
    username,
    password,
  });
};

export const profDetails = ({ firstName, lastName, email }) => {
  return API.post("/me/details", {
    firstName,
    lastName,
    email,
  });
};

export const userLinks = (links: UserLink[]) => {
  return API.post("/me/links", {
    links,
  });
};
