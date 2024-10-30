import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/privado/", "/privado/:path*"] };

export default withAuth({});

export const middleware = withAuth({});