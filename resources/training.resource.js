const { Router } = require("express");
const {
    createTraining,
    updateTraining,
    removeTraining,
    getTrainings,
    getTraining
} = require("../services/training.service");
const { hasAnyRole } = require("../config/authorization");

const TrainingResource = Router();

TrainingResource.get("/", hasAnyRole(["ADMIN", "STAFF"]), async function (request, response, next) {
    try {
        const trainings = await getTrainings();
        return response.status(200).json(trainings);
    } catch (err) {
        next(err);
    }
});

TrainingResource.get("/:id", hasAnyRole(["ADMIN", "STAFF"]), async function (request, response, next) {
    try {
        const training = await getTraining(request.params.id);
        return response.status(200).json(training);
    } catch (err) {
        next(err);
    }
});

TrainingResource.post("/", hasAnyRole(["ADMIN"]), async function (request, response, next) {
    try {
        const created = await createTraining(request.body);
        return response.status(201).json(created);
    } catch (err) {
        next(err);
    }
});

TrainingResource.put("/:id", hasAnyRole(["ADMIN"]), async function (request, response, next) {
    try {
        const updated = await updateTraining(request.params.id, request.body);
        return response.status(200).json(updated);
    } catch (err) {
        next(err);
    }
});

TrainingResource.delete("/:id", hasAnyRole(["ADMIN"]), async function (request, response, next) {
    try {
        const result = await removeTraining(request.params.id);
        return response.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = TrainingResource;
