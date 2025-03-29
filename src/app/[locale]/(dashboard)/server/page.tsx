import authOptions from "@/libs/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: 'My Todo App - Organize Your Tasks',
  description: 'จัดการ task ของคุณแบบง่ายๆ',
};

export default async function Todo() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-[1000px] px-4">
        {JSON.stringify(session)}
      </div>
    </div>
  );
}
