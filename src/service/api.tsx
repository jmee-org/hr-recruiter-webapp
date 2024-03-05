// This is a placeholder for actual API calls
// Import any HTTP library you are using (e.g., axios)
// Mock data for step options
const mockStepOptions = [
  "Option 1",
  "Option 2",
  "Option 3",
  // Add more options as needed
];

const mockProgressDetails = {
  12: { status: 'Completed', feedback: 'Good performance', scheduledMeeting: '2024-03-15T14:30:00', participants: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Willi']},
  13: { status: 'In Progress', feedback: '', scheduledMeeting: '2024-03-15T14:30:00', participants: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Willi'] },
  // Add more progress details as needed
};


// Mock data for candidate progress
const mockCandidateProgress = {
  101: [
    { stepName: 'Interview 1', status: 'Completed', progressId:12, feedback: 'Good performance' },
    { stepName: 'Technical Test', status: 'In Progress',  progressId:13, feedback: '' },
    // Add more progress steps for candidate 101 as needed
  ],
  102: [
    { stepName: 'Interview 1', status: 'Completed',  progressId:22,  feedback: 'Excellent performance' },
    { stepName: 'Technical Test', status: 'Completed', progressId:23,  feedback: 'Passed with flying colors' },
    // Add more progress steps for candidate 102 as needed
  ],
  // Add more mock data for other candidates as needed
};

// Mock data for job listings
const mockJobListings = [
    { id: 1, title: 'Software Engineer', status: 'Open', candidateCount: 2 },
    { id: 2, title: 'Data Analyst', status: 'Closed', candidateCount: 2 },
    // Add more mock job listings as needed
  ];
  
  // Mock data for job details
  const mockJobDetails = [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Join our dynamic software engineering team...',
      status: 'Open',
      candidates: [
        { id: 101, name: 'John Doe', progressStatus:'3/4' },
        { id: 102, name: 'Jane Smith',progressStatus:'2/4'},
        // Add more mock candidates as needed
      ],
    },
    {
      id: 2,
      title: 'Data Analyst',
      description: 'We are looking for a skilled data analyst...',
      status: 'Closed',
      candidates: [
        { id: 201, name: 'Alice Johnson' },
        { id: 202, name: 'Bob Williams' },
        // Add more mock candidates as needed
      ],
    },
    // Add more mock job details as needed
  ];
  
  // Mock API function to get job listings
  export const getJobListings = async () => {
    // const response = await axios.get('/api/jobListings');
    // return response.data;
  
    // For now, return the mock data
    return mockJobListings;
  };
  
  // Mock API function to get job details
  export const getJobDetails = async (jobId) => {
    // const response = await axios.get(`/api/jobListings/${jobId}`);
    // return response.data;
  
    // For now, find the job details from mock data
    return mockJobDetails.find(job => job.id === parseInt(jobId, 10));
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
    // For now, return the mock data
    return mockProgressDetails[progressId] || null;
  };