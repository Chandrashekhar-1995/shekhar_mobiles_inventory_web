import React, { useState } from "react"
import PasswordResetRequestForm from "./PasswordResetRequestForm";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
    const [verifiedUserId, setVerifiedUserId] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!verifiedUserId ? (
        <PasswordResetRequestForm onVerified={setVerifiedUserId} />
      ) : (
        <ResetPasswordForm userId={verifiedUserId} />
      )}
    </div>
  )
}

export default ResetPassword;