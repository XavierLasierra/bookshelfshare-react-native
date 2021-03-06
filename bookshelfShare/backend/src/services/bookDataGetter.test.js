const axios = require("axios");
const {
  getBooksDataFromArray,
  getBooksDataFromList,
} = require("./bookDataGetter");
const Book = require("../classes/book.class");
const googleBooksMock = require("../mocks/googleBooks.mock");
const bookListMock = require("../mocks/bookList.mock");

jest.mock("axios");

describe("Given a getBooksDataFromArray function", () => {
  describe("When it is triggered", () => {
    describe("And it is called with an empty array", () => {
      test("Then should return an empty array", async () => {
        const bookData = await getBooksDataFromArray([]);

        expect(bookData).toEqual([]);
      });
    });

    describe("And it is called with an array containing isbn", () => {
      describe("And the promises are resolved", () => {
        describe("And the data is resolved with is not correct", () => {
          test("Then should return an array contaning the books default infomation", async () => {
            axios.get.mockResolvedValue({ data: {}, status: 200 });

            const bookData = await getBooksDataFromArray(["1", "2", "3"]);

            expect(bookData).toEqual([
              new Book({ volumeInfo: {} }),
              new Book({ volumeInfo: {} }),
              new Book({ volumeInfo: {} }),
            ]);
          });
        });

        describe("And the data is resolved with is correct", () => {
          test("Then should return an array contaning the books infomation", async () => {
            axios.get.mockResolvedValue({ data: googleBooksMock, status: 200 });

            const bookData = await getBooksDataFromArray(["1", "2", "3"]);

            expect(bookData).toEqual([
              new Book(googleBooksMock.items[0]),
              new Book(googleBooksMock.items[0]),
              new Book(googleBooksMock.items[0]),
            ]);
          });
        });
      });
      describe("And the promises are rejected", () => {
        test("Then should return an error", async () => {
          axios.get.mockRejectedValue(new Error());

          const bookData = await getBooksDataFromArray(["1", "2", "3"]);

          expect(bookData.message).not.toBe(null);
        });
      });
    });
  });
});

describe("Given a getBooksDataFromList function", () => {
  describe("When it is triggered", () => {
    describe("And axios is resolved", () => {
      test("Then should return an object with a property bookData", async () => {
        axios.get.mockResolvedValue({ data: {}, status: 200 });
        const listData = await getBooksDataFromList(bookListMock);

        expect(listData.books[0].bookData).not.toBe(undefined);
      });
    });

    describe("And axios is rejected", () => {
      test("Then should return an error", async () => {
        axios.get.mockRejectedValue(new Error());

        const bookData = await getBooksDataFromList(bookListMock);

        expect(bookData.message).not.toBe(null);
      });
    });
  });
});
