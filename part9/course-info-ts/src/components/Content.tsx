import React from "react";
import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
 return (
    <>
      {courseParts.map((coursePart) => {
        return(<p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>)
      })}
    </>
  )};
export default Content;