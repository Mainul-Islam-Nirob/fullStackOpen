import React from "react";
import { CoursePart } from "../types";

interface PartProps {
    coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
    if (coursePart.type === "normal") {
        return (
            <>
                <h3>
                    <span>Course name --</span> <span>{coursePart.name}</span>
                </h3>
                <div>
                    <span>Number of exercises --</span>{" "}
                    <span>{coursePart.exerciseCount}</span>
                </div>
                <div>
                    <span>Course description --</span> <span> {coursePart.description}</span>
                </div>
            </>
        );
    } else if (coursePart.type === "groupProject") {
        return (
            <>
                <h3>
                    <span>Course name --</span> <span>{coursePart.name}</span>
                </h3>
                <div>
                    <span>Number of exercises --</span>{" "}
                    <span>{coursePart.exerciseCount}</span>
                </div>
                <div>
                    <span>Number of group projects --</span>{" "}
                    <span> {coursePart.groupProjectCount}</span>
                </div>
            </>
        );
    } else if (coursePart.type === "submission") {
        return (
            <>
                <h3>
                    <span>Course name --</span> <span>{coursePart.name}</span>
                </h3>
                <div>
                    <span>Number of exercises --</span>{" "}
                    <span>{coursePart.exerciseCount}</span>
                </div>
                <div>
                    <span>Course description --</span> <span> {coursePart.description}</span>
                </div>
                <div>
                    <span>Exercise submission link --</span>{" "}
                    <span> {coursePart.exerciseSubmissionLink}</span>
                </div>
            </>
        );
    } else if (coursePart.type === "special") {
        return (
            <>
                <h3>
                    <span>Course name --</span> <span>{coursePart.name}</span>
                </h3>
                <div>
                    <span>Number of exercises --</span>{" "}
                    <span>{coursePart.exerciseCount}</span>
                </div>
                <div>
                    <span>Course description --</span> <span> {coursePart.description}</span>
                </div>
                <div>
                    <span>Requirments --</span> <span> {coursePart.requirements.join()}</span>
                </div>
            </>
        );
    }
    return null;
};

export default Part;