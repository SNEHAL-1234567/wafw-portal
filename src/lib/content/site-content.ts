// Static, editorial content about WAFW. Sourced from the organization's own
// program materials (module list, facilitator records) and its public pages
// at globalinteractions.org and wafw.ulab.edu.bd. Not pulled from the database.

export const org = {
  name: "World Academy for the Future of Women",
  shortName: "WAFW",
  parent: "Global Interactions, Inc.",
  founder: "Jerrie Ueberle",
  founderTitle: "Founder & CEO, Global Interactions",
  location: "Phoenix, Arizona, USA",
  taxStatus: "501(c)(3) nonprofit organization",
};

export const mission =
  "To promote and accelerate the advancement of women in leadership worldwide, with a focus on gender equality, social justice, and human dignity — empowering women to discover their passion, purpose, and path to success, and calling forth the full expression of human possibility through collaborative, inclusive partnership.";

export const tagline = "Every woman a leader. Every leader a legacy.";

export const pillars = [
  {
    title: "Discover Purpose",
    description:
      "Participants uncover their own passion and leadership voice before they're asked to lead anyone else.",
  },
  {
    title: "Build Capacity",
    description:
      "A structured, eight-module curriculum builds practical skills — from teamwork to presentation to enrollment.",
  },
  {
    title: "Lead in Community",
    description:
      "Every cohort is guided by trained, volunteer facilitators who've walked the program themselves.",
  },
  {
    title: "Leave a Legacy",
    description:
      "Graduates go on to mentor, teach, and open the same door for the next woman behind them.",
  },
];

export interface ProgramModule {
  number: number;
  title: string;
  description: string;
}

export const modules: ProgramModule[] = [
  {
    number: 1,
    title: "Being a World Academy Member",
    description:
      "Orientation into the Academy's community, values, and the commitment members make to one another.",
  },
  {
    number: 2,
    title: "Knowing Yourself as a Leader",
    description:
      "Self-discovery work that surfaces each participant's strengths, values, and personal definition of leadership.",
  },
  {
    number: 3,
    title: "Personal Goals and Plan Development",
    description:
      "Turning insight into a concrete personal and professional plan with clear, achievable goals.",
  },
  {
    number: 4,
    title: "Capacity and Team Building",
    description:
      "Practical skills for building, trusting, and leading a team toward a shared goal.",
  },
  {
    number: 5,
    title: "Resolving Issues and Challenges",
    description:
      "Tools for navigating conflict and setbacks with clarity, resilience, and confidence.",
  },
  {
    number: 6,
    title: "Powerful Presentations",
    description:
      "Finding and projecting a confident public voice — a skill every module builds toward.",
  },
  {
    number: 7,
    title: "Marketing, Engagement, Recruitment, and Enrollment",
    description:
      "Learning to bring others in — growing the next cohort and extending the Academy's reach.",
  },
  {
    number: 8,
    title: "Lessons Learned and Legacy for Leadership",
    description:
      "Reflecting on the journey and committing to the legacy each graduate will leave for the women who follow.",
  },
];

export const programCountries = [
  "Bangladesh",
  "China",
  "Nepal",
  "India",
  "Mexico",
  "Kenya",
];

export const facilitatorHomeCountries = [
  "USA",
  "Canada",
  "China",
  "France",
  "Germany",
  "India",
  "Iran",
  "Ireland",
  "Jamaica",
  "Netherlands",
  "South Africa",
  "Spain",
  "Thailand",
  "UK",
  "Australia",
];

export const facilitatorRole =
  "Facilitators are volunteers — men and women who stand for the future of women worldwide. Each one completes a facilitator prep weekend before leading modules on the ground, building relationships around intimacy, action, and intervention.";
