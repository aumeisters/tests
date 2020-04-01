require("should");
const { get } = require("axios");
const a = [-0.1, -0.2, 1, 2, -1, -2];
const headers = { "Content-Type": "application/json" };
a.forEach(x => {
  describe("testing values from first API", () => {
    it(`by sending ${x} to the first API recieved value is calculated by   (${x}*72+12) +  value from sending ${x -
      1}`, () => {});
    (async () => {
      const { data: result1 } = await get(
        `http://kodaktor.ru/api2/there/${x}`,
        { headers }
      );
      const {
        data: result1minus1
      } = await get(`http://kodaktor.ru/api2/there/${x - 1}`, { headers });
      result1.should.equal(x * 72 + 12 + result1minus1);
    })();
  });
  describe("value from first API (result1) is sent to the second API", () => {
    it(`result value from second API (result2) is calculated by  (result1 from sending ${x} to the first API - 12 - (result1 from sending ${x -
      1})) all divided by 72), but if ${x} less than -0.7 it's calculated by (result1 from sending ${x} to the first API - 12 - (result1 from sending ${x +
      1})) all divided by 72)`, () => {
      (async () => {
        const {
          data: result1
        } = await get(`http://kodaktor.ru/api2/there/${x}`, { headers });
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
            result2.should.equal((result1 - 12 - result1minus1) / 72);
          } else {
            result2.should.equal((result1 - 12 - result1plus1) / 72);
          }
        })();
      })();
    });
  });
});
