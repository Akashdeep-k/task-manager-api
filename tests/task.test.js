const request = require("supertest");
const Task = require("../src/db/models/task.js");
const { app } = require("../src/app.js");

const { setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree } = require("./fixtures/db.js");

beforeEach(setupDatabase);

test("Should create a new task", async () => {
    const response = await request(app).post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Adding a task for jest framework"
        })
        .expect(200);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
})

test("Should get the tasks of user", async () => {
    const response = await request(app).get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .expect(200);

    expect(response.body.length).toEqual(2);
})

test("Should not delete other users tesks", async () => {
    const response = await request(app).delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})