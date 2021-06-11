export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
export interface CourseNormalAndSubmission extends CoursePartBase {
    description: string;
}
export interface CourseNormalPart extends CourseNormalAndSubmission {
    type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseNormalAndSubmission {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseBackendPart extends CourseNormalAndSubmission {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseBackendPart;