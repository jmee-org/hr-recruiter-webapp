// This is a placeholder for actual API calls
// Mock data for step options
const mockStepOptions = ["Option 1", "Option 2", "Option 3"];

const jobStatusOptions = ["All", "Open", "Closed", "In Progress"];

const candidatesData = [
  {
    id: 101,
    name: "John Doe",
    progressStatus: "3/4",
    country: "USA",
    city: "New York",
  },
  {
    id: 102,
    name: "Jane Smith",
    progressStatus: "2/4",
    country: "Canada",
    city: "Toronto",
  },
  { id: 201, name: "Alice Johnson", country: "UK", city: "London" },
  { id: 202, name: "Bob Williams", country: "Australia", city: "Sydney" },
];

const mockProgressDetails = {
  12: {
    status: "Completed",
    feedback: "Good performance",
    scheduledMeeting: "2024-03-15T14:30:00",
    participants: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Willi"],
  },
  13: {
    status: "In Progress",
    feedback: "",
    scheduledMeeting: "2024-03-15T14:30:00",
    participants: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Willi"],
  },
};

// Mock data for candidate progress
const mockCandidateProgress = {
  101: [
    {
      stepName: "Interview 1",
      status: "Completed",
      progressId: 12,
      feedback: "Good performance",
    },
    {
      stepName: "Technical Test",
      status: "In Progress",
      progressId: 13,
      feedback: "",
    },
  ],
  102: [
    {
      stepName: "Interview 1",
      status: "Completed",
      progressId: 22,
      feedback: "Excellent performance",
    },
    {
      stepName: "Technical Test",
      status: "Completed",
      progressId: 23,
      feedback: "Passed with flying colors",
    },
  ],
};

// Mock data for job listings
const mockJobListings = [
  { id: 1, title: "Software Engineer", status: "Open", candidateCount: 2 },
  { id: 2, title: "Data Analyst", status: "Closed", candidateCount: 2 },
  { id: 3, title: "Data ssss", status: "Closed", candidateCount: 2 },
];

// Mock data for job details
const mockJobDetails = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Join our dynamic software engineering team...",
    status: "Open",
    candidates: [
      { id: 101, name: "John Doe", progressStatus: "3/4" },
      { id: 102, name: "Jane Smith", progressStatus: "2/4" },
    ],
  },
  {
    id: 2,
    title: "Data Analyst",
    description: "We are looking for a skilled data analyst...",
    status: "Closed",
    candidates: [
      { id: 201, name: "Alice Johnson" },
      { id: 202, name: "Bob Williams" },
    ],
  },
];

// Mock API function to get job listings
export const getJobListings = async () => {
  return mockJobListings;

};

// Mock API function to get job details
export const getJobDetails = async (jobId) => {
  // const response = await axios.get(`/api/jobListings/${jobId}`);
  // return response.data;

  // For now, find the job details from mock data
  return mockJobDetails.find((job) => job.id === parseInt(jobId, 10));
};

export const getCandidateProgress = async (candidateId) => {
  // const response = await axios.get(`/api/candidates/${candidateId}/progress`);
  // return response.data;

  // For now, return the mock data
  return mockCandidateProgress[candidateId] || [];
};

export const getStepOptions = async () => {
  // const response = await axios.get('/api/stepOptions');
  // return response.data;

  // For now, return the mock data
  return mockStepOptions;
};

export const getProgressDetails = async (progressId) => {
  // const response = await axios.get('/api/progressDetail/${progressId}');
  // return response.data;

  // For now, return the mock data
  return mockProgressDetails[progressId] || null;
};

export const getJobStatusOptions = async () => {
  // const response = await axios.get('/api/jobStatus');
  // return response.data;

  // For now, return the mock data
  return jobStatusOptions;
};

export const getAllCandidates = async (filters) => {
  // // Mock API call to retrieve candidates with filters
  // const response = await fetch('/api/candidates', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(filters),
  // });

  // const data = await response.json();
  // return data;

  const { name, surname, country, city } = filters;

  // Apply filters to the mock data
  const filteredCandidates = candidatesData.filter(
    (candidate) =>
      (!name || candidate.name.toLowerCase().includes(name.toLowerCase())) &&
      (!surname ||
        candidate.name.toLowerCase().includes(surname.toLowerCase())) &&
      (!country || candidate.country.toLowerCase() === country.toLowerCase()) &&
      (!city || candidate.city.toLowerCase() === city.toLowerCase())
  );

  return filteredCandidates;
};











// // INIT real call
// import axiosInstance from '../core/axiosConfig';

// // Mock data for step options
// const mockStepOptions = ["Option 1", "Option 2", "Option 3"];

// // Mock API function to get job listings
// export const getJobListings = async () => {
//   try {
//     const response = await axiosInstance.get('/api/job/all');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching job listings:', error);
//     throw error; // Handle the error in the component that calls this function
//   }
// };

// // Mock API function to get job details
// export const getJobDetails = async (jobId) => {
//   try {
//     const response = await axiosInstance.get(`/api/job/${jobId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching job details for jobId ${jobId}:`, error);
//     throw error;
//   }
// };

// export const getCandidateProgress = async (candidateId) => {
//   try {
//     const response = await axiosInstance.get(`/api/candidates/${candidateId}/progress`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching candidate progress for candidateId ${candidateId}:`, error);
//     throw error;
//   }
// };

// export const getStepOptions = async () => {
//   try {
//     const response = await axiosInstance.get('/api/stepOptions');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching step options:', error);
//     throw error;
//   }
// };

// export const getProgressDetails = async (progressId) => {
//   try {
//     const response = await axiosInstance.get(`/api/progressDetail/${progressId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching progress details for progressId ${progressId}:`, error);
//     throw error;
//   }
// };

// // export const getJobStatusOptions = async () => {
// //   try {
// //     const response = await axiosInstance.get('/api/jobStatus');
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching job status options:', error);
// //     throw error;
// //   }
// // };

// export const getAllCandidates = async (filters) => {
//   try {
//     const response = await axiosInstance.post('/api/candidates', filters);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all candidates:', error);
//     throw error;
//   }
// };
