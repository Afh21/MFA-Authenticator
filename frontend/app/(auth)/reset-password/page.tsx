import React, { Suspense } from "react";
import ResetPassword from "./_resetpassword";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}

export default Page;
