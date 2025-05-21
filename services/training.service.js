const { ClientError, NotFoundError } = require("../config/error");
const prisma = require("../config/prisma");
const trainingSchema = require("../utils/validators/training.validator");

function validateTraining(data) {
    const { error, value } = trainingSchema.validate(data, { stripUnknown: true });
    if (error) throw new ClientError(error.message);
    return value;
}

async function createTraining(data) {
    const validatedData = validateTraining(data);
    try {
        const existing = await prisma.trainings.findUnique({
            where: {
                level: validatedData.level
            }
        })
        if (existing) {
            throw new ClientError(`Un cursus avec le nom ${existing.level} existe déjà.`);
        }
        return await prisma.trainings.create({ data: validatedData });
    } catch (err) {
        throw new ClientError("Échec de l'enregistrement de la formation.");
    }
}

async function updateTraining(trainingId, data) {
    const validatedData = validateTraining(data);
    try {
        return await prisma.trainings.update({
            where: { id: trainingId },
            data: validatedData
        });
    } catch (err) {
        throw new NotFoundError("Formation introuvable.");
    }
}

async function removeTraining(trainingId) {
    try {
        return await prisma.trainings.delete({ where: { id: trainingId } });
    } catch (err) {
        throw new NotFoundError("Formation introuvable.");
    }
}

async function getTrainings() {
    return prisma.trainings.findMany({ orderBy: { level: "asc" } });
}

async function getTraining(trainingId) {
    const training = await prisma.trainings.findUnique({ where: { id: trainingId } });
    if (!training) throw new NotFoundError("Formation introuvable.");
    return training;
}

module.exports = {
    createTraining,
    updateTraining,
    removeTraining,
    getTrainings,
    getTraining
};
