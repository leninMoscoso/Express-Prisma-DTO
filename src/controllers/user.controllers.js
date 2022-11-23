import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getOneUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: +req.params.id },
  });
  res.json(user);
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userUpdate = await prisma.user.update({
      where: { id: +req.params.id },
      data: { name, email },
    });
    res.json(userUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params
  await prisma.user.delete({
    where: {id: +id}
  })
  res.json({ message: "User deleted"})
}
