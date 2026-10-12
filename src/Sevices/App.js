import { baseUrl } from "./Config";

export const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const toQuery = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};

export function getCategories(params) {
  return fetch(`${baseUrl}/categories/${toQuery(params)}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}

export function getBrands(params) {
  return fetch(`${baseUrl}/brands/${toQuery(params)}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}

export function getProducts(params) {
  return fetch(`${baseUrl}/products/${toQuery(params)}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}

export function getProductById(id) {
  return fetch(`${baseUrl}/products/${id}/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}