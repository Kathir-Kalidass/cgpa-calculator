export const gradeOptions = [
  { label: "S (10)", point: 10 },
  { label: "A+ (9)", point: 9 },
  { label: "A (8)", point: 8 },
  { label: "B+ (7)", point: 7 },
  { label: "B (6)", point: 6 },
  { label: "C (5)", point: 5 },
  { label: "U/SA/WC (0)", point: 0 }
];

// Map grade letters to points for quick paste
export const gradeLetterMap = {
  'S': 10, 'O': 10, // treat O as S (legacy)
  'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5,
  'U': 0, 'RA': 0, 'SA': 0, 'WC': 0
};

export const syllabusData = {
  cse: [
    {
      name: "Semester I",
      courses: [
        { code: "HS3151", name: "English for Communication - I", credits: 3 },
        { code: "MA3151", name: "Matrices and Calculus", credits: 4 },
        { code: "PH3151", name: "Engineering Physics", credits: 3 },
        { code: "CY3151", name: "Engineering Chemistry", credits: 3 },
        { code: "EE3152", name: "Fundamentals of Electrical and Electronics Engineering", credits: 3 },
        { code: "GE3153", name: "Programming in C", credits: 4 },
        { code: "GE3154", name: "Heritage of Tamils", credits: 1 },
        { code: "CS3101", name: "Computational Thinking", credits: 2 },
        { code: "PH3161", name: "Physics Laboratory", credits: 1 },
        { code: "GE3162", name: "English Laboratory - I", credits: 1 }
      ]
    },
    {
      name: "Semester II",
      courses: [
        { code: "HS3251", name: "English For Communication – II", credits: 3 },
        { code: "MA3252", name: "Discrete Mathematics", credits: 4 },
        { code: "PH3252", name: "Semiconductor Devices and Quantum Technology", credits: 3 },
        { code: "GE3155", name: "Engineering Drawing", credits: 4 },
        { code: "GE3251", name: "Tamils and Technology", credits: 1 },
        { code: "CS3201", name: "Object Oriented Programming", credits: 3 },
        { code: "GE3161", name: "Engineering Practices Laboratory", credits: 2 },
        { code: "CY3161", name: "Chemistry Laboratory", credits: 1 },
        { code: "GE3261", name: "English Laboratory - II", credits: 1 }
      ]
    },
    {
      name: "Semester III",
      courses: [
        { code: "MA23C05", name: "Probability and Statistics", credits: 4 },
        { code: "CS23301", name: "Software Engineering", credits: 3 },
        { code: "CS23302", name: "Data Structures", credits: 5 },
        { code: "CS23303", name: "Digital System Design", credits: 5 },
        { code: "CS23304", name: "Java Programming", credits: 5 },
        { code: "SDC1", name: "Skill Development Course – I", credits: 2 },
        { code: "CS23U01", name: "Standards – Computer Science & Engg.", credits: 1 }
      ]
    },
    {
      name: "Semester IV",
      courses: [
        { code: "MA23C03", name: "Linear Algebra and Numerical Methods", credits: 4 },
        { code: "CS23401", name: "Database Management Systems", credits: 5 },
        { code: "CS23402", name: "Computer Architecture", credits: 4 },
        { code: "CS23403", name: "Full Stack Technologies", credits: 4 },
        { code: "CS23404", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "SDC2", name: "Skill Development Course - II", credits: 2 },
        { code: "IOC1", name: "Industry Oriented Course I", credits: 1 }
      ]
    },
    {
      name: "Semester V",
      courses: [
        { code: "CS23501", name: "Operating Systems", credits: 5 },
        { code: "CS23502", name: "Networks and Data Communication", credits: 5 },
        { code: "CS23503", name: "Theory of Computation", credits: 3 },
        { code: "PE1", name: "Professional Elective – I", credits: 3 },
        { code: "OE1", name: "Open Elective – I", credits: 3 },
        { code: "CS23L01", name: "Self Learning Course", credits: 1 },
        { code: "IOC2", name: "Industry Oriented Course -II", credits: 1 },
        { code: "UC23E01", name: "Engineering Entrepreneurship Development", credits: 3 },
        { code: "SDC3", name: "Skill Development Course - III", credits: 2 }
      ]
    },
    {
      name: "Semester VI",
      courses: [
        { code: "CS23601", name: "Cryptography and System Security", credits: 4 },
        { code: "CS23602", name: "Compiler Design", credits: 4 },
        { code: "CS23603", name: "Machine Learning", credits: 5 },
        { code: "PE2", name: "Professional Elective – II", credits: 3 },
        { code: "PE3", name: "Professional Elective – III", credits: 3 },
        { code: "OE2", name: "Open Elective – II", credits: 3 },
        { code: "CS23U02", name: "Perspectives of Sustainability Development", credits: 3 },
        { code: "CS23604", name: "Creative and Innovative Project", credits: 2 }
      ]
    },
    {
      name: "Semester VII",
      courses: [
        { code: "ETC1", name: "Emerging Technology Course I", credits: 4 },
        { code: "ETC2", name: "Emerging Technology Course II", credits: 3 },
        { code: "PE4", name: "Professional Elective – IV", credits: 3 },
        { code: "PE5", name: "Professional Elective – V", credits: 3 },
        { code: "PE6", name: "Professional Elective – VI", credits: 3 },
        { code: "IOC3", name: "Industry Oriented Course III", credits: 1 }
      ]
    },
    {
      name: "Semester VIII",
      courses: [
        { code: "CS23801", name: "Project Work / Internship cum Project Work", credits: 8 }
      ]
    }
  ],
  it: [
    {
      name: "Semester I",
      courses: [
        { code: "HS3151", name: "English for Communication - I", credits: 3 },
        { code: "MA3151", name: "Matrices and Calculus", credits: 4 },
        { code: "PH3151", name: "Engineering Physics", credits: 3 },
        { code: "CY3151", name: "Engineering Chemistry", credits: 3 },
        { code: "EE3152", name: "Fundamentals of Electrical and Electronics Engineering", credits: 3 },
        { code: "GE3153", name: "Programming in C", credits: 4 },
        { code: "GE3154", name: "Heritage of Tamils", credits: 1 },
        { code: "PH3161", name: "Physics Laboratory", credits: 1 },
        { code: "GE3162", name: "English Laboratory - I", credits: 1 }
      ]
    },
    {
      name: "Semester II",
      courses: [
        { code: "HS3251", name: "English For Communication – II", credits: 3 },
        { code: "MA3251", name: "Ordinary Differential Equations and Transform Techniques", credits: 4 },
        { code: "PH3202", name: "Physics of Electronic Materials and Devices", credits: 3 },
        { code: "GE3155", name: "Engineering Drawing", credits: 4 },
        { code: "IT3201", name: "Information Technology Essentials", credits: 4 },
        { code: "GE3251", name: "Tamils and Technology", credits: 1 },
        { code: "GE3161", name: "Engineering Practices Laboratory", credits: 2 },
        { code: "CY3161", name: "Chemistry Laboratory", credits: 1 },
        { code: "GE3261", name: "English Laboratory - II", credits: 1 }
      ]
    },
    {
      name: "Semester III",
      courses: [
        { code: "MA23C09", name: "Finite State Automata and Discrete Structures", credits: 4 },
        { code: "IT23301", name: "Digital Logic and Design", credits: 4 },
        { code: "IT23302", name: "Data Structures", credits: 4 },
        { code: "IT23303", name: "Database Management Systems", credits: 4 },
        { code: "IT23304", name: "Object Oriented Programming", credits: 2 },
        { code: "IT23U01", name: "Standards – IT", credits: 1 }
      ]
    },
    {
      name: "Semester IV",
      courses: [
        { code: "MA23C05", name: "Probability and Statistics", credits: 4 },
        { code: "IT23401", name: "Advanced Data Structures", credits: 4 },
        { code: "IT23C01", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "IT23402", name: "Computer Organization and Architecture", credits: 3 },
        { code: "IT23403", name: "Software Engineering", credits: 3 },
        { code: "IT23C02", name: "Operating Systems", credits: 4 },
        { code: "IT23L01", name: "Self-Learning Course", credits: 1 },
        { code: "SDC1", name: "Skill Development Course I", credits: 2 }
      ]
    },
    {
      name: "Semester V",
      courses: [
        { code: "IT23501", name: "Computer Networks", credits: 4 },
        { code: "IT23502", name: "Web Programming", credits: 4 },
        { code: "IT23503", name: "Compiler Design", credits: 3 },
        { code: "IT23504", name: "Machine Learning", credits: 4 },
        { code: "PE1", name: "Professional Elective I", credits: 3 },
        { code: "UC23E01", name: "Engineering Entrepreneurship Development", credits: 3 },
        { code: "IOC1", name: "Industry Oriented Course I", credits: 1 },
        { code: "SDC2", name: "Skill Development Course II", credits: 2 },
        { code: "IT23505", name: "Societal Oriented Project", credits: 1 }
      ]
    },
    {
      name: "Semester VI",
      courses: [
        { code: "IT23601", name: "Distributed Systems and Computing", credits: 3 },
        { code: "IT23602", name: "Natural Language and Image Processing", credits: 4 },
        { code: "ETC1", name: "Emerging Technology Course I", credits: 3 },
        { code: "PE2", name: "Professional Elective II", credits: 3 },
        { code: "PE3", name: "Professional Elective III", credits: 3 },
        { code: "OE1", name: "Open Elective – I", credits: 3 },
        { code: "SDC3", name: "Skill Development Course III", credits: 2 },
        { code: "IOC2", name: "Industry Oriented Course II", credits: 1 },
        { code: "IT23U02", name: "Perspectives of Sustainability Development", credits: 3 }
      ]
    },
    {
      name: "Semester VII",
      courses: [
        { code: "IT23701", name: "Cryptography and Network Security", credits: 4 },
        { code: "ETC2", name: "Emerging Technology Course II", credits: 3 },
        { code: "PE4", name: "Professional Elective IV", credits: 3 },
        { code: "PE5", name: "Professional Elective V", credits: 3 },
        { code: "PE6", name: "Professional Elective VI", credits: 3 },
        { code: "OE2", name: "Open Elective II", credits: 3 },
        { code: "IOC3", name: "Industry Oriented Course III", credits: 1 },
        { code: "IT23702", name: "Software Development Project Laboratory", credits: 2 }
      ]
    },
    {
      name: "Semester VIII",
      courses: [
        { code: "IT23801", name: "Project Work / Internship cum Project Work", credits: 8 }
      ]
    }
  ]
};

