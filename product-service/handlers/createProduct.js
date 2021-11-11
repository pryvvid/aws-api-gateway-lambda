import { Client } from "pg";
import validator from "validator";
import { dbOptions } from "../db/dbOptions";

export const createProduct = async (event) => {
  console.log(event);
  console.log(event.body);

  let { body } = event;
  if (typeof body === "string") body = JSON.parse(body);

  const { title, description, price, img, count } = body;

  if (
    !title ||
    !description ||
    !validator.isInt("" + price) ||
    !validator.isInt("" + count)
  )
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Bad request" }),
    };

  let client;

  try {
    client = new Client(dbOptions);
    await client.connect();

    await client.query("BEGIN");

    const { rows: responseRow } = await client.query(
      "insert into products(title, description, price, img) values($1, $2, $3, $4) returning id",
      [title, description, price, img]
    );

    const { id } = responseRow[0];

    console.log(id);

    const { rows: stock } = await client.query(
      "insert into stocks(product_id, count) values($1, $2) returning *",
      [id, count]
    );

    console.log(stock);

    const responseData = {
      id,
      title,
      description,
      price,
      img,
      count,
    };

    await client.query("COMMIT");

    return {
      statusCode: 201,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  } finally {
    if (client) client.end();
  }
};
