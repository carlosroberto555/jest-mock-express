# Express Mock Jest

This library simulates a http request to load express modules without start the application, working with Jest.

## MockRouter

This mock receives the express router exported module. The MockRouter object has all http methods (get, post, put, delete), you can execute requests without start the entire application.

```typescript
import { MockRouter } from "@carlosrpj/jest-mock-express";
import router from "../../src/routes/api";

const mockRouter = new MockRouter(router);

it("should return a user list", async () => {
  await mockRouter.get("/users");
  expect(mockRouter.res.send).toBeCalledWith([
    { name: "Foo", email: "test@example.com" },
  ]);
});
```

### MockRouter.headers

You can define your request headers with headers function, simulating a http request. This function replace all actual headers.

```typescript
await mockRouter
  .headers({
    Authorization: "Bearer TOKEN",
    "Content-Type": "application/json",
  })
  .get("/users");
```

### MockRouter.header

Adding a header to request.

```typescript
await mockRouter.header("Authorization", "Bearer TOKEN").get("/users");
```

### MockRouter.params

Adding many params. This function replace all actual params.

```typescript
await mockRouter.params({ id: 1 }).get("/users/1");
```

### MockRouter.param

Adding a param to request.

```typescript
await mockRouter.param("id", 1).get("/users/1");
```

### MockRouter.query

Adding a query to request.  
You can use a object with many queries, or a single key/value.

```typescript
// many queries
await mockRouter.query({ id: 1 }).get("/users/1");
// single key/value
await mockRouter.query("name", "foo").get("/users/1");
```

### MockRouter.body

Adding a body to request.

```typescript
await mockRouter
  .body({ name: "Foo", email: "test@example.com" })
  .post("/users");
```
