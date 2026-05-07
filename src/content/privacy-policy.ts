export const PRIVACY_POLICY_EFFECTIVE_DATE = "May 7, 2026";
// ISO 8601 date-only form — parsed as UTC midnight by JS engines, safe for
// machine-readable surfaces (sitemap lastmod, structured data).
export const PRIVACY_POLICY_EFFECTIVE_DATE_ISO = "2026-05-07";
export const PRIVACY_POLICY_CONTACT_EMAIL = "hello@justalab.co";

export const PRIVACY_POLICY_MARKDOWN = `# JAW.ID — Privacy Policy

**Effective date:** ${PRIVACY_POLICY_EFFECTIVE_DATE}

This Privacy Policy explains how Torquem Technologies Ltd, doing business as
JustaLab ("JustaLab", "we", "us", or "our"), collects, uses, and protects
information in connection with **JAW.id** (the "Service") and our website at
jaw.id.

We have designed JAW.id so that we collect as little personal data as possible.
Most of what makes JAW.id work — passkeys, smart accounts, on-chain
transactions — happens on the user's own device or directly on public
blockchains, and never touches our servers. This policy explains, in plain
language, what we *do* see and what we *don't*.

If you have any questions about this policy or how we handle your information,
contact us at <${PRIVACY_POLICY_CONTACT_EMAIL}>.

## 01 Who we are

JustaLab is the trade name of Torquem Technologies Ltd, a company registered in
the United States.

- **Legal entity:** Torquem Technologies Ltd (dba JustaLab)
- **Registered address:** 71 Omega Drive, Suite 330, Newark, DE 19713-2063, United States
- **Privacy contact:** <${PRIVACY_POLICY_CONTACT_EMAIL}>

For the purposes of EU/UK data protection law, we are the **data controller**
for the limited personal data we collect directly (for example, the email of a
workspace administrator). For most data flows in our Service, we act as a
**data processor** on behalf of our business customers, and they are the
controller of any data they choose to process through JAW.id.

## 02 Who this policy applies to

JAW.id is sold to companies, but it is used by their end-users. Two groups of
people interact with us:

- **Workspace customers (administrators).** Companies and developers who sign
  up to use JAW.id, create a workspace, and integrate JAW.id into their own
  products.
- **End-users.** People who use a product built on JAW.id — they create
  passkey-based accounts, sign transactions, and grant permissions through
  interfaces that incorporate JAW.id.

This policy describes our practices for both groups. The way we handle data is
very different for each, so we call out the distinction throughout.

## 03 What we collect

### 3.1 From workspace customers

When a company signs up for a JAW.id workspace, we collect:

- **Email address.** We use this to create your account, send security
  notifications, and contact you about your workspace.
- **Authentication data.** Sign-up and sign-in are handled by SuperTokens, our
  authentication provider. Depending on the method you choose, we receive
  either your email and password (hashed by SuperTokens), or basic identity
  information returned by your social login provider (Google or GitHub) —
  typically your email and a stable user identifier.
- **Workspace name.** A label you choose for your workspace. This may or may
  not match a company name and is not used to identify you elsewhere.
- **Product analytics.** When you use the JAW.id dashboard, we use PostHog to
  record aggregate usage events — for example, counting unique users and which
  features are used. This is used to understand product usage, not to profile
  individuals.

We do not currently process payments through JAW.id. If we begin to in the
future, we will update this policy and route payment data through a regulated
payment processor (such as Stripe) rather than handling it ourselves.

### 3.2 From visitors to jaw.id

Our marketing website at jaw.id does not set any cookies, run analytics
scripts, or otherwise track visitors. Standard web server logs may briefly
record IP addresses for security and abuse-prevention purposes, but we do not
use these logs to build profiles of visitors.

### 3.3 From end-users

JAW.id is designed so that end-users can use it without us collecting personal
data about them. Specifically:

- **Passkeys never touch our infrastructure.** A passkey is generated and
  stored on the end-user's device and, optionally, synchronized through their
  operating system or browser's password manager (such as iCloud Keychain or
  Google Password Manager). We never receive, store, or transmit passkeys.
- **The keys.jaw.id passkey origin is stateless.** keys.jaw.id is a dedicated
  origin we operate so that passkey ceremonies (registration and
  authentication) can happen in an isolated context. It does not persist
  user-identifiable data such as IP addresses, user-agent strings, or device
  fingerprints beyond what is strictly necessary to complete a single
  in-flight WebAuthn ceremony.
- **Session keys and permissions are controlled by the integrating product.**
  When an end-user grants a session key or call/spend permission to an
  application built on JAW.id, the resulting credential is held by that
  application according to its own design. JAW.id provides the interface and
  the underlying smart-account primitives; we do not store, custody, or have
  access to those credentials.
- **End-user analytics.** We do not collect product analytics from end-users.
  PostHog is used only on the workspace dashboard described in section 3.1.

### 3.4 On-chain data

JAW.id smart accounts, ENS subnames issued via JustaName, and the transactions
they sign are recorded on public blockchains. This information is, by design,
public, permanent, and accessible to anyone — including us. We do not
"collect" on-chain data in the privacy sense, but because it is public it
cannot be deleted or made private after the fact, even by us. End-users should
keep this in mind when using any blockchain-based service, including JAW.id.

## 04 How we use information

We use the limited information described above to:

- Provide, operate, and maintain the JAW.id Service.
- Authenticate workspace customers and protect accounts from unauthorized
  access.
- Communicate with workspace customers about their account, security issues,
  service updates, and support requests.
- Understand aggregate product usage and improve JAW.id (using anonymized or
  pseudonymized analytics).
- Comply with our legal obligations, enforce our Terms of Service, and prevent
  fraud or abuse.

We do not sell personal data, and we do not use it for advertising or to build
behavioral profiles.

## 05 Legal bases for processing (EU / UK users)

If you are in the European Economic Area, the United Kingdom, or another
jurisdiction with similar laws, we rely on the following legal bases under
Article 6 of the GDPR (and the UK GDPR equivalent):

- **Performance of a contract** — to provide the Service to a workspace
  customer who has signed up.
- **Legitimate interests** — to secure our Service, prevent abuse, and
  understand aggregate product usage. We balance these interests against your
  rights and freedoms and use the minimum data needed.
- **Consent** — where required, for example for any optional cookies or
  non-essential analytics. Consent can be withdrawn at any time.
- **Legal obligation** — to comply with applicable laws and respond to lawful
  requests.

## 06 How we share information

We do not sell personal data. We share limited information with the following
categories of third parties only as needed to operate the Service:

### Subprocessors

| Provider | Purpose | Region |
| --- | --- | --- |
| Amazon Web Services (AWS) | Application hosting, storage, and supporting infrastructure | United States |
| Vercel | Frontend hosting for the dashboard and related web surfaces | United States |
| dRPC | Blockchain RPC node access | Global |
| Pimlico | ERC-4337 paymaster infrastructure | Global |
| SuperTokens | Authentication and session management for workspace accounts | Self-hosted on AWS |
| Resend | Transactional email delivery (account, security, support) | United States |
| PostHog | Product analytics on the JAW.id dashboard | United States |

We may engage additional subprocessors over time. When we do, we will update
this list and, where required by law, notify our workspace customers in
advance so they can object before the change takes effect.

### Other disclosures

We may also disclose information:

- **To comply with law** — for example, in response to a valid subpoena, court
  order, or other lawful government request, after taking reasonable steps to
  verify the request and notify the affected customer where legally permitted.
- **To protect rights and safety** — to prevent fraud, security incidents, or
  harm to users, JustaLab, or the public.
- **In a corporate transaction** — if JustaLab is involved in a merger,
  acquisition, financing, or sale of assets, in which case we will require the
  receiving party to honor the protections in this policy or notify affected
  users of any material changes.

## 07 Cookies and tracking technologies

- **jaw.id** (marketing site): no cookies, no analytics, no trackers.
- **JAW.id dashboard**: uses cookies and local storage as needed for
  authentication (via SuperTokens) and for product analytics (via PostHog).
  These are limited to the dashboard surface and are not present on jaw.id or
  on any end-user-facing surface produced by integrators.

We do not use third-party advertising cookies, retargeting pixels, or
cross-site tracking on any of our properties.

## 08 Data retention

We retain workspace customer data for as long as your workspace is active.
When you delete your workspace, or when we delete it on your request, we
remove the associated personal data from our active systems immediately and
from our backups within **30 days**, after which it is permanently purged.

We may retain a minimal record of the deletion event itself (such as the fact
that a workspace existed and was deleted, and any associated invoices or legal
records) where required by law, for security, or to defend legal claims.

End-user data on the blockchain (smart-account addresses, ENS subnames,
transactions) is public and outside our control, and cannot be deleted by us.

## 09 International data transfers

JustaLab is based in the United States, and our hosting infrastructure (AWS,
Vercel) is primarily in the United States. If you access JAW.id from outside
the United States, your information will be transferred to, stored in, and
processed in the United States.

For transfers from the European Economic Area, the United Kingdom, or
Switzerland, we rely on appropriate safeguards required by law, including the
European Commission's Standard Contractual Clauses (SCCs) and equivalent
mechanisms. If you would like more information about the transfer mechanisms
we rely on, contact us at <${PRIVACY_POLICY_CONTACT_EMAIL}>.

## 10 Security

We take reasonable technical and organizational measures to protect the
personal data we hold, including encryption in transit (TLS), restricted
access controls, and minimum-data-collection practices throughout our system
design.

The most important security property of JAW.id, however, is architectural:
passkeys never leave the user's device, smart accounts are self-custodial, and
most sensitive operations cannot be performed by us even in the event of a
compromise of our servers.

No system is perfectly secure. If we become aware of a personal data breach
affecting you, we will notify you and, where required, the relevant
supervisory authority within the timeframes set by applicable law (typically
72 hours under the GDPR).

## 11 Your rights

Depending on where you live, you may have rights regarding your personal data,
including:

- The right to **access** the personal data we hold about you.
- The right to **correct** inaccurate or incomplete data.
- The right to **delete** your data ("right to be forgotten").
- The right to **restrict** or **object to** certain processing.
- The right to **portability** — receive your data in a structured,
  machine-readable format.
- The right to **withdraw consent** at any time, where processing is based on
  consent.
- The right to **lodge a complaint** with a data protection authority in your
  country.

If you are a California resident, you also have rights under the California
Consumer Privacy Act (CCPA/CPRA), including the right to know what personal
information we collect, the right to delete it, the right to correct it, and
the right not to be discriminated against for exercising these rights. We do
not sell or share personal information for cross-context behavioral
advertising as those terms are defined under the CCPA.

To exercise any of these rights, email <${PRIVACY_POLICY_CONTACT_EMAIL}>. We
will respond within the timeframes required by applicable law (typically
within 30 days). We may need to verify your identity before fulfilling certain
requests.

If you are an end-user of a product built on JAW.id and your request relates
to data held by that product (rather than by us directly), we will direct you
to the operator of that product, who is the controller of that data.

## 12 Children

JAW.id is not directed to children. We do not knowingly collect personal data
from anyone under the age of 16. If you believe a child has provided us with
personal data, please contact us at <${PRIVACY_POLICY_CONTACT_EMAIL}> and we
will take steps to delete it.

## 13 Changes to this policy

We may update this Privacy Policy from time to time. When we make material
changes, we will update the "Effective date" at the top of this page and, for
changes that materially affect workspace customers, notify the affected
customer by email or through an in-product notice before the changes take
effect.

## 14 Contact us

For any privacy-related questions, requests, or complaints, contact us at:

- **Email:** <${PRIVACY_POLICY_CONTACT_EMAIL}>
- **Postal address:** Torquem Technologies Ltd (dba JustaLab), 71 Omega Drive,
  Suite 330, Newark, DE 19713-2063, United States
`;

export const PRIVACY_POLICY_BYTES = new TextEncoder().encode(
  PRIVACY_POLICY_MARKDOWN,
);
