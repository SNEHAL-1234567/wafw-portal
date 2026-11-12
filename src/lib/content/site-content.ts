import type { StaticImageData } from "next/image";
import groupPhoto from "../../../public/images/wafw/group-photo.jpg";
import siasStudents from "../../../public/images/wafw/sias-students-2014.jpg";
import karatina from "../../../public/images/wafw/karatina-university.jpg";
import whiteboardGroup from "../../../public/images/wafw/whiteboard-group.jpg";
import classroomActivity from "../../../public/images/wafw/classroom-activity.jpg";
import classroomSession from "../../../public/images/wafw/classroom-session.jpg";
import facilitatorSession from "../../../public/images/wafw/facilitator-session.jpg";
import openForum from "../../../public/images/wafw/open-forum.jpg";
import jerrieSpeaking from "../../../public/images/wafw/jerrie-speaking.jpg";
import jerrieSiteVisit from "../../../public/images/wafw/jerrie-site-visit.jpg";
import jerrieHeadshot from "../../../public/images/wafw/jerrie-ueberle.jpeg";
import karenNair from "../../../public/images/wafw/karen-nair.jpeg";
import ruthAnneWood from "../../../public/images/wafw/ruth-anne-wood.png";
import sebastianKnauer from "../../../public/images/wafw/sebastian-knauer.jpeg";
import marinaReimann from "../../../public/images/wafw/marina-reimann.jpeg";
import jessieHuang from "../../../public/images/wafw/jessie-huang.jpeg";

// Editorial content for the public site. Wording and photos come from the
// organization's own site, wafw.org (Nov 2026), plus the eight-module
// curriculum from WAFW's program materials. Not pulled from the database.

export type Photo = { src: StaticImageData; alt: string; caption?: string };

export const org = {
  name: "World Academy for the Future of Women",
  shortName: "WAFW",
  parent: "Global Interactions, Inc.",
  founder: "Jerrie Ueberle",
  founderTitle: "Founder & Executive Director",
  founded: 2009,
  foundedAt: "Sias International University in China",
  location: "Phoenix, Arizona, USA",
  taxStatus: "501(c)(3) nonprofit organization",
};

export const contact = {
  email: "info@globalinteractions.org",
  donateUrl: "https://www.paypal.com/ncp/payment/6L97VEZLVRUCQ",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wafw/" },
    { label: "Facebook", href: "https://www.facebook.com/wafwusa/" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@worldacademyforthefutureof3775",
    },
  ],
};

export function mailto(subject?: string) {
  return subject
    ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${contact.email}`;
}

// ---------------------------------------------------------------- photos ---

export const photos = {
  group: {
    src: groupPhoto,
    alt: "WAFW community members gathered for a group photo",
  },
  sias: {
    src: siasStudents,
    alt: "Student members of the World Academy for the Future of Women at Sias International University in China.",
    caption:
      "WAFW students at Sias International University, China (2014). Photo by Manuel Guillot, via Wikimedia Commons. Licensed under CC BY-SA 3.0. No changes made.",
  },
  karatina: {
    src: karatina,
    alt: "A group holding collage boards outside the Karatina University building",
    caption: "Group photo outside Karatina University.",
  },
  whiteboard: {
    src: whiteboardGroup,
    alt: "Academy participants standing together in front of a classroom whiteboard",
  },
  classroomActivity: {
    src: classroomActivity,
    alt: "Participants standing and talking during a classroom activity",
  },
  classroomSession: {
    src: classroomSession,
    alt: "Participants listening during a classroom session",
  },
  facilitatorSession: {
    src: facilitatorSession,
    alt: "A facilitator speaking with participants in a group session",
  },
  openForum: {
    src: openForum,
    alt: "An audience taking part in an open forum",
  },
  jerrieSpeaking: {
    src: jerrieSpeaking,
    alt: "Jerrie Ueberle holding a microphone while speaking",
    caption: "Jerrie Ueberle speaking to a group.",
  },
  jerrieSiteVisit: {
    src: jerrieSiteVisit,
    alt: "Jerrie Ueberle speaking with students during a site visit",
    caption: "Jerrie Ueberle meeting with students during a site visit.",
  },
} satisfies Record<string, Photo>;

// ------------------------------------------------------------------ home ---

export const home = {
  headline: "Empowering women to lead change worldwide.",
  subhead:
    "Developing university women for global leadership through purpose, action, and service.",
  intro: {
    title: "Building leaders. Transforming communities.",
    body: "WAFW brings university students together with international facilitators, mentors, and partners to build leadership skills and contribute to their communities.",
    items: [
      {
        title: "Leadership development",
        body: "Build confidence, skills, and purpose through experiential learning and mentorship.",
      },
      {
        title: "Global connections",
        body: "Learn with international facilitators, mentors, and partners who encourage collaboration and growth.",
      },
      {
        title: "Community impact",
        body: "Turn leadership education into projects that address challenges in local communities.",
      },
    ],
  },
  action: {
    title: "Leadership through action",
    body: "Academy members put their learning into practice through mentoring, cross-cultural collaboration, and community projects.",
  },
  global: {
    title: "From local leadership to global connection",
    body: "Founded at Sias University in China in 2009, WAFW has grown through university partnerships and the contribution of an international volunteer community.",
  },
  cta: {
    title: "Be part of the change",
    body: "Volunteer, mentor, partner, or support our mission. Your experience and commitment can help the next generation of women lead.",
  },
};

/** Countries in the Academy network (wafw.org/where-we-work). */
export const programCountries = [
  "Bangladesh",
  "China",
  "India",
  "Kenya",
  "Mexico",
  "Nepal",
  "Uganda",
];

// ----------------------------------------------------------------- about ---

export const about = {
  title: "Empowering Women to Lead Change Worldwide",
  intro:
    "The World Academy for the Future of Women (WAFW) helps university women discover their purpose, develop leadership skills, and contribute to their communities.",
  story: [
    "Founded in 2009, the World Academy for the Future of Women began at Sias International University in China with a bold vision: to equip young women with the leadership skills, confidence, and opportunities needed to make a difference in their communities.",
    "International facilitators, mentors, and university partners support students as they turn their ideas into action.",
  ],
  impact:
    "From its beginnings in China, WAFW has grown through university partnerships and an international volunteer community. Students apply their learning to projects that respond to local needs.",
  founderBio:
    "Jerrie Ueberle founded the World Academy for the Future of Women in 2009 at Sias International University in China. As founder and president of Global Interactions, Inc., she has dedicated decades to fostering international understanding, educational partnerships, and leadership opportunities. Her vision for WAFW was to empower women to discover their purpose, develop their leadership potential, and become agents of meaningful change in their communities and around the world.",
  founderPhoto: {
    src: jerrieHeadshot,
    alt: "Jerrie Ueberle, founder of WAFW",
  } satisfies Photo,
  leadershipIntro:
    "Meet the professionals supporting WAFW’s programs, mentoring community, facilitators, and global alum network.",
};

export const mission =
  "The World Academy for the Future of Women is dedicated to promoting and accelerating the advancement of women worldwide. Through leadership development, mentorship, and experiential learning, WAFW empowers women to discover their purpose, pursue their passions, and become catalysts for positive change in their communities and beyond.";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  photo: StaticImageData;
}

export const leadership: Leader[] = [
  {
    name: "Karen Nair",
    role: "Chief Administrative Officer",
    bio: "Karen brings more than 15 years of community college teaching experience and over 20 years at IBM, where her work spanned software development, training, and customer support. She facilitated WAFW’s program in Mexico in 2024.",
    photo: karenNair,
  },
  {
    name: "Ruth Anne Wood",
    role: "Director of Mentor Recruitment & Coordination",
    bio: "Ruth Anne joined WAFW as a facilitator in China in 2018 and has also mentored students remotely. Her work includes arts-based community engagement and participation in WAFW’s United Nations Task Force.",
    photo: ruthAnneWood,
  },
  {
    name: "Sebastian Knauer",
    role: "Director of Site Selection & Management",
    bio: "Sebastian facilitated WAFW’s program at Sias University during the 2020–2021 academic year and later in Mexico. He brings cross-cultural leadership and automotive market research experience, including senior roles with SAIC Volkswagen and Volkswagen Group.",
    photo: sebastianKnauer,
  },
  {
    name: "Marina Reimann",
    role: "Co-Director of Facilitator Recruitment & Organization",
    bio: "Marina began with WAFW as a mentor before becoming a facilitator. She has served as an empowerment and diversity ambassador in the automotive industry and brings international experience in project management, process management, and digital business.",
    photo: marinaReimann,
  },
  {
    name: "Jessie Huang",
    role: "Director of Alum Relations",
    bio: "A WAFW alum from Sias University, Jessie has supported student leadership teams, international facilitators, and the Annual Women’s Symposium as executive assistant to the founder. She earned a master’s in Educational Leadership & Management from the University of Nottingham in 2024.",
    photo: jessieHuang,
  },
];

// --------------------------------------------------------------- program ---

export const program = {
  tagline: "Purpose. Practice. Possibility.",
  title: "Discover your capacity to lead.",
  intro:
    "WAFW helps university students develop leadership through self-discovery, collaboration, mentoring, and community action.",
  actionTitle: "Learning that becomes action",
  actionBody:
    "Our purpose is to advance women’s leadership worldwide. Participants explore what matters to them, practice new ways of leading, and work with others on projects connected to the United Nations Sustainable Development Goals.",
  pathwayIntro:
    "The Academy’s four-level model builds leadership practice over successive academic years.",
  mensAcademy:
    "WAFW also includes a Men’s Academy for the Future of Women, supporting collaborative work toward the advancement of women.",
  nextStep:
    "Ask about opportunities at a partner institution, volunteering as a mentor or facilitator, or bringing the Academy to your campus.",
};

/** The three program pillars (wafw.org/our-program). */
export const pillars = [
  {
    title: "Find your purpose",
    description:
      "Discover your strengths, clarify your goals, and build the confidence to contribute.",
  },
  {
    title: "Practice with others",
    description:
      "Learn through facilitated modules, mentoring relationships, discussion, and collaboration.",
  },
  {
    title: "Lead in your community",
    description:
      "Apply leadership skills through projects that respond to community needs and support gender equality, social justice, and human dignity.",
  },
];

export const pathway = [
  {
    step: "01",
    verb: "Discover",
    title: "First Year World Academy",
    body: "Build foundations in personal leadership and participation.",
  },
  {
    step: "02",
    verb: "Develop",
    title: "Advanced World Academy",
    body: "Expand your skills and take on greater leadership responsibility.",
  },
  {
    step: "03",
    verb: "Apply",
    title: "World Academy in Action",
    body: "Contribute through leadership and project teams with growing independence.",
  },
  {
    step: "04",
    verb: "Connect",
    title: "World Academy Worldwide",
    body: "Connect across locations and strengthen your contribution as a global citizen.",
  },
];

/** The eight facilitated modules, by title (WAFW program materials). */
export const modules = [
  "Being a World Academy Member",
  "Knowing Yourself as a Leader",
  "Personal Goals and Plan Development",
  "Capacity and Team Building",
  "Resolving Issues and Challenges",
  "Powerful Presentations",
  "Marketing, Engagement, Recruitment, and Enrollment",
  "Lessons Learned and Legacy for Leadership",
];

// --------------------------------------------------------- where we work ---

export const whereWeWork = {
  tagline: "A global community",
  title: "Local learning. Shared purpose.",
  intro:
    "WAFW connects university communities and international volunteers through leadership development and collaboration.",
  networkTitle: "Academies across borders",
  networkBody:
    "Our Academy network spans seven countries, bringing together students, mentors, facilitators, alumni, and partners.",
  roots: [
    {
      country: "China",
      body: "WAFW began at Sias University in 2009, establishing the foundation for its university-based leadership model.",
    },
    {
      country: "Nepal",
      body: "The Academy’s university partnerships have included Orchid International College in Kathmandu.",
    },
    {
      country: "Bangladesh",
      body: "WAFW’s partnerships have included the University of Liberal Arts Bangladesh in Dhaka.",
    },
  ],
  rootsOutro:
    "Across locations, the Academy combines a shared commitment to women’s leadership with local relationships and community action.",
  connect:
    "Contact WAFW for current participation opportunities, local campus contacts, or a conversation about a new university partnership.",
};

// ------------------------------------------------------------- symposium ---

export const symposium = {
  tagline: "Connection and leadership",
  intro:
    "Bringing the Academy community together to share experience, build connections, and advance women’s leadership.",
  commitmentTitle: "Celebrating a shared commitment",
  commitmentBody:
    "The Annual Women’s Symposium is part of WAFW’s history of bringing people together around women’s leadership. Students, facilitators, alumni, and partners contribute to the Academy community through learning, relationships, and service.",
  pillars: [
    {
      title: "Leadership",
      body: "Connect with the mission of empowering women to discover their purpose and capacity to lead.",
    },
    {
      title: "Community",
      body: "Build connections across the Academy’s student, alumni, mentor, and facilitator networks.",
    },
    {
      title: "Contribution",
      body: "Explore how shared experience and collaboration can support meaningful action.",
    },
  ],
  archive: {
    date: "May 13–15, 2016",
    title: "The 10th Annual Women’s Symposium",
    body: "The 2016 event program listed speakers from education, culture, business, and sustainability. Listed speakers included Marek Wosinski of Arizona State University and Zachary M. Walker of Singapore’s National Institute of Education.",
    pdf: "https://www.ipwsconnect.com/wp-content/uploads/2016/08/WAFW-2016.pdf",
  },
  ask: "For information about the next symposium, participation, or ways to contribute, contact the WAFW team.",
};

// ---------------------------------------------------------- get involved ---

export const getInvolved = {
  tagline: "Contribute your experience",
  title: "Help the next generation lead.",
  intro:
    "Bring your time, skills, and connections to a community committed to advancing women’s leadership.",
  roles: [
    {
      title: "Become a mentor",
      body: "Support an Academy member through conversation, encouragement, and an ongoing commitment to her growth. WAFW provides orientation and helps coordinate mentoring relationships.",
    },
    {
      title: "Become a facilitator",
      body: "Guide leadership learning at a partner campus. Facilitators are volunteers who take part in preparation and certification; contact WAFW to confirm current assignment lengths and availability.",
    },
    {
      title: "Partner with WAFW",
      body: "Explore a university partnership, offer professional expertise, or connect the Academy with people and resources that support its mission.",
    },
  ],
  more: [
    {
      title: "Stay connected as an alum",
      body: "Share your experience, reconnect with the Academy community, and explore opportunities to mentor, facilitate, or support student projects.",
    },
    {
      title: "Support the mission",
      body: "Help sustain leadership development through a donation, sponsorship conversation, or an introduction to a potential supporter.",
    },
  ],
  start:
    "Email us with your area of interest, relevant experience, location, and availability. The WAFW team can help you explore a suitable next step.",
};

/** wafw.org/get-involved — "Become a facilitator". */
export const facilitatorRole =
  "Guide leadership learning at a partner campus. Facilitators are volunteers who take part in preparation and certification.";

// --------------------------------------------------------- news & stories ---

export const news = {
  tagline: "From our community",
  title: "People. Purpose. Leadership.",
  intro:
    "Meet the people behind WAFW and explore projects and milestones from the Academy’s history.",
  journeys: [
    {
      title: "From Academy member to alum leader",
      body: "Jessie Huang brings her experience as a Sias University alum and executive assistant to WAFW’s founder to her work connecting the Academy’s alumni community.",
    },
    {
      title: "Mentoring across borders",
      body: "Ruth Anne Wood began facilitating with WAFW in China in 2018 and later mentored students remotely, contributing to a community that learns and leads across distances.",
    },
    {
      title: "Experience in service of leadership",
      body: "Karen Nair brings experience from community college teaching and IBM to WAFW’s work, including facilitating the Academy’s program in Mexico in 2024.",
    },
  ],
  projectsIntro:
    "Earlier Academy initiatives show how participants put leadership into practice through education, enterprise, and community service.",
  projects: [
    {
      kicker: "Education & community",
      title: "Literacy Project",
      body: "The Give a Book, Get a Smile initiative documented a book donation by Danielle Hampson to WAFW’s Literacy Project in Xinzheng, Henan Province, China.",
      meta: "Participant record · 2014",
      link: {
        label: "Partner account: The Authors Show",
        href: "https://wnbnetworkwest.com/give-book-get-smile",
      },
    },
    {
      title: "Marketplace Project",
      body: "Academy alum Betsy Huang described a student project selling products, including handicrafts made by rural women. Participants practiced marketing, stock management, and budgeting, with revenue supporting charitable projects.",
      meta: "Participant record · 2013",
      link: {
        label: "Betsy Huang’s project account",
        href: "https://cn.linkedin.com/in/betsy-huang-2452a0a4/en",
      },
    },
    {
      title: "Sunshine Angels",
      body: "Participant Harrily Han described volunteering at a special education school in Xinzheng, helping children practice English and other skills and taking part in games.",
      meta: "Participant record",
      link: {
        label: "Harrily Han’s project account",
        href: "https://cn.linkedin.com/in/harrily-han-86445b83",
      },
    },
  ],
  awardsIntro:
    "These historical honors recognize founder Jerrie Ueberle’s contribution to women’s leadership.",
  awards: [
    {
      year: "2021",
      org: "IPWS",
      title: "Lifetime Achievement Award",
      body: "The International Professional Women’s Society named Jerrie Ueberle its 2021 Lifetime Achievement Award recipient.",
      link: {
        label: "IPWS award history",
        href: "https://ipwsconnect.com/women-leadership-awards-2/",
      },
    },
    {
      year: "2019",
      org: "Sias University",
      title: "Outstanding Contribution Award",
      body: "Jerrie’s published account records recognition for creating WAFW during Sias University’s twentieth-anniversary celebration, as the Academy marked ten years.",
      link: {
        label: "Jerrie’s award announcement",
        href: "https://www.linkedin.com/posts/jerrieueberle_wafw-activity-6539294929527595008-z7mI",
      },
    },
    {
      year: "2017",
      org: "Sisterhood Extravaganza",
      title: "Ladies Leading a Legacy",
      body: "Jerrie received this honor in Phoenix in March 2017 for her contribution to educational and career opportunities for women.",
      link: {
        label: "Read the 2017 announcement",
        href: "https://www.24-7pressrelease.com/press-release/436221/jerrie-ueberle-founder-of-world-academy-for-the-future-of-women-receives-ladies-leading-a-legacy-award",
      },
    },
  ],
  share:
    "Are you an alum, student, mentor, facilitator, or partner with an experience to share? Contact the team to discuss a story for the WAFW community.",
};

// ---------------------------------------------------------------- contact ---

export const contactPage = {
  tagline: "Let’s connect",
  title: "Your next step starts with a conversation.",
  intro:
    "Ask about the Academy, volunteering, partnerships, alumni connections, or supporting WAFW’s mission.",
  include: [
    "Your name and preferred contact details",
    "Your country or time zone",
    "Your interest in programs, volunteering, partnerships, alumni, or donations",
  ],
  includeNote:
    "For program inquiries, please include your university or institution.",
  starting: [
    {
      title: "Students & universities",
      body: "Explore the leadership program and ask about participating or hosting an Academy.",
    },
    {
      title: "Mentors & facilitators",
      body: "Share your professional experience, availability, and interest in contributing.",
    },
    {
      title: "Supporters & partners",
      body: "Connect with the team about giving, collaboration, or organizational partnerships.",
    },
  ],
};

// ----------------------------------------------------------------- donate ---

export const donate = {
  tagline: "Invest in possibility",
  title: "Support women who lead change.",
  intro:
    "Help sustain a global community of university students, volunteer mentors, facilitators, and partners working to advance women’s leadership.",
  workTitle: "Be part of the work",
  workBody:
    "WAFW brings people together to help young women discover their purpose, strengthen their leadership, and contribute to their communities. Your contribution helps sustain this work.",
  pillars: [
    {
      title: "Leadership learning",
      body: "Support the Academy’s work in developing confidence, skills, and purposeful action.",
    },
    {
      title: "A connected community",
      body: "Strengthen the work of mentors, facilitators, alumni, and university partners.",
    },
    {
      title: "Community contribution",
      body: "Help create opportunities for students to put leadership into practice.",
    },
  ],
  contribute:
    "Use WAFW’s existing PayPal donation page to choose your contribution amount and payment method.",
  other:
    "For sponsorship, organizational partnerships, or questions about giving, contact the WAFW team.",
};
