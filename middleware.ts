export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/mybooks", "/favorites", "/rented", "/catalog", "/receipt"],
};
