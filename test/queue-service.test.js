const queueService = require("../src/queueService");
const math = require("mathjs");

beforeEach(() => {
  jest.resetAllMocks();
});

test("returns array of two 2s", () => {
  math.randomInt = jest.fn(() => 2);
  expect(queueService()).toEqual([2, 2]);
});

test("returns array of ten 10s", () => {
  math.randomInt = jest.fn(() => 10);
  expect(queueService()).toHaveLength(10);
});

test("returns array of one 1", () => {
  math.randomInt = jest.fn(() => 1);
  expect(queueService()).toEqual([1]);
});

test("returns array of ten -20s", () => {
  math.randomInt = jest
    .fn()
    .mockReturnValueOnce(10)
    .mockReturnValue(-20);
  expect(queueService()).toEqual([
    -20,
    -20,
    -20,
    -20,
    -20,
    -20,
    -20,
    -20,
    -20,
    -20
  ]);
});
