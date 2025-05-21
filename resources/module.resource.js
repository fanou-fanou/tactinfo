const { Router } = require("express");
const {
    createModule,
    updateModule,
    removeModule,
    getModules,
    getModule
} = require("../services/module.service");

const ModuleResource = Router();

ModuleResource.get("/", async function (request, response, next) {
    try {
        const modules = await getModules();
        return response.status(200).json(modules);
    } catch (error) {
        next(error);
    }
});

ModuleResource.get("/:id", async function (request, response, next) {
    try {
        const module = await getModule(request.params.id);
        return response.status(200).json(module);
    } catch (error) {
        next(error);
    }
});

ModuleResource.post("/", async function (request, response, next) {
    try {
        const created = await createModule(request.body);
        return response.status(201).json(created);
    } catch (error) {
        next(error);
    }
});

ModuleResource.put("/:id", async function (request, response, next) {
    try {
        const updated = await updateModule(request.params.id, request.body);
        return response.status(200).json(updated);
    } catch (error) {
        next(error);
    }
});

ModuleResource.delete("/:id", async function (request, response, next) {
    try {
        const removed = await removeModule(request.params.id);
        return response.status(200).json(removed);
    } catch (error) {
        next(error);
    }
});

module.exports = ModuleResource;
