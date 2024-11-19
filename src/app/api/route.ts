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

  const updateResult = await prisma.homework.deleteMany();

  return new Response(JSON.stringify(updateResult));
}
