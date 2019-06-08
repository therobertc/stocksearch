export const MODEL_NAME = "stocks";

export const StockSchema = {
  name: MODEL_NAME,
  primary_key: "symbol",
  properties: {
    symbol: "string",
    name: "string"
  }
};
