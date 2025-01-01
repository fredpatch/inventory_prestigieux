import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const generate_username = async (email) => {
  let username = email.split("@")[0];

  // check if username already exists
  const existingUsername = await prisma.user.findFirst({
    where: { personal_info: { username: username } },
  });

  // if username already exists, append a number to the end of the username
  if (existingUsername) {
    username += `_${Date.now().toString().slice(-3)}_${Math.floor(
      Math.random() * 1000
    )}`;
  }

  return username;
};
