import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";
import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  const parts = courseParts.map((coursePart) => {
    switch (coursePart.type){
      case "normal":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "groupProject":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "submission":
        return <Part key={coursePart.name} coursePart={coursePart} />;
      case "special":
        return <Part key={coursePart.name} coursePart={coursePart} />
      default:
        return assertNever(coursePart);
    }
  })

  return <React.Fragment>{parts}</React.Fragment>;
};
export default Content;