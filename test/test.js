"use strict";

const AWS = require("aws-sdk");
const { createCustomer } = require("../createCustomer");

jest.mock("aws-sdk", () => {
  const DocumentClient = {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => DocumentClient),
    },
  };
});

describe("createCustomer", () => {
  const mockTableName = "http-api-9-customerTable-dev";
  const event = {
    body: Buffer.from(
      JSON.stringify({ name: "John Doe", email: "john@example.com" })
    ).toString("base64"),
  };

  beforeEach(() => {
    process.env.DYNAMODB_CUSTOMER_TABLE = mockTableName;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a customer successfully and return a 201 response", async () => {
    AWS.DynamoDB.DocumentClient().promise.mockResolvedValue({});

    const result = await createCustomer(event);

    expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalledTimes(2);
    expect(AWS.DynamoDB.DocumentClient().put).toHaveBeenCalledWith({
      TableName: mockTableName,
      Item: {
        primary_key: "John Doe",
        email: "john@example.com",
      },
    });
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body).message).toBe(
      "Customer created successfully"
    );
  });

  it("should handle errors and return a 500 response", async () => {
    const errorMessage = "DynamoDB error";
    AWS.DynamoDB.DocumentClient().promise.mockRejectedValue(
      new Error(errorMessage)
    );

    const result = await createCustomer(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe("Internal Server Error");
    expect(JSON.parse(result.body).error).toBe(errorMessage);
  });
});
