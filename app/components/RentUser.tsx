import React from "react";

interface RentUserProps {
  rentUser: string;
}

const RentUser = ({ rentUser }: RentUserProps) => {
  return <div>{rentUser}</div>;
};

export default RentUser;
