const mockMakePayment = jest.fn();
const mockMakeRefund = jest.fn();
const mockQueue = jest.fn();

jest.doMock("../src/paymentService.js", () => {
  return {
    makePayment: mockMakePayment,
    refundPayment: mockMakeRefund
  };
});

jest.doMock("../src/queueService.js", () => {
  return mockQueue;
});

const processPayments = require("../src/main");

beforeEach(() => {
  mockMakePayment.mockClear();
  mockMakeRefund.mockClear();
  mockQueue.mockClear();
});

test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
  mockQueue.mockReturnValue([]);
  processPayments();
  expect(mockMakePayment).not.toHaveBeenCalled();
  expect(mockMakeRefund).not.toHaveBeenCalled();
});

test("calls makePayment when next item in paymentQueue is positive", () => {
  mockQueue.mockReturnValue([2, 5]);
  processPayments();
  expect(mockMakePayment).toHaveBeenCalled();
});

test("calls refundPayment when next item in paymentQueue is negative", () => {
  mockQueue.mockReturnValue([-4]);
  processPayments();
  expect(mockMakeRefund).toHaveBeenCalled();
});
