const bcrypt = require("bcrypt");
const { isValidPassword } = require("./isValidPassword");

jest.mock("bcrypt");

describe("Given a isValidPassword function", () => {
  describe("When it is triggered", () => {
    test("Then should call bcrypt.compareSync", () => {
      const password = "1234";
      bcrypt.compareSync.mockImplementation();
      isValidPassword(password);

      expect(bcrypt.compareSync).toHaveBeenCalled();
    });
  });
});
