export interface Candidate {
  id: number;
  name: string;
  progressStatus?: string;
  country: string;
  city: string;
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