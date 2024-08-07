export const convertProdDataToMeds = (newMedsList) => {
  let convertProd = [];
  newMedsList.forEach((prod) => {
    convertProd.push(
      createData(
        prod.title,
        prod.price,
        prod.stock,
        "Capsule",
        "anytime",
        prod.images[0]
      )
    );
  });
  return convertProd;
};
