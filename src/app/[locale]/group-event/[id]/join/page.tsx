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
    <div className="m-auto max-w-400">
      <h1 className="text-xl text-center">Join the group event</h1>
      <GroupEventJoinForm id={id} />
    </div>
  );
}
