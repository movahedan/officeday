import { GroupEventJoinForm } from "@/libs/ui/forms/GroupEventJoinForm";

export type GroupEventJoinPageProps = {
  params: {
    id: string;
  };
};

export default function GroupEventJoinPage({
  params: { id },
}: GroupEventJoinPageProps) {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <div className="m-auto max-w-400">
        <h1 className="text-xl text-center">Join the office day</h1>
        <GroupEventJoinForm id={id} />
      </div>
    </main>
  );
}
