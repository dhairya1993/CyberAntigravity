export type MessageChannel = 'email' | 'sms';
export type CaseVerdict = 'phishing' | 'legitimate';

export interface ForensicIndicator {
  id: string;
  label: string;
  category: 'sender' | 'urgency' | 'attachment' | 'link' | 'content';
  evidenceText: string;
  explanation: string;
  whyItMatters: string;
}

export interface PhishingCase {
  id: string;
  caseNumber: number;
  title: string;
  channel: MessageChannel;
  difficulty: 'Beginner' | 'Intermediate';
  senderDisplay: string;
  senderAddress: string;
  replyToAddress?: string;
  recipient: string;
  subject?: string;
  dateSent: string;
  bodyText: string;
  hoverLinkTarget?: string;
  displayLinkText?: string;
  attachmentName?: string;
  attachmentType?: string;
  verdict: CaseVerdict;
  verdictExplanation: string;
  holisticTakeaway: string;
  indicators: ForensicIndicator[];
}

export const PHISHING_CASES: PhishingCase[] = [
  {
    id: 'case-01',
    caseNumber: 1,
    title: 'Executive Wire Transfer Request',
    channel: 'email',
    difficulty: 'Intermediate',
    senderDisplay: 'David Miller (CEO)',
    senderAddress: 'david.miller@apex-dynamics-corp.org',
    replyToAddress: 'exec-assistant98@external-mail.net',
    recipient: 'alex.finance@apexdynamics.test',
    subject: 'CONFIDENTIAL: Urgent Supplier Wire Re-Authorization',
    dateSent: 'Today at 02:14 PM',
    bodyText: `Alex,

I am stepping into an off-site confidential acquisition meeting with the board of directors.

Our primary supplier needs an immediate payment of $48,500 processed before 4:30 PM today to guarantee shipment delivery for Q4. Because I am unavailable by phone, please process this through the overseas wire account attached in the routing schedule.

Do not discuss this with the team until the formal press release tomorrow morning. Reply directly to this email once the wire confirmation number is generated.

David Miller
Chief Executive Officer, Apex Dynamics`,
    verdict: 'phishing',
    verdictExplanation:
      'This is a textbook Business Email Compromise (BEC) attack. The attacker impersonates the CEO using a lookalike domain (@apex-dynamics-corp.org instead of the genuine @apexdynamics.test) and creates artificial confidentiality to prevent the employee from verifying with colleagues.',
    holisticTakeaway:
      'Executive impersonation relies on pressure and authority. Genuine corporate governance mandates dual-custody verification for high-value financial transfers regardless of who sends the message.',
    indicators: [
      {
        id: 'case-01-ind-1',
        label: 'Domain Lookalike / Mismatch',
        category: 'sender',
        evidenceText: 'david.miller@apex-dynamics-corp.org (Official domain is apexdynamics.test)',
        explanation: 'The sender address uses a hyphenated off-domain (.org) instead of the genuine corporate internal email system.',
        whyItMatters: 'Attackers register lookalike domains to bypass casual visual inspection by busy employees.',
      },
      {
        id: 'case-01-ind-2',
        label: 'Hidden Reply-To Forwarder',
        category: 'sender',
        evidenceText: 'Reply-To: exec-assistant98@external-mail.net',
        explanation: 'Replying to the email sends your reply to a completely different, untraceable external webmail address.',
        whyItMatters: 'Attackers use mismatched Reply-To headers so victim replies route to an inbox under their direct control.',
      },
      {
        id: 'case-01-ind-3',
        label: 'Extreme Urgency & Artificial Deadline',
        category: 'urgency',
        evidenceText: '"processed before 4:30 PM today... I am unavailable by phone"',
        explanation: 'Creating a strict 2-hour window while claiming unavailability prevents calm procedural thinking.',
        whyItMatters: 'Artificial urgency forces victims to cut corners and skip standard procurement controls.',
      },
      {
        id: 'case-01-ind-4',
        label: 'Isolation & Secrecy Pressure',
        category: 'content',
        evidenceText: '"Do not discuss this with the team until the formal press release"',
        explanation: 'Coercing the employee into secrecy deliberately isolates them from internal verification checks.',
        whyItMatters: 'Secrecy clauses prevent victims from asking a colleague or supervisor: "Did David ask you for a wire too?"',
      },
    ],
  },
  {
    id: 'case-02',
    caseNumber: 2,
    title: 'Cloud Identity Account Suspension',
    channel: 'email',
    difficulty: 'Beginner',
    senderDisplay: 'GlobalCloud Identity Alerts',
    senderAddress: 'support@identity-globalcloud-security.xyz',
    recipient: 'user@enterprise-client.test',
    subject: 'URGENT: Suspicious login blocked — Validate identity within 24 hours',
    dateSent: 'Today at 09:30 AM',
    bodyText: `Dear Valued Customer,

A login attempt from an unrecognized IP address (Lagos, Nigeria) was detected on your cloud tenant account.

For your protection, all active sessions and connected developer API services will be permanently suspended within 24 hours unless you verify your master authentication credentials immediately.

Click the link below to evaluate your sign-in activity and verify ownership.`,
    displayLinkText: 'https://globalcloud.com/account/security-verify',
    hoverLinkTarget: 'https://globalcloud.com.verify-access-tokens.net/login?token=928a',
    attachmentName: 'Resolution_Form.html',
    attachmentType: 'HTML Web Application',
    verdict: 'phishing',
    verdictExplanation:
      'This is a high-volume credential harvesting campaign. The sender domain uses an untrusted .xyz TLD, the hyperlinked URL leads to a completely different subdomain deception domain (.verify-access-tokens.net), and the email includes an unsolicited HTML attachment that renders a credential-stealing form locally.',
    holisticTakeaway:
      'Never judge a link by the text written on the screen. Always inspect the true destination (the actual registrable domain before the first single slash) or navigate directly to the service dashboard.',
    indicators: [
      {
        id: 'case-02-ind-1',
        label: 'Deceptive Display Link Destination',
        category: 'link',
        evidenceText: 'Displayed as globalcloud.com but targets globalcloud.com.verify-access-tokens.net',
        explanation: 'The real destination domain is verify-access-tokens.net; "globalcloud.com" is merely a deceptive subdomain prefix.',
        whyItMatters: 'Subdomain manipulation tricks users who do not know how to read domains from right to left.',
      },
      {
        id: 'case-02-ind-2',
        label: 'Suspicious TLD & Lookalike Sender',
        category: 'sender',
        evidenceText: 'support@identity-globalcloud-security.xyz',
        explanation: 'Major cloud enterprise providers communicate from verified top-level domains (.com), not cheap disposable .xyz domains.',
        whyItMatters: 'Disreputable TLDs with hyphenated multi-brand keywords are frequently bought in bulk for spam runs.',
      },
      {
        id: 'case-02-ind-3',
        label: 'Dangerous HTML File Attachment',
        category: 'attachment',
        evidenceText: 'Attachment: Resolution_Form.html',
        explanation: 'Security alerts never ask you to download and open standalone HTML files in your local browser.',
        whyItMatters: 'HTML smuggling attachments run locally on your device, evading network perimeter email scanners.',
      },
      {
        id: 'case-02-ind-4',
        label: 'Threat of Service Termination',
        category: 'urgency',
        evidenceText: '"permanently suspended within 24 hours"',
        explanation: 'Threatening account deletion creates panic to discourage users from contacting IT support.',
        whyItMatters: 'Fear of operational disruption makes users click without analyzing the URL.',
      },
    ],
  },
  {
    id: 'case-03',
    caseNumber: 3,
    title: 'Legitimate Account Sign-in Notice',
    channel: 'email',
    difficulty: 'Intermediate',
    senderDisplay: 'CoreBank Security Alerts',
    senderAddress: 'no-reply@mail.corebank.test',
    recipient: 'alex.vance@workplace.test',
    subject: 'New sign-in from Firefox on Windows',
    dateSent: 'Yesterday at 06:15 PM',
    bodyText: `Hello Alex Vance,

We noticed a new sign-in to your CoreBank Online account:

• Device: Firefox on Windows 11
• Location: Austin, Texas, United States
• Time: October 29, 2026 at 6:14 PM UTC

If this was you, you do not need to take any action.

If this was not you, please secure your account immediately. Do not click links from unfamiliar messages. To review your security settings, open your CoreBank mobile app or visit corebank.test directly by typing the address into your browser.

CoreBank Customer Safety Team`,
    displayLinkText: 'https://corebank.test/security',
    hoverLinkTarget: 'https://corebank.test/security',
    verdict: 'legitimate',
    verdictExplanation:
      'This is an authentic, well-designed security notification. The sender address matches the official corporate domain, the email addresses the user by their full verified name (not a generic greeting), there are no attached files, and it explicitly instructs the user to open the app or type the address directly rather than forcing an embedded button click.',
    holisticTakeaway:
      'Not every security alert is a scam! True defensive maturity means assessing the evidence objectively. Authentic organizations empower users to navigate independently without manufacturing false panic or demanding immediate credential disclosure.',
    indicators: [
      {
        id: 'case-03-ind-1',
        label: 'Authentic Sender Domain Alignment',
        category: 'sender',
        evidenceText: 'no-reply@mail.corebank.test aligns with corebank.test',
        explanation: 'The email originates from an authenticated sub-service of the legitimate organization domain.',
        whyItMatters: 'Legitimate organizations use consistent, verified domain hierarchies protected by SPF, DKIM, and DMARC.',
      },
      {
        id: 'case-03-ind-2',
        label: 'Personalized Greeting with Verified Context',
        category: 'content',
        evidenceText: 'Personalized to "Alex Vance" with exact matching device/timestamp context',
        explanation: 'The message provides specific, verifiable context regarding an action the user actually performed.',
        whyItMatters: 'Mass phishing uses generic salutations like "Dear Customer" or "Dear User" because attackers do not possess contextual account data.',
      },
      {
        id: 'case-03-ind-3',
        label: 'Safe Independent Navigation Guidance',
        category: 'link',
        evidenceText: '"visit corebank.test directly by typing the address into your browser"',
        explanation: 'The email actively encourages independent browser navigation rather than demanding clicks on high-pressure action buttons.',
        whyItMatters: 'Legitimate security engineering promotes independent verification habits.',
      },
      {
        id: 'case-03-ind-4',
        label: 'Absence of False Panic or Ultimatum',
        category: 'urgency',
        evidenceText: '"If this was you, you do not need to take any action."',
        explanation: 'Provides a calm confirmation pathway without manufactured 30-minute countdowns or threats of police/fines.',
        whyItMatters: 'Real security communications offer calm, balanced, and actionable steps.',
      },
    ],
  },
  {
    id: 'case-04',
    caseNumber: 4,
    title: 'Overdue Vendor Invoice with Compressed Script',
    channel: 'email',
    difficulty: 'Intermediate',
    senderDisplay: 'Metro Logistics Billing Services',
    senderAddress: 'accounts@metro-logistics-dispatch.com',
    replyToAddress: 'debt-collection-ops@proton.me',
    recipient: 'purchasing@company-retail.test',
    subject: 'FINAL NOTICE: Invoice #84920 Overdue — Collections Referral Imminent',
    dateSent: 'Today at 11:05 AM',
    bodyText: `Accounts Payable,

Our accounting records reflect that Invoice #84920 in the amount of $3,840.00 is now 45 days past due.

Despite two previous reminder notices, this balance remains unpaid. If payment confirmation is not received by 5:00 PM today, this account will be transferred to a third-party commercial debt recovery agency, which may adversely impact your commercial credit score.

Please review the attached statement details and remit payment to the updated routing account immediately.`,
    attachmentName: 'Invoice_Overdue_84920.zip',
    attachmentType: 'ZIP Archive (Contains: Statement_Summary.vbs.pdf)',
    verdict: 'phishing',
    verdictExplanation:
      'This attack uses fear of legal and credit penalties to trick accounts payable personnel into executing malware. The sender domain differs from the known supplier, the Reply-To routes to an encrypted personal ProtonMail address, and the attached ZIP file contains a disguised VBScript executable payload (`.vbs.pdf`).',
    holisticTakeaway:
      'Invoices should always be requested and transmitted as static PDF documents directly through verified vendor portals. Never execute files from archive files (.zip, .iso, .img) received from external emails.',
    indicators: [
      {
        id: 'case-04-ind-1',
        label: 'Disguised Executable Script Payload',
        category: 'attachment',
        evidenceText: 'Statement_Summary.vbs.pdf inside ZIP archive',
        explanation: 'Attackers use double file extensions (.vbs.pdf) inside archives to trick Windows into hiding the real .vbs script extension.',
        whyItMatters: 'Double extensions disguise malicious executables as harmless PDF invoices.',
      },
      {
        id: 'case-04-ind-2',
        label: 'Mismatched Webmail Reply-To Address',
        category: 'sender',
        evidenceText: 'Reply-To: debt-collection-ops@proton.me',
        explanation: 'A commercial enterprise billing desk does not route official customer communications through free personal webmail.',
        whyItMatters: 'Reveals that the sender cannot receive replies on the spoofed corporate domain.',
      },
      {
        id: 'case-04-ind-3',
        label: 'Threat of Credit Bureau Referral',
        category: 'urgency',
        evidenceText: '"transferred to a third-party commercial debt recovery agency"',
        explanation: 'Manufactured legal and credit threats create anxiety to expedite unvetted payments.',
        whyItMatters: 'Fear of reputational or financial penalties causes staff to bypass purchase-order matching.',
      },
      {
        id: 'case-04-ind-4',
        label: 'Updated Routing / Bank Account Request',
        category: 'content',
        evidenceText: '"remit payment to the updated routing account immediately"',
        explanation: 'A cardinal red flag of vendor impersonation is suddenly requesting payment to a new or different bank account.',
        whyItMatters: 'Bank routing changes must ALWAYS be verified by calling the vendor at a verified historical telephone number.',
      },
    ],
  },
  {
    id: 'case-05',
    caseNumber: 5,
    title: 'Urgent Debit Card Freeze SMS (Smishing)',
    channel: 'sms',
    difficulty: 'Beginner',
    senderDisplay: '+1 (800) 555-0199',
    senderAddress: '+18005550199',
    recipient: '+1 (555) 234-5678',
    dateSent: 'Today at 03:42 AM',
    bodyText: `[First Bank Alert]: Your debit card ending in 4902 was temporarily locked due to an unauthorized charge of $389.20 at Electronics Mart.

If this was NOT you, resolve immediately to unfreeze your card: https://firstbank-secure-resolution.biz/unlock or reply with your 6-digit One-Time Passcode (OTP).`,
    displayLinkText: 'https://firstbank-secure-resolution.biz/unlock',
    hoverLinkTarget: 'https://firstbank-secure-resolution.biz/unlock',
    verdict: 'phishing',
    verdictExplanation:
      'This is an urgent SMS phishing (smishing) trap. The message requests your one-time passcode (OTP) directly via SMS, links to an unverified .biz domain with hyphenated brand keywords, and was dispatched at 3:42 AM to exploit drowsy, alarmed decision-making.',
    holisticTakeaway:
      'Banks will NEVER ask you to text your one-time passcode (OTP) or card PIN. If you suspect an unauthorized charge, call the customer service number printed directly on the physical back of your plastic debit card.',
    indicators: [
      {
        id: 'case-05-ind-1',
        label: 'Direct Request for One-Time Passcode (OTP)',
        category: 'content',
        evidenceText: '"reply with your 6-digit One-Time Passcode (OTP)"',
        explanation: 'OTPs are master authorization secrets. Legitimate financial institutions explicitly warn users never to share OTPs.',
        whyItMatters: 'Providing an OTP authorizes an attacker\'s pending transaction or enables device enrollment.',
      },
      {
        id: 'case-05-ind-2',
        label: 'Untrusted TLD & Hyphenated Brand URL',
        category: 'link',
        evidenceText: 'firstbank-secure-resolution.biz',
        explanation: 'Banking portals do not host customer account management on cheap .biz domains.',
        whyItMatters: 'Scammers register cheap domain names to clone bank login portals.',
      },
      {
        id: 'case-05-ind-3',
        label: 'Fabricated Financial Loss & Panic Timing',
        category: 'urgency',
        evidenceText: '"charge of $389.20 at Electronics Mart... sent at 03:42 AM"',
        explanation: 'Late-night alerts exploit grogginess so victims act impulsively without verifying their mobile banking app.',
        whyItMatters: 'Fatigued users are significantly more vulnerable to impulsive compliance.',
      },
      {
        id: 'case-05-ind-4',
        label: 'Generic Unverified SMS Sender Handle',
        category: 'sender',
        evidenceText: '+1 (800) 555-0199 (Generic toll-free spoof)',
        explanation: 'Caller ID and SMS originating numbers are easily forged using online VoIP platforms.',
        whyItMatters: 'Never trust inbound phone numbers or caller ID names.',
      },
    ],
  },
];
