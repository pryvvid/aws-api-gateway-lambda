import { Client } from "pg";
import { dbOptions } from "../db/dbOptions";

export const addProductToDb = async (product) => {
  if (typeof product === "string") product = JSON.parse(product);

  console.log('Product to add', product)

  const { title, description, price, img, count } = product;

  const client = new Client(dbOptions);;

  try {
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

    await client.query("COMMIT");

    return {
      id,
      title,
      description,
      price,
      img,
      count,
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