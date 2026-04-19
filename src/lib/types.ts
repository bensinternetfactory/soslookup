// Type definitions for Dover Watch data. Every entity resolves to a citation
// back to a source document or official web page. Mock data lives in data.ts.

export type ISODate = string; // YYYY-MM-DD
export type ISODateTime = string; // YYYY-MM-DDTHH:mm:ssZ

export type Ward = {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  name: string;
  tagline: string;
  populationApprox: number;
  neighborhoods: string[];
};

export type Role =
  | "mayor"
  | "deputy-mayor"
  | "councilor"
  | "school-board"
  | "state-rep"
  | "state-senator"
  | "county-commissioner"
  | "us-house"
  | "us-senate";

export type Body =
  | "City Council"
  | "School Board"
  | "NH House"
  | "NH Senate"
  | "Strafford County"
  | "US House"
  | "US Senate";

export type Representative = {
  slug: string;
  name: string;
  role: Role;
  body: Body;
  ward?: number;
  district?: string;
  party?: "D" | "R" | "I" | "nonpartisan";
  termStart: ISODate;
  termEnd: ISODate;
  email?: string;
  phone?: string;
  bio: string;
  committees?: string[];
  meetingAttendancePct?: number;
  votesCast?: number;
  sponsored?: number;
  photoInitials: string;
};

export type MeetingBody =
  | "City Council"
  | "School Board"
  | "Planning Board"
  | "Zoning Board of Adjustment"
  | "Conservation Commission"
  | "Budget Committee"
  | "Parks & Recreation"
  | "Downtown Committee";

export type AgendaItem = {
  number: string;
  title: string;
  kind: "public-hearing" | "ordinance" | "resolution" | "report" | "discussion" | "consent" | "new-business";
  summary: string;
  sponsor?: string;
  documentCount?: number;
  relatedVendor?: string;
};

export type Meeting = {
  slug: string;
  body: MeetingBody;
  date: ISODateTime;
  location: string;
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
  agenda: AgendaItem[];
  videoUrl?: string;
  packetUrl?: string;
  minutesUrl?: string;
  publicCommentOpen?: boolean;
};

export type BidStatus = "open" | "evaluation" | "awarded" | "cancelled" | "no-bids";

export type BidCategory =
  | "construction"
  | "professional-services"
  | "supplies"
  | "IT"
  | "vehicles"
  | "utilities"
  | "consulting"
  | "maintenance";

export type Submission = {
  vendorSlug: string;
  amount: number;
  notes?: string;
  isLocal?: boolean;
};

export type Bid = {
  id: string;
  title: string;
  department: string;
  category: BidCategory;
  publishedAt: ISODate;
  dueAt: ISODateTime;
  estimatedValue?: number;
  status: BidStatus;
  location?: { lat: number; lng: number; address: string };
  summary: string;
  submissions?: Submission[];
  awardedTo?: string; // vendorSlug
  awardedAmount?: number;
  awardedAt?: ISODate;
  documentCount: number;
  unopposed?: boolean;
  soleSource?: boolean;
};

export type Vendor = {
  slug: string;
  name: string;
  dbaAliases?: string[];
  category: BidCategory[];
  stateOfFormation: string; // e.g. "NH", "DE"
  isLocal: boolean; // Dover or immediate Seacoast
  yearFirstAwarded: number;
  totalWins: number;
  totalBids: number;
  lifetimeAwardCents: number; // store as cents to avoid float error
  activeContracts: number;
  sosEntityId?: string;
  principals?: { name: string; title: string }[];
  address?: string;
  note?: string;
};

export type BudgetNode = {
  name: string;
  amountCents: number;
  prevYearCents?: number;
  children?: BudgetNode[];
  category?: "operations" | "capital" | "debt" | "schools" | "enterprise";
};

export type TaxRateYear = {
  year: number;
  cityRate: number; // per $1000 assessed value
  schoolRate: number;
  countyRate: number;
  stateRate: number;
  totalRate: number;
};
