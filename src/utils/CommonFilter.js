export const FILTER_PROD_NAME_SEARCH = (prod, productNameSearch) =>
  productNameSearch === ""
    ? prod
    : prod.name.toLowerCase().includes(productNameSearch.toLowerCase());
