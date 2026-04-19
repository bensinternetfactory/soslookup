// Mock data for Dover Watch. Swap out with real scrapers / API later.
// Every field mirrors the shape of what's actually published on
// dover.nh.gov, the NH General Court, and Strafford County sources.

import type {
  Bid,
  BudgetNode,
  Meeting,
  Representative,
  TaxRateYear,
  Vendor,
  Ward,
} from "./types";

export const WARDS: Ward[] = [
  { number: 1, name: "Ward 1", tagline: "North End & Garrison Hill", populationApprox: 4780, neighborhoods: ["Garrison Hill", "Silver Street", "Arch Street"] },
  { number: 2, name: "Ward 2", tagline: "Downtown & Central Ave", populationApprox: 5020, neighborhoods: ["Downtown", "Central Avenue", "Rogers Street"] },
  { number: 3, name: "Ward 3", tagline: "East Dover & Back River", populationApprox: 4550, neighborhoods: ["Back River", "Dover Point Rd", "Knox Marsh"] },
  { number: 4, name: "Ward 4", tagline: "West Dover & Spur Road", populationApprox: 4610, neighborhoods: ["Spur Road", "Long Hill", "Old Rochester Rd"] },
  { number: 5, name: "Ward 5", tagline: "South End & Cocheco", populationApprox: 4890, neighborhoods: ["Cocheco Mills", "Washington Street", "Henry Law Ave"] },
  { number: 6, name: "Ward 6", tagline: "North Dover & Littleworth", populationApprox: 4390, neighborhoods: ["Littleworth Rd", "Sixth Street", "Glenwood"] },
  { number: 7, name: "Ward 7", tagline: "Bellamy & Sawyer Mill", populationApprox: 4700, neighborhoods: ["Sawyer Mill", "Bellamy River", "Dover Point"] },
];

export const REPRESENTATIVES: Representative[] = [
  { slug: "mayor-sample", name: "Mayor Sample", role: "mayor", body: "City Council", termStart: "2025-01-07", termEnd: "2027-01-05", email: "mayor@dover.nh.gov", phone: "603-516-6006", bio: "Lifelong Dover resident elected mayor in 2024. Served two terms as Ward 4 councilor before running citywide. Professional background in civil engineering.", committees: ["Finance Committee", "Strategic Planning"], meetingAttendancePct: 98, votesCast: 142, sponsored: 11, photoInitials: "MS" },
  { slug: "deputy-mayor-sample", name: "Deputy Mayor Sample", role: "deputy-mayor", body: "City Council", ward: 5, termStart: "2025-01-07", termEnd: "2027-01-05", email: "deputymayor@dover.nh.gov", bio: "Ward 5 councilor serving second term. Selected by council as Deputy Mayor. Former school board member.", committees: ["Public Safety", "Ordinance Review"], meetingAttendancePct: 95, votesCast: 139, sponsored: 7, photoInitials: "DS" },
  { slug: "ward-1-councilor", name: "Councilor Ward One", role: "councilor", body: "City Council", ward: 1, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward1@dover.nh.gov", bio: "First-term councilor. Small business owner on Central Avenue.", committees: ["Downtown Revitalization"], meetingAttendancePct: 92, votesCast: 131, sponsored: 3, photoInitials: "W1" },
  { slug: "ward-2-councilor", name: "Councilor Ward Two", role: "councilor", body: "City Council", ward: 2, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward2@dover.nh.gov", bio: "Three-term councilor, chairs the Budget Committee.", committees: ["Budget", "Finance"], meetingAttendancePct: 100, votesCast: 142, sponsored: 18, photoInitials: "W2" },
  { slug: "ward-3-councilor", name: "Councilor Ward Three", role: "councilor", body: "City Council", ward: 3, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward3@dover.nh.gov", bio: "Educator, focused on schools and parks. Second term.", committees: ["Parks & Recreation", "School Liaison"], meetingAttendancePct: 96, votesCast: 137, sponsored: 6, photoInitials: "W3" },
  { slug: "ward-4-councilor", name: "Councilor Ward Four", role: "councilor", body: "City Council", ward: 4, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward4@dover.nh.gov", bio: "First-term councilor. Background in transportation planning.", committees: ["Transportation Advisory"], meetingAttendancePct: 88, votesCast: 125, sponsored: 4, photoInitials: "W4" },
  { slug: "ward-6-councilor", name: "Councilor Ward Six", role: "councilor", body: "City Council", ward: 6, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward6@dover.nh.gov", bio: "Retired firefighter, second term. Public safety focus.", committees: ["Public Safety"], meetingAttendancePct: 97, votesCast: 138, sponsored: 5, photoInitials: "W6" },
  { slug: "ward-7-councilor", name: "Councilor Ward Seven", role: "councilor", body: "City Council", ward: 7, termStart: "2025-01-07", termEnd: "2027-01-05", email: "ward7@dover.nh.gov", bio: "First-term councilor. Advocate for riverfront access and trails.", committees: ["Conservation", "Open Space"], meetingAttendancePct: 94, votesCast: 133, sponsored: 2, photoInitials: "W7" },
  { slug: "school-board-chair", name: "SB Chair Sample", role: "school-board", body: "School Board", ward: 3, termStart: "2024-11-12", termEnd: "2026-11-03", email: "schoolboard@doverschools.org", bio: "Chair of Dover School Board. Parent of two DHS alums. Second term.", meetingAttendancePct: 100, votesCast: 64, sponsored: 9, photoInitials: "SC" },
  { slug: "school-board-v1", name: "SB Member Ward One", role: "school-board", body: "School Board", ward: 1, termStart: "2024-11-12", termEnd: "2026-11-03", bio: "Ward 1 school board representative.", meetingAttendancePct: 92, votesCast: 60, sponsored: 3, photoInitials: "S1" },
  { slug: "state-rep-strafford-11a", name: "Rep Strafford 11A", role: "state-rep", body: "NH House", district: "Strafford 11", party: "D", termStart: "2025-01-01", termEnd: "2026-12-31", bio: "Representing Strafford District 11. Serves on House Ways & Means Committee.", meetingAttendancePct: 94, photoInitials: "S11" },
  { slug: "state-rep-strafford-11b", name: "Rep Strafford 11B", role: "state-rep", body: "NH House", district: "Strafford 11", party: "R", termStart: "2025-01-01", termEnd: "2026-12-31", bio: "Representing Strafford District 11. Serves on House Education Committee.", meetingAttendancePct: 91, photoInitials: "S11" },
  { slug: "state-rep-strafford-12", name: "Rep Strafford 12", role: "state-rep", body: "NH House", district: "Strafford 12", party: "D", termStart: "2025-01-01", termEnd: "2026-12-31", bio: "Serves on House Finance Committee.", meetingAttendancePct: 89, photoInitials: "S12" },
  { slug: "state-senator-21", name: "NH Senator 21", role: "state-senator", body: "NH Senate", district: "District 21", party: "D", termStart: "2025-01-01", termEnd: "2026-12-31", bio: "State Senate District 21, covering Dover and parts of Strafford County.", photoInitials: "SN" },
  { slug: "strafford-commissioner-1", name: "Commissioner Sample", role: "county-commissioner", body: "Strafford County", district: "Commission District 1", party: "D", termStart: "2023-01-01", termEnd: "2026-12-31", bio: "One of three Strafford County Commissioners.", photoInitials: "SC" },
  { slug: "nh-01-rep", name: "NH-01 U.S. Representative", role: "us-house", body: "US House", district: "NH-01", party: "D", termStart: "2025-01-03", termEnd: "2027-01-03", bio: "U.S. House of Representatives, New Hampshire 1st District.", photoInitials: "US" },
];

function iso(year: number, month: number, day: number, hour = 19, minute = 0): string {
  return new Date(Date.UTC(year, month - 1, day, hour + 4, minute)).toISOString();
}

export const MEETINGS: Meeting[] = [
  {
    slug: "city-council-2026-04-22",
    body: "City Council",
    date: iso(2026, 4, 22),
    location: "Council Chambers, City Hall, 288 Central Ave",
    status: "upcoming",
    packetUrl: "https://www.dover.nh.gov/government/city-government/agendas-and-minutes/",
    publicCommentOpen: true,
    agenda: [
      { number: "1", title: "Call to order & pledge of allegiance", kind: "report", summary: "Opening formalities." },
      { number: "2", title: "Public comment", kind: "discussion", summary: "Open to residents. 3-minute limit per speaker." },
      { number: "3a", title: "Ordinance 26-04: Short-term rental registration", kind: "public-hearing", summary: "Requires hosts to register STRs with the city and collect occupancy fees. Second reading.", sponsor: "Ward 2 Councilor", documentCount: 4 },
      { number: "5b", title: "Award of contract: Central Ave paving (Phase 2)", kind: "resolution", summary: "Award $1.82M Central Avenue repaving contract to Continental Paving (lowest of 4 bidders).", sponsor: "Public Works", documentCount: 8, relatedVendor: "continental-paving" },
      { number: "7c", title: "FY27 Budget: First reading", kind: "report", summary: "City Manager presents proposed $148M budget. Workshop follow-up scheduled for May 6.", documentCount: 12 },
      { number: "9", title: "Appointment: Conservation Commission", kind: "new-business", summary: "Mayor's nomination of new Conservation Commission member for 3-year term." },
    ],
  },
  {
    slug: "school-board-2026-04-21",
    body: "School Board",
    date: iso(2026, 4, 21),
    location: "Woodman Park School, Professional Learning Center",
    status: "upcoming",
    publicCommentOpen: true,
    agenda: [
      { number: "1", title: "Superintendent's report", kind: "report", summary: "Monthly update: enrollment, staffing, state testing." },
      { number: "3", title: "FY27 School budget proposal", kind: "public-hearing", summary: "Proposed $78M school budget. Public hearing required before board vote.", documentCount: 6 },
      { number: "4", title: "Revised cell phone policy", kind: "ordinance", summary: "Policy revision: ban personal cell phones for K-8, bell-to-bell. High school retains existing policy.", documentCount: 2 },
    ],
  },
  {
    slug: "planning-board-2026-04-24",
    body: "Planning Board",
    date: iso(2026, 4, 24),
    location: "City Hall, Auditorium",
    status: "upcoming",
    publicCommentOpen: true,
    agenda: [
      { number: "1", title: "12 Cocheco St: Site plan amendment", kind: "public-hearing", summary: "Applicant proposes adding 14 residential units above existing ground-floor retail.", documentCount: 5 },
      { number: "2", title: "Subdivision: 185 Sixth St", kind: "public-hearing", summary: "3-lot residential subdivision on 2.4 acres.", documentCount: 4 },
      { number: "3", title: "Proposed zoning text amendment: ADUs", kind: "discussion", summary: "Discuss updating ADU regulations to align with recent state law (HB 1291)." },
    ],
  },
  {
    slug: "city-council-2026-04-08",
    body: "City Council",
    date: iso(2026, 4, 8),
    location: "Council Chambers, City Hall",
    status: "completed",
    minutesUrl: "https://www.dover.nh.gov/government/city-government/agendas-and-minutes/",
    videoUrl: "https://www.dover.nh.gov/videos/",
    agenda: [
      { number: "4a", title: "Ordinance 26-03: Water rate adjustment", kind: "ordinance", summary: "Approved 7-2. Base water rate rises 4.2% effective July 1." },
      { number: "6a", title: "Award: IT services (3-year contract)", kind: "resolution", summary: "Awarded to Seacoast IT Solutions at $412k/year.", relatedVendor: "seacoast-it-solutions" },
    ],
  },
  {
    slug: "city-council-2026-03-25",
    body: "City Council",
    date: iso(2026, 3, 25),
    location: "Council Chambers, City Hall",
    status: "completed",
    minutesUrl: "https://www.dover.nh.gov/government/city-government/agendas-and-minutes/",
    agenda: [
      { number: "5a", title: "Award: Fleet vehicle purchase (2 plow trucks)", kind: "resolution", summary: "Awarded to Boston Peterbilt at $318k combined.", relatedVendor: "boston-peterbilt" },
      { number: "7b", title: "Resolution: Central Ave corridor study", kind: "resolution", summary: "Authorizing RFP for Central Avenue corridor redesign study." },
    ],
  },
];

export const VENDORS: Vendor[] = [
  { slug: "continental-paving", name: "Continental Paving, Inc.", category: ["construction", "maintenance"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2014, totalWins: 22, totalBids: 31, lifetimeAwardCents: 1_482_000_000, activeContracts: 3, sosEntityId: "NH-000412119", principals: [{ name: "D. Continental", title: "President" }], address: "Londonderry, NH", note: "Consistent winner on mid-size paving contracts across the Seacoast." },
  { slug: "seacoast-it-solutions", name: "Seacoast IT Solutions LLC", category: ["IT", "professional-services"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2019, totalWins: 8, totalBids: 14, lifetimeAwardCents: 298_400_000, activeContracts: 2, principals: [{ name: "R. Chen", title: "Managing Member" }], address: "Portsmouth, NH" },
  { slug: "boston-peterbilt", name: "Boston Peterbilt", category: ["vehicles"], stateOfFormation: "MA", isLocal: false, yearFirstAwarded: 2018, totalWins: 6, totalBids: 9, lifetimeAwardCents: 187_200_000, activeContracts: 1 },
  { slug: "granite-state-engineering", name: "Granite State Engineering LLP", category: ["professional-services", "consulting"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2011, totalWins: 19, totalBids: 28, lifetimeAwardCents: 642_800_000, activeContracts: 4, principals: [{ name: "P. Granite", title: "Managing Partner" }], address: "Concord, NH" },
  { slug: "nh-pipe-works", name: "NH Pipe Works Inc.", category: ["utilities", "construction"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2016, totalWins: 11, totalBids: 17, lifetimeAwardCents: 812_300_000, activeContracts: 2, address: "Dover, NH" },
  { slug: "cocheco-landscape", name: "Cocheco Landscape Co.", category: ["maintenance"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2020, totalWins: 5, totalBids: 8, lifetimeAwardCents: 47_500_000, activeContracts: 1, address: "Dover, NH" },
  { slug: "northeast-signal", name: "Northeast Signal Services", category: ["construction", "maintenance"], stateOfFormation: "ME", isLocal: false, yearFirstAwarded: 2017, totalWins: 4, totalBids: 12, lifetimeAwardCents: 124_100_000, activeContracts: 1 },
  { slug: "atlantic-architecture", name: "Atlantic Architecture Group", category: ["professional-services", "consulting"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2013, totalWins: 9, totalBids: 15, lifetimeAwardCents: 432_600_000, activeContracts: 2, address: "Portsmouth, NH" },
  { slug: "summit-electrical", name: "Summit Electrical Contractors", category: ["construction", "maintenance"], stateOfFormation: "NH", isLocal: false, yearFirstAwarded: 2015, totalWins: 7, totalBids: 11, lifetimeAwardCents: 219_400_000, activeContracts: 1, address: "Manchester, NH" },
  { slug: "dover-fuel", name: "Dover Fuel & Oil", category: ["supplies", "utilities"], stateOfFormation: "NH", isLocal: true, yearFirstAwarded: 2010, totalWins: 13, totalBids: 15, lifetimeAwardCents: 298_000_000, activeContracts: 1, address: "Dover, NH", note: "Annual heating oil contract; often single-bid in recent years." },
];

function today() {
  return new Date();
}
function inDays(n: number): string {
  const d = today();
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString();
}
function daysAgo(n: number): string {
  const d = today();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

export const BIDS: Bid[] = [
  {
    id: "IFB-26-018",
    title: "Central Avenue Paving Phase 2",
    department: "Public Works",
    category: "construction",
    publishedAt: daysAgo(21),
    dueAt: inDays(7),
    estimatedValue: 1_900_000_00,
    status: "open",
    summary: "Mill and overlay of Central Avenue from Silver Street to Sixth Street, including ADA ramp upgrades at 14 intersections. Night-work required for downtown segment.",
    location: { lat: 43.1979, lng: -70.8739, address: "Central Ave, Dover, NH" },
    documentCount: 11,
  },
  {
    id: "RFP-26-021",
    title: "Municipal Fiber Network Feasibility Study",
    department: "Information Technology",
    category: "consulting",
    publishedAt: daysAgo(14),
    dueAt: inDays(14),
    estimatedValue: 175_000_00,
    status: "open",
    summary: "Feasibility study for municipal-owned fiber to connect all 18 city buildings. Scope includes cost estimation, regulatory analysis, and vendor landscape review.",
    documentCount: 4,
  },
  {
    id: "IFB-26-019",
    title: "Henry Law Park Playground Equipment",
    department: "Parks & Recreation",
    category: "supplies",
    publishedAt: daysAgo(10),
    dueAt: inDays(18),
    estimatedValue: 245_000_00,
    status: "open",
    summary: "Replacement playground structure for Henry Law Park, ages 5-12, ADA-compliant, with rubberized safety surfacing.",
    location: { lat: 43.1933, lng: -70.8716, address: "Henry Law Ave, Dover, NH" },
    documentCount: 5,
  },
  {
    id: "IFB-26-017",
    title: "Annual Heating Oil Supply",
    department: "General Services",
    category: "supplies",
    publishedAt: daysAgo(35),
    dueAt: daysAgo(14),
    estimatedValue: 420_000_00,
    status: "evaluation",
    summary: "Annual heating oil supply contract for 18 city facilities. Fixed-rate with collar clause.",
    documentCount: 3,
    unopposed: true,
    submissions: [{ vendorSlug: "dover-fuel", amount: 418_300_00, isLocal: true }],
  },
  {
    id: "RFP-26-014",
    title: "Downtown Corridor Redesign Study",
    department: "Planning",
    category: "professional-services",
    publishedAt: daysAgo(60),
    dueAt: daysAgo(30),
    estimatedValue: 385_000_00,
    status: "evaluation",
    summary: "Comprehensive Central Avenue corridor redesign concept plan, including pedestrian, bike, transit, and streetscape elements.",
    documentCount: 9,
    submissions: [
      { vendorSlug: "atlantic-architecture", amount: 378_000_00, isLocal: true },
      { vendorSlug: "granite-state-engineering", amount: 394_500_00, isLocal: true },
    ],
  },
  {
    id: "IFB-25-112",
    title: "Two (2) Plow Trucks — Chassis & Body",
    department: "Public Works",
    category: "vehicles",
    publishedAt: "2025-10-04",
    dueAt: "2025-11-01T00:00:00Z",
    estimatedValue: 340_000_00,
    status: "awarded",
    summary: "Two plow trucks for winter fleet refresh. Heavy-duty chassis with dump body and 11ft plow.",
    documentCount: 6,
    submissions: [
      { vendorSlug: "boston-peterbilt", amount: 318_400_00 },
      { vendorSlug: "northeast-signal", amount: 331_900_00 },
    ],
    awardedTo: "boston-peterbilt",
    awardedAmount: 318_400_00,
    awardedAt: "2025-11-18",
  },
  {
    id: "RFP-25-099",
    title: "Three-Year IT Managed Services",
    department: "Information Technology",
    category: "IT",
    publishedAt: "2025-08-11",
    dueAt: "2025-09-20T00:00:00Z",
    estimatedValue: 1_250_000_00,
    status: "awarded",
    summary: "Managed IT services covering helpdesk, endpoint management, and network monitoring for all city departments.",
    documentCount: 7,
    submissions: [
      { vendorSlug: "seacoast-it-solutions", amount: 1_236_000_00, isLocal: true },
      { vendorSlug: "granite-state-engineering", amount: 1_298_000_00, isLocal: true },
    ],
    awardedTo: "seacoast-it-solutions",
    awardedAmount: 1_236_000_00,
    awardedAt: "2025-10-14",
  },
  {
    id: "IFB-25-088",
    title: "Cocheco Bridge Structural Repair",
    department: "Public Works",
    category: "construction",
    publishedAt: "2025-06-02",
    dueAt: "2025-07-10T00:00:00Z",
    estimatedValue: 2_100_000_00,
    status: "awarded",
    summary: "Structural rehabilitation of the Cocheco Street bridge including deck replacement and bearing assembly.",
    documentCount: 14,
    submissions: [
      { vendorSlug: "nh-pipe-works", amount: 2_045_000_00, isLocal: true },
      { vendorSlug: "continental-paving", amount: 2_097_000_00, isLocal: true },
      { vendorSlug: "summit-electrical", amount: 2_188_000_00 },
    ],
    awardedTo: "nh-pipe-works",
    awardedAmount: 2_045_000_00,
    awardedAt: "2025-08-05",
    location: { lat: 43.1968, lng: -70.8695, address: "Cocheco St Bridge, Dover, NH" },
  },
  {
    id: "IFB-25-071",
    title: "Broadway Storm Drain Replacement",
    department: "Public Works",
    category: "utilities",
    publishedAt: "2025-04-14",
    dueAt: "2025-05-12T00:00:00Z",
    estimatedValue: 612_000_00,
    status: "awarded",
    summary: "Storm drain replacement along Broadway from Sixth to Silver Street.",
    documentCount: 5,
    submissions: [
      { vendorSlug: "nh-pipe-works", amount: 598_400_00, isLocal: true },
      { vendorSlug: "continental-paving", amount: 611_000_00, isLocal: true },
    ],
    awardedTo: "nh-pipe-works",
    awardedAmount: 598_400_00,
    awardedAt: "2025-06-02",
  },
  {
    id: "IFB-25-056",
    title: "Annual Grounds Maintenance — City Parks",
    department: "Parks & Recreation",
    category: "maintenance",
    publishedAt: "2025-03-01",
    dueAt: "2025-04-05T00:00:00Z",
    estimatedValue: 88_000_00,
    status: "awarded",
    summary: "Seasonal mowing, trimming, and turf care for 14 city parks and athletic fields.",
    documentCount: 3,
    submissions: [
      { vendorSlug: "cocheco-landscape", amount: 82_400_00, isLocal: true },
    ],
    awardedTo: "cocheco-landscape",
    awardedAmount: 82_400_00,
    awardedAt: "2025-04-18",
    unopposed: true,
  },
];

export const BUDGET_FY26: BudgetNode = {
  name: "FY2026 Total Budget",
  amountCents: 148_300_000_00,
  prevYearCents: 141_800_000_00,
  children: [
    { name: "General Fund", amountCents: 81_200_000_00, prevYearCents: 78_400_000_00, category: "operations", children: [
      { name: "Public Safety", amountCents: 23_600_000_00, category: "operations" },
      { name: "Public Works", amountCents: 14_100_000_00, category: "operations" },
      { name: "General Government", amountCents: 11_800_000_00, category: "operations" },
      { name: "Parks & Recreation", amountCents: 5_900_000_00, category: "operations" },
      { name: "Library", amountCents: 2_100_000_00, category: "operations" },
      { name: "Planning & Community", amountCents: 3_400_000_00, category: "operations" },
      { name: "Debt Service", amountCents: 12_500_000_00, category: "debt" },
      { name: "Benefits & Other", amountCents: 7_800_000_00, category: "operations" },
    ] },
    { name: "Schools (SAU 11)", amountCents: 48_700_000_00, prevYearCents: 46_200_000_00, category: "schools" },
    { name: "Enterprise Funds", amountCents: 14_200_000_00, prevYearCents: 13_100_000_00, category: "enterprise", children: [
      { name: "Water", amountCents: 6_800_000_00, category: "enterprise" },
      { name: "Sewer", amountCents: 6_400_000_00, category: "enterprise" },
      { name: "Parking", amountCents: 1_000_000_00, category: "enterprise" },
    ] },
    { name: "Capital Improvement Plan", amountCents: 4_200_000_00, prevYearCents: 4_100_000_00, category: "capital" },
  ],
};

export const TAX_RATES: TaxRateYear[] = [
  { year: 2026, cityRate: 7.84, schoolRate: 11.42, countyRate: 2.31, stateRate: 1.15, totalRate: 22.72 },
  { year: 2025, cityRate: 7.62, schoolRate: 11.18, countyRate: 2.24, stateRate: 1.14, totalRate: 22.18 },
  { year: 2024, cityRate: 7.48, schoolRate: 10.89, countyRate: 2.19, stateRate: 1.12, totalRate: 21.68 },
  { year: 2023, cityRate: 7.31, schoolRate: 10.62, countyRate: 2.14, stateRate: 1.11, totalRate: 21.18 },
  { year: 2022, cityRate: 7.12, schoolRate: 10.40, countyRate: 2.09, stateRate: 1.08, totalRate: 20.69 },
  { year: 2021, cityRate: 6.98, schoolRate: 10.18, countyRate: 2.05, stateRate: 1.06, totalRate: 20.27 },
];

export function findRep(slug: string) { return REPRESENTATIVES.find((r) => r.slug === slug); }
export function findMeeting(slug: string) { return MEETINGS.find((m) => m.slug === slug); }
export function findBid(id: string) { return BIDS.find((b) => b.id === id); }
export function findVendor(slug: string) { return VENDORS.find((v) => v.slug === slug); }
export function findWard(n: number) { return WARDS.find((w) => w.number === n); }
export function repsByWard(n: number) { return REPRESENTATIVES.filter((r) => r.ward === n); }

export function formatUSD(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(dollars >= 10_000_000 ? 0 : 2)}M`;
  if (dollars >= 1_000) return `$${Math.round(dollars / 1000)}k`;
  return `$${dollars.toFixed(0)}`;
}

export function formatUSDExact(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
