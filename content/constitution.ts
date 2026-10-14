/**
 * DPC constitution. Edit text here; /constitution renders it.
 * Rule of thumb: don't add numbers (fees, counts, thresholds) until the committee has agreed them.
 */
export const constitutionMeta = {
  lastUpdated: "2026-10-14"
};

export type Article = { id: string; title: string; clauses: string[] };

export const preamble =
  "We, the students of Daffodil International Academy, continue the DIA Programming Club, founded on 21 June 2015, as a community where students learn to code, create real things and connect with each other and the wider technology community. We commit to curiosity, collaboration, integrity and open learning for every student, whatever their class, year or skill level.";

export const articles: Article[] = [
  {
    id: "name",
    title: "Name, nature and identity",
    clauses: [
      "The official name of the club is DIA Programming Club - DPC (\"DPC\" or \"the club\").",
      "DPC was founded on 21 June 2015 at Daffodil International Academy (DIA), Dhaka, Bangladesh.",
      "DPC is a student-led, non-profit and non-political club operating under the approval and guidance of the DIA authority.",
      "The club's tagline is CODE · CREATE · CONNECT.",
      "The club's official website is diapc.dev and its official email is hi@diapc.dev."
    ]
  },
  {
    id: "aims",
    title: "Aims and objectives",
    clauses: [
      "To promote programming, software development and emerging technology among DIA students.",
      "To organize workshops, contests, hackathons, seminars, study circles and other learning activities.",
      "To help members build real projects and gain practical, career-relevant skills.",
      "To represent DIA in competitions and events where appropriate.",
      "To collaborate with other clubs, communities, institutions and organizations.",
      "To keep the club welcoming and supportive for beginners."
    ]
  },
  {
    id: "membership",
    title: "Membership",
    clauses: [
      "General Member: any currently enrolled DIA student who registers with the club and agrees to this constitution and the code of conduct.",
      "Associate Member: a participant from outside DIA (for example from a partner club) who joins specific activities. Associate members do not vote or hold office.",
      "Alumni Member: a former DIA student who stays connected with the club. Alumni may mentor and advise but do not vote or hold office.",
      "Honorary Member: a person invited by the Executive Committee in recognition of an exceptional contribution.",
      "Any cost for a specific activity is announced in advance. Membership terms are set by the Executive Committee and published to members.",
      "Members may attend activities, join wings, propose events and projects, vote in elections and stand for office when eligible.",
      "Members are expected to follow the code of conduct and DIA rules and to take part in good faith.",
      "Membership ends on resignation, on leaving DIA (when the person may become an Alumni Member) or by removal under the conduct article."
    ]
  },
  {
    id: "structure",
    title: "Structure and governance",
    clauses: [
      "Advisor(s): the DIA authority appoints one or more teacher advisors who guide the club, review major decisions and act as the link with the DIA authority.",
      "Executive Committee: the elected student leadership of the club. Its positions (such as President, Vice President, General Secretary and Treasurer) are defined by the committee and published on the website.",
      "Wing and team leads: the Executive Committee may appoint leads for wings and for teams such as events, design and media, partnerships, content and web.",
      "A person may hold only one Executive Committee position at a time.",
      "The President leads the club and represents it; the General Secretary keeps records and minutes; the Treasurer keeps transparent financial records; other roles are described when created."
    ]
  },
  {
    id: "wings",
    title: "Wings",
    clauses: [
      "A wing is a focused sub-community within DPC dedicated to one area, such as cloud computing, competitive programming, AI, web and app development or cybersecurity.",
      "The AWS Student Builders Group at Daffodil International Academy (aws.diapc.dev) is a wing of DPC. It follows this constitution and the rules of the AWS Student Builders Group program. Where program rules govern the use of AWS names, logos or resources, those rules prevail for that matter.",
      "Members may propose a new wing with a short written charter covering its purpose, planned activities and proposed lead. The Executive Committee reviews the proposal with the advisor's consent.",
      "Each wing has a lead who reports to the Executive Committee. A wing that becomes inactive may be paused by the Executive Committee after hearing from its lead.",
      "Wings may have their own branding within the DPC brand and are listed on the DPC website."
    ]
  },
  {
    id: "elections",
    title: "Elections and tenure",
    clauses: [
      "Executive Committee members serve a fixed term set by the committee and announced before each election.",
      "Candidates must be General Members in good standing who are not under disciplinary action.",
      "Each election is run by a neutral election team, formed with the advisor, whose members are not candidates.",
      "Nominations are announced to all members in advance, followed by a secret ballot (in person or digital). The candidate with the most votes wins; ties are settled by a re-vote.",
      "If a position becomes vacant, the Executive Committee may appoint an interim holder until the next election.",
      "A committee member may be removed for serious misconduct or sustained inactivity by a two-thirds vote of the Executive Committee with the advisor's approval."
    ]
  },
  {
    id: "meetings",
    title: "Meetings and decisions",
    clauses: [
      "The Executive Committee meets regularly. General meetings open to all members are held at least once per academic year.",
      "Decisions are made by consensus where possible, otherwise by simple majority of those present. The chair has a casting vote only in a tie.",
      "Minutes of meetings are recorded and kept in the club archive."
    ]
  },
  {
    id: "finance",
    title: "Finance",
    clauses: [
      "DPC is non-profit. Any funds are used only for club activities.",
      "Funds may come from DIA, approved sponsorships, event contributions or donations, always with the advisor's knowledge.",
      "Every income and expense is recorded with receipts, and a summary is available to members on request.",
      "No office-bearer may personally benefit from club funds."
    ]
  },
  {
    id: "collaborations",
    title: "Collaborations",
    clauses: [
      "DPC may collaborate with other clubs, schools, universities, communities and organizations to co-host events and projects.",
      "Collaborations involving funds, DIA's name or premises, or formal commitments need Executive Committee approval and the advisor's consent.",
      "Partners and the club credit each other accurately. Sponsorship never gives a sponsor control over club decisions."
    ]
  },
  {
    id: "conduct",
    title: "Code of conduct and discipline",
    clauses: [
      "Members treat everyone with respect. Harassment, bullying, discrimination and intimidation, online or offline, are not allowed.",
      "Cheating, plagiarism and misrepresentation in competitions and club activities are prohibited. Members credit others' work honestly.",
      "Members follow DIA rules, the law and the terms of any platform or program the club uses.",
      "Complaints go to the General Secretary or the advisor. The person concerned is given a chance to respond before a decision is recorded.",
      "Outcomes range from a warning to suspension, removal from office or removal from membership. Serious matters are referred to the DIA authority.",
      "Complaints are handled confidentially, and retaliation against a complainant is itself a violation.",
      "The club does not publish anyone's private information or photos without consent and honours removal requests."
    ]
  },
  {
    id: "assets",
    title: "Digital assets",
    clauses: [
      "The website, domains, social media accounts, email addresses, repositories and cloud accounts used by DPC belong to the club, not to any individual.",
      "Access is shared with the advisor or a person designated by the DIA authority, and outgoing office-bearers hand over all access to their successors.",
      "Projects built by members remain theirs unless agreed otherwise in writing; members allow the club to showcase their work with credit."
    ]
  },
  {
    id: "amendments",
    title: "Amendments",
    clauses: [
      "Amendments may be proposed in writing by the Executive Committee or by members.",
      "Proposed amendments are shared with members before the vote.",
      "An amendment passes with a two-thirds majority at a general meeting and takes effect once approved by the advisor and the DIA authority.",
      "Every adopted amendment is recorded with its date on the website."
    ]
  }
];
