import React, { FC } from "react";

type Props = {
  email: string;
  name: string;
};

export const Me: FC<Props> = ({ email, name }) => {
  return (
    <>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </>
  );
};
