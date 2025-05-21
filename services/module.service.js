const { ClientError, NotFoundError } = require("../config/error");
const prisma = require("../config/prisma");
const moduleSchema = require("../utils/validators/module.validator");

function validateModule(data) {
    const { error, value } = moduleSchema.validate(data, { stripUnknown: true });
    if (error) throw new ClientError(error.message);
    return value;
}

async function createModule(data) {
    const validatedData = validateModule(data);
    try {
        const existing = await prisma.modules.findUnique({ where: { name: validatedData.name } });
        if (existing) {
            throw new ClientError("Un module avec ce nom existe déjà.");
        }
        return await prisma.modules.create({ data: validatedData });
    } catch (err) {
        throw new ClientError("Échec de l'enregistrement du module.");
    }
}

async function updateModule(moduleId, data) {
    const validatedData = validateModule(data);
    try {
        return await prisma.modules.update({
            where: { id: moduleId },
            data: validatedData
        });
    } catch (err) {
        throw new NotFoundError("Module introuvable.");
    }
}

async function removeModule(moduleId) {
    try {
        return await prisma.modules.delete({ where: { id: moduleId } });
    } catch (err) {
        throw new NotFoundError("Module introuvable.");
    }
}

async function getModules() {
    return prisma.modules.findMany({ orderBy: { name: "asc" } });
}

async function getModule(moduleId) {
    const module = await prisma.modules.findUnique({ where: { id: moduleId } });
    if (!module) throw new NotFoundError("Module introuvable.");
    return module;
}

module.exports = {
    createModule,
    updateModule,
    removeModule,
    getModules,
    getModule
};
