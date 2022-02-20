import { localStorage } from "@/utils";
import { AUTHENTICATION_KEY } from "@/constants";

export default function auth({ next }) {
  // TODO move to store to avoid people accessing cookie and/or getting issues when multiple logins
  if (!localStorage.get(AUTHENTICATION_KEY)) {
    return next({
      name: "Home",
    });
  }

  return next();
}
