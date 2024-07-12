import React from "react";

type SubmitButtonProps = {
  isPending: boolean;
  btnTitle: string;
  pendingTitle: string;
  className: string;
};

const SubmitButton = ({
  isPending,
  btnTitle,
  pendingTitle,
  className,
}: SubmitButtonProps) => {
  return (
    <button type="submit" className={className} disabled={isPending}>
      {isPending ? pendingTitle : btnTitle}
    </button>
  );
};

export default SubmitButton;
