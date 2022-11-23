import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get all actors.
export const getAllActors = async (req, res) => {
  try {
    const allActors = await prisma.actor.findMany();
    res.json(allActors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get one actor by id.
export const getOneActor = async (req, res) => {
  try {
    const actor = await prisma.actor.findUnique({
      where: { actor_id: +req.params.id },
    });

    if (!actor) {
      return res.status(400).json({ message: "Actor not found." });
    }
    res.json(actor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Inserts an actor.
export const createActor = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newActor = await prisma.actor.create({
      data: {
        first_name,
        last_name,
      },
    });
    res.json(newActor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update an actor's data.
export const updateActor = async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const updateActor = await prisma.actor.update({
      where: { actor_id: +req.params.id },
      data: { first_name, last_name },
    });
    res.json(updateActor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete an actor.
export const deleteActor = async (req, res) => {
  try {
    await prisma.actor.delete({
      where: { actor_id: +req.params.id },
    });
    return resSend.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
