// ============================================================================
// ScholarHub Pro — Central data source (scholarships, universities, FAQs, etc.)
// Pure ES module consumed by every page. No external dependencies.
// ============================================================================

// Helper to keep Pexels URLs tidy.
const px = (id, w = 940, h = 650) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=${h}&w=${w}`;

export const IMAGES = {
  heroCampus: px(7683890, 1600, 900),
  heroAlt: px(7972324, 1600, 900),
  gradConfetti: px(7944181, 1200, 800),
  gradsOutdoors: px(7972741, 1200, 800),
  gradSelfie: px(7713518, 1200, 800),
  ctaBg: px(30052431, 1600, 900),
  studyLibrary: px(8199557, 1200, 800),
  studyMan: px(6550111, 1200, 800),
  studyWoman: px(19840059, 1200, 800),
};

// --- Categories -------------------------------------------------------------
export const CATEGORIES = [
  { id: 'merit', name: 'Merit-Based', icon: 'award', color: '#2563EB' },
  { id: 'need', name: 'Need-Based', icon: 'heart', color: '#0EA5E9' },
  { id: 'international', name: 'International', icon: 'globe', color: '#10B981' },
  { id: 'stem', name: 'STEM', icon: 'flask', color: '#F59E0B' },
  { id: 'women', name: 'Women in Tech', icon: 'venus', color: '#EC4899' },
  { id: 'research', name: 'Research', icon: 'microscope', color: '#6366F1' },
  { id: 'sports', name: 'Sports', icon: 'trophy', color: '#EF4444' },
  { id: 'arts', name: 'Arts & Media', icon: 'palette', color: '#8B5CF6' },
];

// --- Countries (with ISO-ish code + accent dot color) -----------------------
export const COUNTRIES = [
  { id: 'usa', name: 'United States', code: 'USA', color: '#2563EB' },
  { id: 'uk', name: 'United Kingdom', code: 'UK', color: '#1E40AF' },
  { id: 'canada', name: 'Canada', code: 'CAN', color: '#DC2626' },
  { id: 'germany', name: 'Germany', code: 'GER', color: '#0F172A' },
  { id: 'australia', name: 'Australia', code: 'AUS', color: '#16A34A' },
  { id: 'netherlands', name: 'Netherlands', code: 'NLD', color: '#F97316' },
  { id: 'singapore', name: 'Singapore', code: 'SGP', color: '#E11D48' },
  { id: 'japan', name: 'Japan', code: 'JPN', color: '#DB2777' },
];

// --- Scholarships -----------------------------------------------------------
// amount: numeric USD used for slider filtering. amountText: display string.
export const SCHOLARSHIPS = [
  {
    id: 'global-merit-2026',
    name: 'Global Excellence Merit Scholarship',
    uni: 'Harvard University',
    uniShort: 'HU',
    uniColor: '#A41E22',
    country: 'usa',
    amount: 50000,
    amountText: '$50,000 / year',
    deadline: '2026-09-15',
    category: 'merit',
    level: 'Masters',
    rating: 4.9,
    applicants: 8421,
    image: px(11932106),
    featured: true,
    description:
      'A flagship merit award recognizing outstanding academic achievement and leadership potential across all graduate disciplines.',
    eligibility: [
      'Minimum GPA of 3.8 / 4.0',
      'Top 10% of graduating class',
      'Demonstrated leadership in community or research',
      'Strong letters of recommendation',
    ],
    documents: ['Academic transcripts', 'Statement of purpose', 'Two reference letters', 'CV / Resume', 'Passport copy'],
    benefits: ['Full tuition coverage', 'Monthly stipend of $2,500', 'Health insurance', 'Conference travel grant'],
    steps: [
      'Create your ScholarHub account',
      'Complete the online application form',
      'Upload required documents',
      'Submit before the deadline',
      'Attend the review interview',
    ],
    timeline: [
      { label: 'Applications open', date: 'Jun 01, 2026', done: true },
      { label: 'Documents review', date: 'Sep 30, 2026', done: false },
      { label: 'Interviews', date: 'Oct 20, 2026', done: false },
      { label: 'Results announced', date: 'Nov 15, 2026', done: false },
    ],
    faqs: [
      { q: 'Can I apply for multiple programs?', a: 'Yes, you may apply for up to two programs with a single application fee.' },
      { q: 'Is the scholarship renewable?', a: 'Yes, it is renewable annually subject to maintaining a 3.5 GPA.' },
    ],
    tags: ['Fully Funded', 'Renewable'],
  },
  {
    id: 'stem-future-2026',
    name: 'STEM Future Leaders Fellowship',
    uni: 'Massachusetts Institute of Technology',
    uniShort: 'MIT',
    uniColor: '#8A1B1B',
    country: 'usa',
    amount: 45000,
    amountText: '$45,000 / year',
    deadline: '2026-10-01',
    category: 'stem',
    level: 'PhD',
    rating: 4.8,
    applicants: 5120,
    image: px(16714909),
    featured: true,
    description:
      'A prestigious fellowship for doctoral candidates pushing the boundaries of science, technology, engineering and mathematics.',
    eligibility: [
      'Enrolled or admitted to a PhD program',
      'Research aligned with STEM fields',
      'Publication or strong research portfolio',
      'GRE optional but recommended',
    ],
    documents: ['Research proposal', 'Academic transcripts', 'Publication list', 'Advisor endorsement', 'Photo ID'],
    benefits: ['Full tuition + $38k stipend', 'Research budget $5,000', 'Lab access', 'Mentorship program'],
    steps: ['Secure faculty endorsement', 'Prepare research proposal', 'Submit application', 'Panel review', 'Fellowship offer'],
    timeline: [
      { label: 'Portal opens', date: 'Jul 15, 2026', done: true },
      { label: 'Submission deadline', date: 'Oct 01, 2026', done: false },
      { label: 'Panel review', date: 'Nov 10, 2026', done: false },
      { label: 'Offers released', date: 'Dec 01, 2026', done: false },
    ],
    faqs: [
      { q: 'Do I need a confirmed advisor?', a: 'An advisor endorsement strengthens your application but is not mandatory at submission.' },
      { q: 'Is international travel covered?', a: 'One international conference per year is funded up to $2,500.' },
    ],
    tags: ['Fully Funded', 'PhD'],
  },
  {
    id: 'women-tech-2026',
    name: 'Women in Technology Scholarship',
    uni: 'Stanford University',
    uniShort: 'SU',
    uniColor: '#8C1515',
    country: 'usa',
    amount: 30000,
    amountText: '$30,000 / year',
    deadline: '2026-08-20',
    category: 'women',
    level: 'Undergraduate',
    rating: 4.7,
    applicants: 3980,
    image: px(27907978),
    featured: true,
    description:
      'Empowering the next generation of women leaders in computer science, engineering and data through full undergraduate support.',
    eligibility: [
      'Female-identifying student',
      'Enrolled in a computing or engineering program',
      'Minimum GPA 3.5',
      'Commitment to community impact',
    ],
    documents: ['Transcripts', 'Personal essay', 'Community impact statement', 'One reference letter'],
    benefits: ['$30,000 tuition', 'Laptop & software stipend', 'Industry mentorship', 'Internship placement'],
    steps: ['Apply online', 'Submit essay', 'Reference review', 'Virtual interview', 'Award notification'],
    timeline: [
      { label: 'Applications open', date: 'May 01, 2026', done: true },
      { label: 'Deadline', date: 'Aug 20, 2026', done: false },
      { label: 'Interviews', date: 'Sep 15, 2026', done: false },
      { label: 'Awards', date: 'Oct 05, 2026', done: false },
    ],
    faqs: [
      { q: 'Is this open to trans women?', a: 'Yes, all female-identifying students are eligible to apply.' },
      { q: 'Can freshmen apply?', a: 'Yes, incoming and current undergraduates may apply.' },
    ],
    tags: ['Undergraduate', 'Mentorship'],
  },
  {
    id: 'commonwealth-2026',
    name: 'Commonwealth Shared Scholarship',
    uni: 'University of Oxford',
    uniShort: 'OX',
    uniColor: '#002147',
    country: 'uk',
    amount: 38000,
    amountText: '£30,000 / year',
    deadline: '2026-10-15',
    category: 'international',
    level: 'Masters',
    rating: 4.8,
    applicants: 6210,
    image: px(9698993),
    featured: true,
    description:
      'A fully-funded master\u2019s scholarship for students from developing Commonwealth nations pursuing development-focused degrees.',
    eligibility: [
      'Citizen of an eligible Commonwealth country',
      'Hold a first degree by October 2026',
      'Not studied for a year in a high-income country',
      'Development-focused course selection',
    ],
    documents: ['Degree certificate', 'Transcripts', 'Development statement', 'Two references', 'Passport'],
    benefits: ['Full tuition', 'Flights to UK', 'Monthly stipend', 'Thesis grant'],
    steps: ['Verify eligibility', 'Apply to course', 'Scholarship nomination', ' CSC review', 'Final award'],
    timeline: [
      { label: 'Course application', date: 'Jan 10, 2026', done: true },
      { label: 'Nomination', date: 'Oct 15, 2026', done: false },
      { label: 'CSC review', date: 'Nov 30, 2026', done: false },
      { label: 'Results', date: 'Dec 20, 2026', done: false },
    ],
    faqs: [
      { q: 'Which countries are eligible?', a: 'A full list of eligible Commonwealth nations is provided on the application page.' },
      { q: 'Do I apply separately?', a: 'You must first apply to the course, then your university nominates you.' },
    ],
    tags: ['Fully Funded', 'International'],
  },
  {
    id: 'daad-research-2026',
    name: 'DAAD Research Grant',
    uni: 'Technical University of Munich',
    uniShort: 'TUM',
    uniColor: '#006E51',
    country: 'germany',
    amount: 28000,
    amountText: '\u20ac26,000 / year',
    deadline: '2026-11-01',
    category: 'research',
    level: 'PhD',
    rating: 4.6,
    applicants: 4530,
    image: px(20200756),
    featured: false,
    description:
      'Supports international doctoral candidates conducting research at German universities for 7 to 12 months.',
    eligibility: [
      'Enrolled in a PhD program',
      'Research at a German institution',
      'Proof of language proficiency',
      'Strong academic record',
    ],
    documents: ['Research plan', 'Host agreement', 'Transcripts', 'Language certificate'],
    benefits: ['Monthly \u20ac1,300 stipend', 'Travel allowance', 'Health insurance', 'Research costs'],
    steps: ['Find a host', 'Prepare research plan', 'Submit to DAAD', 'Selection committee', 'Grant award'],
    timeline: [
      { label: 'Apply', date: 'Sep 01, 2026', done: false },
      { label: 'Review', date: 'Nov 01, 2026', done: false },
      { label: 'Selection', date: 'Dec 15, 2026', done: false },
      { label: 'Start grant', date: 'Feb 01, 2027', done: false },
    ],
    faqs: [
      { q: 'What language is required?', a: 'English or German proficiency is required depending on your host institute.' },
      { q: 'Can I extend the grant?', a: 'Extensions up to 3 months are possible in justified cases.' },
    ],
    tags: ['Research', 'Germany'],
  },
  {
    id: 'canada-maple-2026',
    name: 'Maple Leaf International Award',
    uni: 'University of Toronto',
    uniShort: 'UofT',
    uniColor: '#002A5C',
    country: 'canada',
    amount: 32000,
    amountText: 'CAD 42,000 / year',
    deadline: '2026-09-05',
    category: 'international',
    level: 'Undergraduate',
    rating: 4.7,
    applicants: 7110,
    image: px(2982449),
    featured: false,
    description:
      'A flagship entrance award for high-achieving international students joining undergraduate programs at UofT.',
    eligibility: [
      'International student status',
      'Admitted to an undergraduate program',
      'Outstanding academic record',
      'Demonstrated extracurricular excellence',
    ],
    documents: ['Admission letter', 'Transcripts', 'Activities record', 'Personal statement'],
    benefits: ['CAD 42,000 over 4 years', 'Priority housing', 'Peer mentorship', 'Study abroad access'],
    steps: ['Apply to UofT', 'Auto-considered on admission', 'Submit award form', 'Selection', 'Notification'],
    timeline: [
      { label: 'Admission', date: 'Feb 01, 2026', done: true },
      { label: 'Award form', date: 'Sep 05, 2026', done: false },
      { label: 'Selection', date: 'Oct 10, 2026', done: false },
      { label: 'Notification', date: 'Oct 30, 2026', done: false },
    ],
    faqs: [
      { q: 'Do I apply separately?', a: 'No shortlisted admitted students are invited to complete the award form.' },
      { q: 'Is it renewable?', a: 'Yes, renewable for 4 years with a 3.2 GPA.' },
    ],
    tags: ['Undergraduate', 'Entrance Award'],
  },
  {
    id: 'aus-sports-2026',
    name: 'Outback Sports Excellence Award',
    uni: 'University of Melbourne',
    uniShort: 'UMelb',
    uniColor: '#C8102E',
    country: 'australia',
    amount: 22000,
    amountText: 'AUD 34,000 / year',
    deadline: '2026-08-30',
    category: 'sports',
    level: 'Undergraduate',
    rating: 4.5,
    applicants: 2140,
    image: px(5147366),
    featured: false,
    description:
      'For student-athletes representing the university at a national or international level in any sanctioned sport.',
    eligibility: [
      'Representative-level sporting achievement',
      'Full-time enrollment',
      'Minimum GPA 3.0',
      'Coach endorsement',
    ],
    documents: ['Sporting resume', 'Coach reference', 'Transcripts', 'Achievement certificates'],
    benefits: ['AUD 34,000', 'Elite training access', 'Sports science support', 'Flexible study plan'],
    steps: ['Apply online', 'Coach endorsement', 'Trial / evidence', 'Panel selection', 'Award'],
    timeline: [
      { label: 'Open', date: 'Jun 01, 2026', done: true },
      { label: 'Deadline', date: 'Aug 30, 2026', done: false },
      { label: 'Trials', date: 'Sep 20, 2026', done: false },
      { label: 'Award', date: 'Oct 15, 2026', done: false },
    ],
    faqs: [
      { q: 'Which sports qualify?', a: 'Any sport with a recognised national governing body qualifies.' },
      { q: 'Is flexible study supported?', a: 'Yes, athletes get a tailored study plan during competition seasons.' },
    ],
    tags: ['Sports', 'Athlete'],
  },
  {
    id: 'netherlands-arts-2026',
    name: 'Dutch Creative Arts Bursary',
    uni: 'Delft University of Technology',
    uniShort: 'TUD',
    uniColor: '#00A6D6',
    country: 'netherlands',
    amount: 18000,
    amountText: '\u20ac18,000 / year',
    deadline: '2026-10-20',
    category: 'arts',
    level: 'Masters',
    rating: 4.4,
    applicants: 1670,
    image: px(35314982),
    featured: false,
    description:
      'A bursary for emerging artists and designers pursuing master\u2019s study in the creative and digital arts.',
    eligibility: [
      'Portfolio of creative work',
      'Admitted to a creative master\u2019s',
      'Minimum GPA 3.2',
      'Statement of artistic vision',
    ],
    documents: ['Portfolio', 'Transcripts', 'Artist statement', 'One reference'],
    benefits: ['\u20ac18,000', 'Studio access', 'Exhibition opportunity', 'Material budget'],
    steps: ['Submit portfolio', 'Apply online', 'Panel review', 'Interview', 'Award'],
    timeline: [
      { label: 'Open', date: 'Jul 01, 2026', done: true },
      { label: 'Deadline', date: 'Oct 20, 2026', done: false },
      { label: 'Review', date: 'Nov 15, 2026', done: false },
      { label: 'Award', date: 'Dec 10, 2026', done: false },
    ],
    faqs: [
      { q: 'What format is the portfolio?', a: 'A PDF or link to up to 15 works is accepted.' },
      { q: 'Is an interview required?', a: 'Shortlisted applicants attend a short virtual interview.' },
    ],
    tags: ['Arts', 'Portfolio'],
  },
  {
    id: 'sgp-need-2026',
    name: 'Lion City Need-Based Grant',
    uni: 'National University of Singapore',
    uniShort: 'NUS',
    uniColor: '#EF7B10',
    country: 'singapore',
    amount: 16000,
    amountText: 'SGD 22,000 / year',
    deadline: '2026-09-25',
    category: 'need',
    level: 'Undergraduate',
    rating: 4.5,
    applicants: 5230,
    image: px(19757369),
    featured: false,
    description:
      'Financial support for talented students from low-income backgrounds to access world-class education in Singapore.',
    eligibility: [
      'Demonstrated financial need',
      'Strong academic merit',
      'Full-time enrollment',
      'Income documentation',
    ],
    documents: ['Income proof', 'Transcripts', 'Need statement', 'References'],
    benefits: ['SGD 22,000', 'Living allowance', 'Book grant', 'Mentorship'],
    steps: ['Apply online', 'Submit financials', 'Verification', 'Selection', 'Award'],
    timeline: [
      { label: 'Open', date: 'Jun 15, 2026', done: true },
      { label: 'Deadline', date: 'Sep 25, 2026', done: false },
      { label: 'Verification', date: 'Oct 20, 2026', done: false },
      { label: 'Award', date: 'Nov 10, 2026', done: false },
    ],
    faqs: [
      { q: 'What income proof is needed?', a: 'Latest tax returns or employer salary slips are accepted.' },
      { q: 'Is it renewable?', a: 'Yes, subject to annual financial review.' },
    ],
    tags: ['Need-Based', 'Financial Aid'],
  },
  {
    id: 'jpn-monorail-2026',
    name: 'Sakura Engineering Scholarship',
    uni: 'University of Tokyo',
    uniShort: 'UTokyo',
    uniColor: '#0287C3',
    country: 'japan',
    amount: 24000,
    amountText: '\u00a53,500,000 / year',
    deadline: '2026-11-15',
    category: 'stem',
    level: 'Masters',
    rating: 4.6,
    applicants: 2890,
    image: px(14902046),
    featured: false,
    description:
      'Supports outstanding engineering graduate students working on sustainable infrastructure and robotics.',
    eligibility: [
      'Admitted to an engineering master\u2019s',
      'Minimum GPA 3.4',
      'Research in sustainability/robotics',
      'Language proficiency',
    ],
    documents: ['Research plan', 'Transcripts', 'Language cert', 'Recommendation'],
    benefits: ['\u00a53.5M stipend', 'Tuition waiver', 'Lab funding', 'Housing support'],
    steps: ['Apply online', 'Research plan', 'Review', 'Interview', 'Award'],
    timeline: [
      { label: 'Open', date: 'Aug 01, 2026', done: false },
      { label: 'Deadline', date: 'Nov 15, 2026', done: false },
      { label: 'Interview', date: 'Dec 20, 2026', done: false },
      { label: 'Award', date: 'Jan 20, 2027', done: false },
    ],
    faqs: [
      { q: 'Is Japanese required?', a: 'Many programs are in English; Japanese is a plus.' },
      { q: 'Is housing provided?', a: 'Subsidized university housing is offered.' },
    ],
    tags: ['Engineering', 'Masters'],
  },
  {
    id: 'uk-russell-2026',
    name: 'Russell Group Dean\u2019s Award',
    uni: 'Imperial College London',
    uniShort: 'ICL',
    uniColor: '#003E74',
    country: 'uk',
    amount: 34000,
    amountText: '\u00a326,000 / year',
    deadline: '2026-09-10',
    category: 'merit',
    level: 'Masters',
    rating: 4.7,
    applicants: 4760,
    image: px(14446732),
    featured: false,
    description:
      'A dean\u2019s award for exceptional postgraduate candidates demonstrating academic distinction and ambition.',
    eligibility: [
      'First-class or strong upper-second degree',
      'Admitted to a postgraduate program',
      'Leadership evidence',
      'Two academic references',
    ],
    documents: ['Degree transcript', 'Statement', 'References', 'CV'],
    benefits: ['\u00a326,000', 'Tuition contribution', 'Research fund', 'Alumni network'],
    steps: ['Course admission', 'Award application', 'Reference check', 'Dean review', 'Award'],
    timeline: [
      { label: 'Open', date: 'May 15, 2026', done: true },
      { label: 'Deadline', date: 'Sep 10, 2026', done: false },
      { label: 'Dean review', date: 'Oct 15, 2026', done: false },
      { label: 'Award', date: 'Nov 05, 2026', done: false },
    ],
    faqs: [
      { q: 'Is the award means-tested?', a: 'No, it is purely merit-based.' },
      { q: 'Can I defer?', a: 'Deferral of one year is permitted with approval.' },
    ],
    tags: ['Merit', 'Postgraduate'],
  },
  {
    id: 'canada-research-2026',
    name: 'Northern Lights Research Fund',
    uni: 'McGill University',
    uniShort: 'McG',
    uniColor: '#ED1B2E',
    country: 'canada',
    amount: 30000,
    amountText: 'CAD 40,000 / year',
    deadline: '2026-12-01',
    category: 'research',
    level: 'PhD',
    rating: 4.6,
    applicants: 1980,
    image: px(35427325),
    featured: false,
    description:
      'Funds doctoral research addressing climate, sustainability, and northern community challenges.',
    eligibility: [
      'Enrolled PhD candidate',
      'Research in climate/sustainability',
      'Minimum GPA 3.6',
      'Supervisor support',
    ],
    documents: ['Research proposal', 'Supervisor letter', 'Transcripts', 'Budget plan'],
    benefits: ['CAD 40,000', 'Fieldwork funding', 'Publication grant', 'Conference travel'],
    steps: ['Apply online', 'Proposal review', 'Panel interview', 'Selection', 'Funding'],
    timeline: [
      { label: 'Open', date: 'Sep 01, 2026', done: false },
      { label: 'Deadline', date: 'Dec 01, 2026', done: false },
      { label: 'Interview', date: 'Jan 20, 2027', done: false },
      { label: 'Funding', date: 'Feb 15, 2027', done: false },
    ],
    faqs: [
      { q: 'Can teams apply?', a: 'Individual-led applications only, though teams may be named in the proposal.' },
      { q: 'Is fieldwork covered?', a: 'Up to CAD 8,000 in fieldwork costs are reimbursable.' },
    ],
    tags: ['Research', 'Climate'],
  },
];

// --- Featured universities --------------------------------------------------
export const UNIVERSITIES = [
  { name: 'Harvard University', short: 'HU', country: 'usa', image: px(11932106, 800, 600), programs: 50, rating: 4.9 },
  { name: 'MIT', short: 'MIT', country: 'usa', image: px(16714909, 800, 600), programs: 46, rating: 4.9 },
  { name: 'Stanford University', short: 'SU', country: 'usa', image: px(27907978, 800, 600), programs: 65, rating: 4.8 },
  { name: 'University of Oxford', short: 'OX', country: 'uk', image: px(9698993, 800, 600), programs: 58, rating: 4.8 },
  { name: 'University of Toronto', short: 'UofT', country: 'canada', image: px(2982449, 800, 600), programs: 72, rating: 4.7 },
  { name: 'TU Munich', short: 'TUM', country: 'germany', image: px(20200756, 800, 600), programs: 44, rating: 4.6 },
  { name: 'NUS Singapore', short: 'NUS', country: 'singapore', image: px(19757369, 800, 600), programs: 38, rating: 4.7 },
  { name: 'University of Tokyo', short: 'UTokyo', country: 'japan', image: px(14902046, 800, 600), programs: 41, rating: 4.6 },
];

// --- Testimonials (scholars) ------------------------------------------------
export const TESTIMONIALS = [
  {
    name: 'Amara Okafor',
    role: 'MSc Computer Science',
    uni: 'Stanford University',
    avatar: px(38197025, 300, 300),
    rating: 5,
    text: 'ScholarHub matched me with the Women in Tech scholarship in minutes. The guided application removed every guess \u2014 I was funded within a semester.',
  },
  {
    name: 'Daniel Reyes',
    role: 'PhD Robotics',
    uni: 'MIT',
    avatar: px(35503892, 300, 300),
    rating: 5,
    text: 'I had applied to eleven scholarships before and lost track. The dashboard here kept every deadline, document and status in one place. Life-changing.',
  },
  {
    name: 'Priya Nair',
    role: 'MA Economics',
    uni: 'University of Oxford',
    avatar: px(37276972, 300, 300),
    rating: 5,
    text: 'The eligibility checker saved me hours. I only applied to awards I actually qualified for \u2014 and won the Commonwealth Shared Scholarship.',
  },
  {
    name: 'Liam Anderson',
    role: 'BEng Aerospace',
    uni: 'University of Toronto',
    avatar: px(16970452, 300, 300),
    rating: 4,
    text: 'From bookmarking to the final receipt download, the whole journey felt premium. The reminders meant I never missed a deadline again.',
  },
  {
    name: 'Fatima Zahra',
    role: 'MDes Digital Arts',
    uni: 'Delft University of Technology',
    avatar: px(6702753, 300, 300),
    rating: 5,
    text: 'As a first-generation applicant I was overwhelmed. ScholarHub\u2019s step-by-step timeline made the Dutch Arts bursary feel achievable.',
  },
  {
    name: 'Noah Williams',
    role: 'MSc Sustainability',
    uni: 'McGill University',
    avatar: px(17362826, 300, 300),
    rating: 5,
    text: 'The document checklist alone is worth it. Everything I uploaded was validated instantly and the progress ring kept me motivated.',
  },
];

// --- Success stories (carousel) --------------------------------------------
export const SUCCESS_STORIES = [
  {
    name: 'Sofia Martinez',
    award: 'Global Excellence Merit',
    amount: '$50,000',
    avatar: px(9304685, 300, 300),
    image: px(7944181, 1200, 700),
    quote: 'From a small town to Harvard \u2014 ScholarHub made the impossible my reality.',
  },
  {
    name: 'Kenji Tanaka',
    award: 'Sakura Engineering Scholarship',
    amount: '\u00a53.5M',
    avatar: px(29995649, 300, 300),
    image: px(7972741, 1200, 700),
    quote: 'I built my robotics career on a fully funded master\u2019s I found here.',
  },
  {
    name: 'Aisha Bello',
    award: 'Commonwealth Shared Scholarship',
    amount: '\u00a330,000',
    avatar: px(26989515, 300, 300),
    image: px(7713518, 1200, 700),
    quote: 'Oxford felt out of reach until the eligibility checker said otherwise.',
  },
];

// --- Team -------------------------------------------------------------------
export const TEAM = [
  { name: 'Eleanor Vance', role: 'Founder & CEO', avatar: px(9304685, 400, 400), color: '#2563EB' },
  { name: 'Marcus Chen', role: 'Chief Technology Officer', avatar: px(29995649, 400, 400), color: '#4F46E5' },
  { name: 'Sofia Romano', role: 'Chief Operating Officer', avatar: px(37276972, 400, 400), color: '#10B981' },
  { name: 'James Patel', role: 'Head of Partnerships', avatar: px(35503892, 400, 400), color: '#F59E0B' },
  { name: 'Hannah Lee', role: 'Director of Outreach', avatar: px(6702753, 400, 400), color: '#EC4899' },
  { name: 'David Okoro', role: 'Lead Product Designer', avatar: px(16970452, 400, 400), color: '#6366F1' },
];

// --- Office gallery ---------------------------------------------------------
export const OFFICE_GALLERY = [
  px(6794970, 800, 600),
  px(7511754, 800, 600),
  px(8297846, 800, 600),
  px(4680351, 800, 600),
  px(7511748, 800, 600),
  px(36356065, 800, 600),
];

// --- Partners ---------------------------------------------------------------
export const PARTNERS = ['Harvard', 'MIT', 'Stanford', 'Oxford', 'Toronto', 'TU Munich', 'NUS', 'Tokyo', 'Imperial', 'McGill'];

// --- General FAQ ------------------------------------------------------------
export const FAQS = [
  { q: 'Is ScholarHub Pro free to use?', a: 'Yes. Creating an account, browsing scholarships, and applying through our platform is completely free for students.' },
  { q: 'How do I know if I am eligible for a scholarship?', a: 'Open any scholarship to view its eligibility criteria, or use the filters on the Scholarships page to narrow by level, country and amount.' },
  { q: 'Can I apply to multiple scholarships at once?', a: 'Absolutely. You can bookmark and apply to as many scholarships as you qualify for. Your dashboard tracks every application separately.' },
  { q: 'What documents will I typically need?', a: 'Most applications require transcripts, a statement of purpose, reference letters, a passport or ID, and a recent photograph. Specific lists appear on each scholarship page.' },
  { q: 'How are deadlines tracked?', a: 'Every scholarship you bookmark or apply for appears on your dashboard calendar and notifications panel, with reminders before each deadline.' },
  { q: 'Do you offer support with essays and interviews?', a: 'Our resource center provides essay templates and interview guides. Premium members can book 1:1 coaching sessions.' },
  { q: 'Is my data secure?', a: 'We use bank-grade encryption and never share your personal information with third parties without consent.' },
  { q: 'Can universities post scholarships on ScholarHub?', a: 'Yes. Verified university partners can publish and manage scholarships through a dedicated institutional portal.' },
  { q: 'What happens after I submit an application?', a: 'You receive an instant receipt, your dashboard updates to \u201cUnder Review\u201d, and you get notified at every status change until a decision is reached.' },
  { q: 'Do you guarantee a scholarship?', a: 'No platform can guarantee an award. We maximise your chances through smart matching, reminders and a guided application experience.' },
];

// --- Stats (for animated counters) -----------------------------------------
export const STATS = [
  { label: 'Scholarships', value: 20000, suffix: '+', icon: 'award' },
  { label: 'Students Funded', value: 1000000, suffix: '+', icon: 'users' },
  { label: 'Partner Universities', value: 500, suffix: '+', icon: 'building' },
  { label: 'Success Rate', value: 98, suffix: '%', icon: 'trending' },
];

// --- Timeline (about page) --------------------------------------------------
export const COMPANY_TIMELINE = [
  { year: '2018', title: 'The Idea', text: 'Founded in a dorm room with one mission: make global scholarships discoverable for every student.' },
  { year: '2020', title: 'First 100 Scholarships', text: 'Curated our first verified catalogue and launched the smart eligibility matcher.' },
  { year: '2022', title: 'One Million Students', text: 'Crossed a million registered students and partnered with 200 universities worldwide.' },
  { year: '2024', title: 'The Dashboard Era', text: 'Launched the award-winning student dashboard with calendars, charts and reminders.' },
  { year: '2026', title: 'ScholarHub Pro', text: 'A premium, AI-assisted portal powering 20,000+ scholarships across 8 countries.' },
];

// --- Lookup helpers ---------------------------------------------------------
export const countryName = (id) => (COUNTRIES.find((c) => c.id === id) || {}).name || id;
export const countryObj = (id) => COUNTRIES.find((c) => c.id === id) || { name: id, code: '', color: '#64748B' };
export const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
export const getScholarship = (id) => SCHOLARSHIPS.find((s) => s.id === id);
export const relatedScholarships = (id, n = 3) =>
  SCHOLARSHIPS.filter((s) => s.id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
