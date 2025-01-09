import prisma from "@/app/lib/prismadb";

export default async function getUserById(rentUserIds: string) {
  try {
    const ids = rentUserIds.split(",").map((id) => id.trim());

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (!users) {
      return null;
    }

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
