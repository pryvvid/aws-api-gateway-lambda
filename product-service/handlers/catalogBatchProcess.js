export const catalogBatchProcess = async (event) => {
  const data = event.Records.map(({ body }) => body);

  console.log(data);
};
