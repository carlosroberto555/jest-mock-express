import { Router } from "express";

import MockRequest from "./request";
import MockResponse from "./response";

type Method =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE";

class MockRouter {
  req: MockRequest;
  res: MockResponse;

  constructor(private router: Router) {
    this.req = new MockRequest();
    this.res = new MockResponse();
  }

  headers(headers: Record<string, string>) {
    for (const key in headers) {
      this.header(key, headers[key]);
    }

    return this;
  }

  header(key: string, value: string) {
    this.req.headers[key.toLowerCase()] = value;
    return this;
  }

  param(key: string, value: string) {
    this.req.params[key.toLowerCase()] = value;
    return this;
  }

  params(params: Record<string, string>) {
    for (const key in params) {
      this.param(key, params[key]);
    }

    return this;
  }

  query(key: string, value: string) {
    if (typeof key === "string") {
      this.req.query[key] = value;
    } else {
      this.req.query = key;
    }

    return this;
  }

  body(body: Record<string, string>) {
    this.req.body = body;
    return this;
  }

  post(url: string) {
    return this.request("post", url);
  }

  async request(method: Method, url: string) {
    this.req.method = method;

    try {
      for (const match of this.matches(method, url, this.router.stack)) {
        let next = false;
        await match.handle(this.req, this.res, () => (next = true));
        if (!next) break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  *matches(method: Method, url: string, stack: Router["stack"]) {
    const mtd = method.toLowerCase();

    for (const layer of stack) {
      const { route } = layer;

      if (route.methods[mtd] && layer.regexp.test(url)) {
        // Exec middlewares
        for (const layer of route.stack) {
          if (layer.method === mtd) {
            yield layer;
          }
        }
      }
    }
  }

  mockClear() {
    this.req.mockClear();
    this.res.mockClear();
  }
}

export default MockRouter;
