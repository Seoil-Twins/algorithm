import React from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  btnTitle: string;
  pendingTitle: string;
  className: string;
};

const SubmitButton = ({
  btnTitle,
  pendingTitle,
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className}>
      {pending ? pendingTitle : btnTitle}
    </button>
  );
};

export default SubmitButton;
