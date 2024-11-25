import prisma from "@/lib/prisma";

export async function GET() {
  // const types = await prisma.profileTypes.createMany({
  //   data: [{ name: "student" }, { name: "teacher" }],
  // });

  // const profileTypeId = await prisma.profileTypes.findUnique({
  //   where: {
  //     name: "teacher",
  //   },
  // });

  // const updateResult = await prisma.tutorStudent.updateMany({
  //   where: { isConfirmed: true },
  //   data: { isConfirmed: false },
  // });

  // await prisma.profileTypes.create({
  //   data: { name: "teacher" },
  // });

  // const users = await prisma.user.findMany();

  const users = await prisma.user.findMany();

  // for (const user of users) {
  //   const referralCode = uuidv4(); // Генерация уникального UUID

  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: { referralCode },
  //   });
  // }

  // const updateResult = await prisma.homework.deleteMany();

  return new Response(JSON.stringify({ users }));
}
