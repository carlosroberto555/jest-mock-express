export default class MockRequest {
  method: string = null;
  headers: {};
  params: {};
  query: {};
  body: {};
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
