"use strict";
const AWS = require("aws-sdk");

module.exports.createCustomer = async (event) => {
  try {
    // Log the DynamoDB table name to ensure it's correct
    console.log("DynamoDB Table:", process.env.DYNAMODB_CUSTOMER_TABLE);

    const body = JSON.parse(Buffer.from(event.body, "base64").toString());
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
      Item: {
        primary_key: body.name,
        email: body.email,
      },
    };
    await dynamoDb.put(putParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Customer created successfully" }),
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
