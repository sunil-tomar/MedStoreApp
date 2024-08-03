export const getAPICall = async (url) => {
  return await fetch(url)
    .then((res) => {
      if (res.status != "200") throw new Error(res);
      return res.json();
    })
    .catch((error) => console.error(error));
};
