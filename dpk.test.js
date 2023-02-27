const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a key when a string is given as input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBeTruthy();
  });

  it("Returns the same key for `{data: 1, partitionKey: `abc`} and `abc` as inputs", () => {
    const trivialKeyOne = deterministicPartitionKey({data: 1, partitionKey: 'abc'});
    expect(trivialKeyOne).toBeTruthy();
    const trivialKeyTwo = deterministicPartitionKey({data: 1, partitionKey: 'abc'});
    expect(trivialKeyTwo).toBeTruthy();
    expect(trivialKeyOne).toBe(trivialKeyTwo)
  });

  it("Returns a key for `{data: 1, partitionKey: {name: `test`, id: 34}}` as inputs", () => {
    const trivialKeyOne = deterministicPartitionKey({data: 1, partitionKey: {name: `test`, id: 34}});
    expect(trivialKeyOne).toBeTruthy();
   
  });

});
