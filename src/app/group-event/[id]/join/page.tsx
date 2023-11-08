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
      <GroupEventJoinForm id={id} />
    </main>
  );
}
