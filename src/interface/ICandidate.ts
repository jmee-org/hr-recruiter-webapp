export interface Candidate {
    id: string;
    name: string;
    progressStatus: string;
    // Add other properties as needed
  }

  export interface Job {
    title: string;
    description: string;
    status: string;
    candidates: Candidate[];
  }

  export interface ProgressStep {
    stepName: string;
    status: string;
    feedback: string;
    progressId: string;
  }
  