class MockResponse {
  status: jest.Mock<any, any>;
  send: jest.Mock<any, any>;
  json: jest.Mock<any, any>;
  end: jest.Mock<any, any>;

  constructor() {
    this.status = jest.fn().mockReturnThis();
    this.send = jest.fn().mockReturnThis();
    this.json = jest.fn().mockReturnThis();
    this.end = jest.fn();
  }

  mockClear() {
    this.status.mockClear();
    this.send.mockClear();
    this.json.mockClear();
    this.end.mockClear();
  }
}

export default MockResponse;
