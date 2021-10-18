const { transformQuery } = require("./transformQuery");

describe("Given a transformQuery function", () => {
  describe("When it is triggerd", () => {
    describe("And it is called with and object with two objects in query", () => {
      test("Then should return an array with the queries transformed", () => {
        const query = {
          name: "xavi",
          email: "xavi@mail.com",
        };

        const transformedQuery = transformQuery(query);

        expect(transformedQuery).toEqual([
          { name: { $regex: "xavi", $options: "i" } },
          { email: { $regex: "xavi@mail.com", $options: "i" } },
        ]);
      });
    });
  });
});
