import { Suspense } from "react";
import { Answer } from "./_component/answer";

export default async function Page({ params }: { params: { typeId: string } }) {
  return (
    <Suspense fallback={null}>
      <Answer questionId={params.typeId} />
    </Suspense>
  );
}
