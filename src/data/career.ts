export interface Role {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
}

export const roles: Role[] = [
  {
    title: 'Senior AI Engineer',
    company: 'Possibl AI',
    location: 'Auckland, New Zealand · Remote',
    start: 'Jul 2025',
    end: 'Present',
    summary: 'A vendor-agnostic AI consultancy building agentic systems for clients across ANZ, APAC and the US.',
    highlights: [
      'Building RCRT, an AI-native backend that gives any web or mobile app agentic traversal of, and live context over, its own data, independent of vendor, platform or model.',
      'Shipping full-stack SaaS products on top of RCRT, from core AI infrastructure to production delivery.',
      'Designing and deploying voice AI agents with custom infrastructure integrations.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'SocialCatfish',
    location: 'California, USA · Remote',
    start: 'Nov 2021',
    end: 'Oct 2024',
    summary: 'An identity-verification and scam-detection platform searching billions of records.',
    highlights: [
      'Led the flagship search product, responsible for about 80% of company revenue.',
      'Built facial-recognition pipelines and billion-scale vector search on FAISS and USearch, cutting query time from 1.2 s to 300 ms while using 10% less memory.',
      'Built behaviour-prediction and churn models on real-time data to drive early retention.',
    ],
  },
  {
    title: 'Robotics Engineer',
    company: 'Arimac Digital',
    location: 'Colombo, Sri Lanka',
    start: 'Feb 2020',
    end: 'Jun 2021',
    summary: 'Creators of Diyazen, Sri Lanka’s first humanoid robot.',
    highlights: [
      'Built Diyazen’s language engine: 90% accuracy and 30% fewer misinterpretations.',
      'Engineered its vision and hearing: real-time object recognition, text-to-speech and custom wake-word detection.',
      'Built the kinematics and control systems behind its motion.',
    ],
  },
  {
    title: 'Embedded Systems Engineer',
    company: 'Aptinex',
    location: 'Sri Lanka',
    start: 'Apr 2019',
    end: 'Feb 2020',
    summary: 'Embedded electronics and IoT devices.',
    highlights: [
      'Designed and deployed Wi-Fi and LoRa IoT devices.',
      'Built battery-optimised Bluetooth devices for large-scale production.',
      'Wrote firmware and sensor-fusion algorithms that improved IMU accuracy.',
    ],
  },
];

export const certifications = ['Anthropic AI Engineer', 'IBM Machine Learning Professional Certificate'];

export const proofPoints = [
  {
    figure: '4×',
    label: 'Faster search',
    detail: 'Cut query time across billions of records from 1.2 s to 300 ms.',
  },
  {
    figure: '1st',
    label: 'Humanoid robot',
    detail: 'Built the language and vision systems of Sri Lanka’s first humanoid robot.',
  },
  {
    figure: 'RCRT',
    label: 'Agentic core',
    detail: 'An AI-native backend that works with any app, vendor or model.',
  },
];
