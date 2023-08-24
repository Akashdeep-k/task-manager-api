const request = require("supertest");
const { app } = require("../src/app.js");
const User = require("../src/db/models/user.js");

const { setupDatabase, userOne, userOneId } = require("./fixtures/db.js");

beforeEach(setupDatabase);

test("Should sign up a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "akashdeep",
        email: "iamakashkataria18@gmail.com",
        password: "mypasswd777"
    }).expect(201);

    const user = await User.findOne({ email: "iamakashkataria18@gmail.com" });
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: user.name,
            email: user.email
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe("mypassed777");
});

test("Should login an existing user", async () => {
    const response = await request(app).post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findOne({
        email: userOne.email
    });
    expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should not login a non-existant user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password + "dummy_value"
    }).expect(404);
});

test("Should get the profile for authenticated user", async () => {
    await request(app).get("/users/me")
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);
});

test("Should not get the profile of unauthenticated user", async () => {
    await request(app).get("/users/me")
        .send()
        .expect(401);
});

test("Should delete the account of an authenticated user", async () => {
    await request(app).delete("/users/me")
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete the account of an unauthenticated user", async () => {
    await request(app).delete("/users/me")
        .send()
        .expect(401);
});

test("Should upload an avatar for an user", async () => {
    await request(app).post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "./fixtures/flower.jpg")
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
    await request(app).patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({ name: "john" })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual("john");
});

test("Should not update invalid user fields", async () => {
    await request(app).patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({ location: "Patiala" })
        .expect(400);
});