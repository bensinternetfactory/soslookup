export type ProfessionalLookup = {
  name: string;
  url: string;
  provider: string;
  description: string;
  category: "finance" | "legal" | "tax" | "license" | "business";
};

// National professional / business verification services.
// Everything here resolves to a .gov, .org, or official regulator domain
// and is usable nationwide — no state-specific variant needed.
export const NATIONAL_LOOKUPS: ProfessionalLookup[] = [
  {
    name: "BrokerCheck",
    provider: "FINRA",
    url: "https://brokercheck.finra.org/",
    description:
      "Check any stockbroker, investment firm, or branch office. Shows licenses, employment history, and any customer complaints or regulatory actions.",
    category: "finance",
  },
  {
    name: "Investment Adviser Public Disclosure",
    provider: "U.S. SEC",
    url: "https://adviserinfo.sec.gov/",
    description:
      "Verify investment advisors (RIAs) and their representatives — both SEC- and state-registered. Shows Form ADV, disciplinary history, and AUM.",
    category: "finance",
  },
  {
    name: "NMLS Consumer Access",
    provider: "NMLS",
    url: "https://www.nmlsconsumeraccess.org/",
    description:
      "Look up mortgage loan originators and mortgage companies. Verify their license is active in your state before signing anything.",
    category: "finance",
  },
  {
    name: "CPAverify",
    provider: "NASBA",
    url: "https://cpaverify.org/",
    description:
      "Free national lookup for certified public accountants across 53 state boards. Confirms license status and any discipline.",
    category: "tax",
  },
  {
    name: "IRS Return Preparer Directory",
    provider: "IRS",
    url: "https://irs.treasury.gov/rpo/rpo.jsf",
    description:
      "Federal directory of tax return preparers with credentials — CPAs, enrolled agents, attorneys, and AFSP participants.",
    category: "tax",
  },
  {
    name: "SAM.gov Entity Lookup",
    provider: "U.S. GSA",
    url: "https://sam.gov/search/",
    description:
      "Federal contractor registry. Verify a company is actually registered to receive federal contracts and not on the exclusion list.",
    category: "business",
  },
  {
    name: "EDGAR Full-Text Search",
    provider: "U.S. SEC",
    url: "https://efts.sec.gov/LATEST/search-index?q=&forms=&dateRange=custom",
    description:
      "Public-company filings (10-K, 10-Q, 8-K, S-1, etc.). Every registered issuer, investment fund, and public offering in the US.",
    category: "finance",
  },
  {
    name: "OFAC Sanctions Search",
    provider: "U.S. Treasury",
    url: "https://sanctionssearch.ofac.treas.gov/",
    description:
      "Check whether a person or company is on the US sanctions list before doing business with them. Required for many industries.",
    category: "business",
  },
];

// State attorney bar lookups — per-state URLs so users can verify a lawyer
// is actually licensed in the state where their case is.
export const STATE_BAR_LOOKUPS: Record<string, { url: string; name: string }> = {
  alabama: { url: "https://www.alabar.org/resources/membership-directory/", name: "Alabama State Bar" },
  alaska: { url: "https://alaskabar.org/for-the-public/find-a-lawyer/", name: "Alaska Bar Association" },
  arizona: { url: "https://www.azbar.org/for-the-public/find-a-lawyer/", name: "State Bar of Arizona" },
  arkansas: { url: "https://courts.arkansas.gov/forms-and-publications/attorney-search", name: "Arkansas Judiciary" },
  california: { url: "https://apps.calbar.ca.gov/attorney/LicenseeSearch/QuickSearch", name: "State Bar of California" },
  colorado: { url: "https://www.coloradosupremecourt.com/Search/AttSearch.asp", name: "Colorado Supreme Court" },
  connecticut: { url: "https://www.jud.ct.gov/attorneyfirminquiry/", name: "Connecticut Judicial Branch" },
  delaware: { url: "https://courts.delaware.gov/attorneys/", name: "Delaware State Courts" },
  "district-of-columbia": { url: "https://join.dcbar.org/eweb/DynamicPage.aspx?Site=dcbar&WebKey=ce7a2108-8eb1-4c40-978a-2b3b63fb0ea0", name: "DC Bar" },
  florida: { url: "https://www.floridabar.org/directories/find-mbr/", name: "The Florida Bar" },
  georgia: { url: "https://www.gabar.org/membership/membershipdirectory.cfm", name: "State Bar of Georgia" },
  hawaii: { url: "https://hsba.org/HSBA/Find_a_Lawyer/", name: "Hawaii State Bar Association" },
  idaho: { url: "https://isb.idaho.gov/licensing-mcle/membership-directory/", name: "Idaho State Bar" },
  illinois: { url: "https://www.iardc.org/lawyersearch.aspx", name: "Illinois ARDC" },
  indiana: { url: "https://courtapps.in.gov/rollofattorneys/", name: "Indiana Roll of Attorneys" },
  iowa: { url: "https://www.iowacourts.gov/for-the-public/representing-yourself/find-a-lawyer/", name: "Iowa Judicial Branch" },
  kansas: { url: "https://www.kscourts.org/Attorneys/Attorney-Registration/Attorney-Directory", name: "Kansas Courts" },
  kentucky: { url: "https://www.kybar.org/search/custom.asp?id=3354", name: "Kentucky Bar Association" },
  louisiana: { url: "https://www.lsba.org/public/MemberSearch.aspx", name: "Louisiana State Bar Association" },
  maine: { url: "https://www.mebaroverseers.org/attorney_services/attorney_directory.html", name: "Board of Overseers of the Bar" },
  maryland: { url: "https://mdcourts.gov/lawyers/attylist", name: "Maryland Courts" },
  massachusetts: { url: "https://www.massbbo.org/s/lawyer-search", name: "Board of Bar Overseers" },
  michigan: { url: "https://www.michbar.org/generalinfo/memberdirectory", name: "State Bar of Michigan" },
  minnesota: { url: "https://lprb.mncourts.gov/LawyerSearch/Pages/default.aspx", name: "MN Lawyers Professional Responsibility Board" },
  mississippi: { url: "https://www.msbar.org/for-the-public/find-an-attorney/", name: "The Mississippi Bar" },
  missouri: { url: "https://mobar.org/site/content/find-a-lawyer.aspx", name: "The Missouri Bar" },
  montana: { url: "https://www.montanabar.org/search/custom.asp?id=3601", name: "State Bar of Montana" },
  nebraska: { url: "https://www.nebar.com/search/custom.asp?id=2129", name: "Nebraska State Bar Association" },
  nevada: { url: "https://www.nvbar.org/find-a-lawyer/", name: "State Bar of Nevada" },
  "new-hampshire": { url: "https://www.nhbar.org/member-directory/", name: "New Hampshire Bar Association" },
  "new-jersey": { url: "https://www.njcourts.gov/attorneys/attorney-online-services", name: "New Jersey Courts" },
  "new-mexico": { url: "https://www.nmbar.org/NmbarDocs/findAttorney.aspx", name: "State Bar of New Mexico" },
  "new-york": { url: "https://iapps.courts.state.ny.us/attorneyservices/search", name: "NY Courts Attorney Directory" },
  "north-carolina": { url: "https://www.ncbar.gov/for-the-public/finding-a-lawyer/", name: "North Carolina State Bar" },
  "north-dakota": { url: "https://www.sband.org/search/newsearch.asp", name: "State Bar Association of ND" },
  ohio: { url: "https://www.supremecourt.ohio.gov/AttorneySearch/", name: "Supreme Court of Ohio" },
  oklahoma: { url: "https://www.okbar.org/membersearch/", name: "Oklahoma Bar Association" },
  oregon: { url: "https://www.osbar.org/members/membersearch_start.asp", name: "Oregon State Bar" },
  pennsylvania: { url: "https://www.padisciplinaryboard.org/for-the-public/find-attorney", name: "PA Disciplinary Board" },
  "rhode-island": { url: "https://www.ribar.com/For%20the%20Public/FindALawyer.aspx", name: "Rhode Island Bar Association" },
  "south-carolina": { url: "https://www.scbar.org/lawyers/directories/member-directory/", name: "South Carolina Bar" },
  "south-dakota": { url: "https://statebarofsouthdakota.com/member-directory/", name: "State Bar of South Dakota" },
  tennessee: { url: "https://www.tbpr.org/attorney-search", name: "TN Board of Professional Responsibility" },
  texas: { url: "https://www.texasbar.com/AM/Template.cfm?Section=Find_A_Lawyer", name: "State Bar of Texas" },
  utah: { url: "https://services.utahbar.org/Member-Directory", name: "Utah State Bar" },
  vermont: { url: "https://www.vermontbar.org/find-a-lawyer/", name: "Vermont Bar Association" },
  virginia: { url: "https://www.vsb.org/Site/public/find-a-lawyer", name: "Virginia State Bar" },
  washington: { url: "https://www.mywsba.org/PersonifyEbusiness/LegalDirectory.aspx", name: "Washington State Bar Association" },
  "west-virginia": { url: "https://www.wvbar.org/for-the-public/find-a-lawyer/", name: "West Virginia State Bar" },
  wisconsin: { url: "https://www.wisbar.org/directories/pages/lawyersearch.aspx", name: "State Bar of Wisconsin" },
  wyoming: { url: "https://www.wyomingbar.org/for-the-public/find-an-attorney/", name: "Wyoming State Bar" },
};
