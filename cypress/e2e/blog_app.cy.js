describe("Note app Login", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Go",
      username: "Go4",
      password: "GoGo",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Login");
    // cy.contains("is logged in");
  });

  it("login fails", function () {
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("#login-button").click();
    cy.contains("Login");
    cy.contains("invalid");
  });

  it("login works", function () {
    cy.get("#username").type("Go4");
    cy.get("#password").type("GoGo");
    cy.get("#login-button").click();
    cy.contains("is logged in");
  });
});
describe("Note app Blogs", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.login("Go4", "GoGo");
  });

  it("Add blog", function () {
    cy.contains("Add More Blogs").click();
    cy.get("#title").type("Test blog");
    cy.get("#author").type("Test author");
    cy.get("#url").type("https://test.com");
    cy.get("#submit").click();
    cy.contains("Test blog");
  });

  it("Can like a blog", function () {
    cy.createBlog("Test blog", "Test author", "https://test.com");

    cy.contains("Show").click();
    cy.contains("0 likes");
    cy.contains("like").click();
    cy.contains("1 likes");
  });

  it("Can delete a blog", function () {
    cy.createBlog("Test blog", "Test author", "https://test.com");
    cy.contains("Show").click();
    cy.contains("Delete").click();
    cy.on("window:confirm", () => true);
    cy.contains("Test blog").should("not.exist");
  });

  it("is sorted by likes", function () {
    cy.createBlog("Test blogX", "Test authorX", "https://test.com");
    cy.get(".blog").eq(0).as("firstBlog");
    cy.get("@firstBlog").contains("Test blogX");
    cy.get("@firstBlog").contains("Show").click();
    cy.get("@firstBlog").contains("like").click();
    cy.get("@firstBlog").contains("like").click();
    cy.get("@firstBlog").contains("like").click();

    //wait for the blog to be created

    cy.reload();
    cy.createBlog("Test blog 2", "Test author 2", "https://test2.com");
    cy.get(".blog").eq(1).as("secondBlog");
    cy.get("@secondBlog").contains("Test blog 2");
    cy.get("@secondBlog").contains("Show").click();
    cy.get("@secondBlog").contains("like").click();
    cy.get("@secondBlog").contains("like").click();
    cy.get("@secondBlog").contains("like").click();
    cy.get("@secondBlog").contains("like").click();

    cy.reload();
    cy.get(".blog").eq(0).as("firstBlog");
    cy.get("@firstBlog").contains("Test blog 2");
  });
});
