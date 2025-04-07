import { Suspense } from "react";
import ConfirmAccount from "./_confirmaccount";

export default function Page({}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmAccount />
      </Suspense>
    </>
  );
}
