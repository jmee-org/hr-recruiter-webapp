export interface Candidate {
    id: string;
    name: string;
    progressStatus: string;
    // Add other properties as needed
  }

  export interface Job {
    id: number;
    title: string;
    description: string;
    status: string;
    candidates: Candidate[];
    candidateCount: number;
  }

  export interface ProgressStep {
    stepName: string;
    status: string;
    feedback: string;
    progressId: string;
  }
  