"use strict";
const AWS = require("aws-sdk");

module.exports.getCustomers = async (event) => {
  try {
    // Log the DynamoDB table name to ensure it's correct
    console.log("DynamoDB Table:", process.env.DYNAMODB_CUSTOMER_TABLE);

    const scanParams = {
      TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    };

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan(scanParams).promise();

    if (result.Count === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No customers found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: result.Count,
        items: result.Items.map((customer) => {
          return {
            name: customer.primary_key,
            email: customer.email,
          };
        }),
      }),
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
