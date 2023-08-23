const request = require("supertest");
const { app } = require("../src/app.js");
const User = require("../src/db/models/user.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "mike",
    email: "mike@example.com",
    password: "mypasswd",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
    }]
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

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

