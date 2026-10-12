import { baseUrl } from "./Config";

export function PostProductsFilter(filters) {
  return fetch(` ${baseUrl}https://abzzvx.pythonanywhere.com/products/filter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}