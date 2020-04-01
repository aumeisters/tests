const { get } = require("axios");
const a = [-0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1];
const headers = { "Content-Type": "application/json" };
a.forEach(x => {
  (async () => {
    const { data: result1 } = await get(`http://kodaktor.ru/api2/there/${x}`, {
      headers
    });
    const {
      data: result1minus1
    } = await get(`http://kodaktor.ru/api2/there/${x - 1}`, { headers });
    const {
      data: result1plus1
    } = await get(`http://kodaktor.ru/api2/there/${x + 1}`, { headers });
    (async () => {
      const URL2 = `http://kodaktor.ru/api2/andba/${result1}`;
      const { data: result2 } = await get(URL2, { headers });
      if (x > -0.7) {
        console.log(x, result2, (result1 - 12 - result1minus1) / 72);
      } else {
        console.log(x, result2, (result1 - 12 - result1plus1) / 72);
      }
    })();
  })();
});
