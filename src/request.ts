export default class MockRequest {
  method: string = "get";
  headers: Record<string, string>;
  params: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, string>;
  header: jest.Mock<any, any>;

  constructor() {
    this.headers = {};
    this.params = {};
    this.query = {};
    this.body = {};
    this.header = jest.fn().mockReturnValue("RETURNED_HEADER");
  }

  mockClear() {
    this.headers = {};
    this.params = {};
    this.query = {};
    this.body = {};
    this.header.mockClear();
  }
}
