import type { HydrogenSession, HydrogenSessionData } from "@shopify/hydrogen";
import { createCookieSessionStorage, type SessionStorage, type Session } from "react-router";

/**
 * This is a custom session implementation for your Hydrogen shop.
 * Feel free to customize it to your needs, add helper methods, or
 * swap out the cookie-based implementation with something else!
 */
export class AppSession implements HydrogenSession<HydrogenSessionData> {
  public isPending = false;

  #sessionStorage;
  #session;

  constructor(sessionStorage: SessionStorage, session: Session) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage<HydrogenSessionData>({
      cookie: {
        name: "session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets,
      },
    });

    const session = await storage
      .getSession(request.headers.get("Cookie"))
      .catch(() => storage.getSession());

    return new this(storage, session);
  }

  get has() {
    return this.#session.has;
  }

  get get() {
    return this.#session.get;
  }

  get flash() {
    return this.#session.flash;
  }

  get unset() {
    this.isPending = true;
    return this.#session.unset;
  }

  get set() {
    this.isPending = true;
    return this.#session.set;
  }

  destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }

  commit() {
    this.isPending = false;
    return this.#sessionStorage.commitSession(this.#session);
  }
}
