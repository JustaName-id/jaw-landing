import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PrivacyBreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  PRIVACY_POLICY_EFFECTIVE_DATE as EFFECTIVE_DATE,
  PRIVACY_POLICY_CONTACT_EMAIL as CONTACT_EMAIL,
} from "@/content/privacy-policy";

const PAGE_TITLE = "Privacy Policy — JAW.ID";
const PAGE_DESCRIPTION =
  "How JustaLab (Torquem Technologies Ltd) collects, uses, and protects information in connection with JAW.ID and jaw.id.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "article",
    url: "/privacy-policy",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Section variant="plain" reveal={false} className="border-b-0 pt-32 md:pt-40">
      <PrivacyBreadcrumbJsonLd />
      <article className="mx-auto max-w-[780px] pb-16 md:pb-24">
        <header className="mb-12 md:mb-16">
          <p className="mono mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--ink-3)]">
            JAW.ID Legal
          </p>
          <h1 className="m-0 text-[clamp(34px,4.3vw,52px)] font-medium tracking-[-0.035em] leading-[1.05]">
            Privacy <span className="serif text-[var(--acc)]">Policy.</span>
          </h1>
          <p className="mt-4 text-[15px] text-[var(--ink-2)]">
            <strong className="font-semibold text-[var(--ink)]">
              Effective date:
            </strong>{" "}
            {EFFECTIVE_DATE}
          </p>
        </header>

        <div className="space-y-5 text-[15.5px] leading-[1.7] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]">
          <p>
            This Privacy Policy explains how Torquem Technologies Ltd, doing
            business as JustaLab (&ldquo;<strong>JustaLab</strong>&rdquo;,
            &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>
            &rdquo;, or &ldquo;<strong>our</strong>&rdquo;), collects, uses, and
            protects information in connection with{" "}
            <strong>JAW.id</strong> (the &ldquo;<strong>Service</strong>
            &rdquo;) and our website at jaw.id.
          </p>
          <p>
            We have designed JAW.id so that we collect as little personal data
            as possible. Most of what makes JAW.id work — passkeys, smart
            accounts, on-chain transactions — happens on the user&rsquo;s own
            device or directly on public blockchains, and never touches our
            servers. This policy explains, in plain language, what we{" "}
            <em>do</em> see and what we <em>don&rsquo;t</em>.
          </p>
          <p>
            If you have any questions about this policy or how we handle your
            information, contact us at{" "}
            <EmailLink>{CONTACT_EMAIL}</EmailLink>.
          </p>
        </div>

        <PolicyHeading n="1">Who we are</PolicyHeading>
        <PolicyBody>
          <p>
            JustaLab is the trade name of Torquem Technologies Ltd, a company
            registered in the United States.
          </p>
          <PolicyList>
            <li>
              <strong>Legal entity:</strong> Torquem Technologies Ltd (dba
              JustaLab)
            </li>
            <li>
              <strong>Registered address:</strong> 71 Omega Drive, Suite 330,
              Newark, DE 19713-2063, United States
            </li>
            <li>
              <strong>Privacy contact:</strong>{" "}
              <EmailLink>{CONTACT_EMAIL}</EmailLink>
            </li>
          </PolicyList>
          <p>
            For the purposes of EU/UK data protection law, we are the{" "}
            <strong>data controller</strong> for the limited personal data we
            collect directly (for example, the email of a workspace
            administrator). For most data flows in our Service, we act as a{" "}
            <strong>data processor</strong> on behalf of our business
            customers, and they are the controller of any data they choose to
            process through JAW.id.
          </p>
        </PolicyBody>

        <PolicyHeading n="2">Who this policy applies to</PolicyHeading>
        <PolicyBody>
          <p>
            JAW.id is sold to companies, but it is used by their end-users. Two
            groups of people interact with us:
          </p>
          <PolicyList>
            <li>
              <strong>Workspace customers (administrators).</strong> Companies
              and developers who sign up to use JAW.id, create a workspace, and
              integrate JAW.id into their own products.
            </li>
            <li>
              <strong>End-users.</strong> People who use a product built on
              JAW.id — they create passkey-based accounts, sign transactions,
              and grant permissions through interfaces that incorporate JAW.id.
            </li>
          </PolicyList>
          <p>
            This policy describes our practices for both groups. The way we
            handle data is very different for each, so we call out the
            distinction throughout.
          </p>
        </PolicyBody>

        <PolicyHeading n="3">What we collect</PolicyHeading>
        <PolicyBody>
          <PolicySubHeading>3.1 From workspace customers</PolicySubHeading>
          <p>
            When a company signs up for a JAW.id workspace, we collect:
          </p>
          <PolicyList>
            <li>
              <strong>Email address.</strong> We use this to create your
              account, send security notifications, and contact you about your
              workspace.
            </li>
            <li>
              <strong>Authentication data.</strong> Sign-up and sign-in are
              handled by SuperTokens, our authentication provider. Depending on
              the method you choose, we receive either your email and password
              (hashed by SuperTokens), or basic identity information returned
              by your social login provider (Google or GitHub) — typically your
              email and a stable user identifier.
            </li>
            <li>
              <strong>Workspace name.</strong> A label you choose for your
              workspace. This may or may not match a company name and is not
              used to identify you elsewhere.
            </li>
            <li>
              <strong>Product analytics.</strong> When you use the JAW.id
              dashboard, we use PostHog to record aggregate usage events — for
              example, counting unique users and which features are used. This
              is used to understand product usage, not to profile individuals.
            </li>
          </PolicyList>
          <p>
            We do not currently process payments through JAW.id. If we begin to
            in the future, we will update this policy and route payment data
            through a regulated payment processor (such as Stripe) rather than
            handling it ourselves.
          </p>

          <PolicySubHeading>3.2 From visitors to jaw.id</PolicySubHeading>
          <p>
            Our marketing website at jaw.id does not set any cookies, run
            analytics scripts, or otherwise track visitors. Standard web server
            logs may briefly record IP addresses for security and
            abuse-prevention purposes, but we do not use these logs to build
            profiles of visitors.
          </p>

          <PolicySubHeading>3.3 From end-users</PolicySubHeading>
          <p>
            JAW.id is designed so that end-users can use it without us
            collecting personal data about them. Specifically:
          </p>
          <PolicyList>
            <li>
              <strong>Passkeys never touch our infrastructure.</strong> A
              passkey is generated and stored on the end-user&rsquo;s device
              and, optionally, synchronized through their operating system or
              browser&rsquo;s password manager (such as iCloud Keychain or
              Google Password Manager). We never receive, store, or transmit
              passkeys.
            </li>
            <li>
              <strong>The keys.jaw.id passkey origin is stateless.</strong>{" "}
              keys.jaw.id is a dedicated origin we operate so that passkey
              ceremonies (registration and authentication) can happen in an
              isolated context. It does not persist user-identifiable data such
              as IP addresses, user-agent strings, or device fingerprints
              beyond what is strictly necessary to complete a single in-flight
              WebAuthn ceremony.
            </li>
            <li>
              <strong>
                Session keys and permissions are controlled by the integrating
                product.
              </strong>{" "}
              When an end-user grants a session key or call/spend permission to
              an application built on JAW.id, the resulting credential is held
              by that application according to its own design. JAW.id provides
              the interface and the underlying smart-account primitives; we do
              not store, custody, or have access to those credentials.
            </li>
            <li>
              <strong>End-user analytics.</strong> We do not collect product
              analytics from end-users. PostHog is used only on the workspace
              dashboard described in section 3.1.
            </li>
          </PolicyList>

          <PolicySubHeading>3.4 On-chain data</PolicySubHeading>
          <p>
            JAW.id smart accounts, ENS subnames issued via JustaName, and the
            transactions they sign are recorded on public blockchains. This
            information is, by design, public, permanent, and accessible to
            anyone — including us. We do not &ldquo;collect&rdquo; on-chain
            data in the privacy sense, but because it is public it cannot be
            deleted or made private after the fact, even by us. End-users
            should keep this in mind when using any blockchain-based service,
            including JAW.id.
          </p>
        </PolicyBody>

        <PolicyHeading n="4">How we use information</PolicyHeading>
        <PolicyBody>
          <p>We use the limited information described above to:</p>
          <PolicyList>
            <li>Provide, operate, and maintain the JAW.id Service.</li>
            <li>
              Authenticate workspace customers and protect accounts from
              unauthorized access.
            </li>
            <li>
              Communicate with workspace customers about their account,
              security issues, service updates, and support requests.
            </li>
            <li>
              Understand aggregate product usage and improve JAW.id (using
              anonymized or pseudonymized analytics).
            </li>
            <li>
              Comply with our legal obligations, enforce our Terms of Service,
              and prevent fraud or abuse.
            </li>
          </PolicyList>
          <p>
            We do not sell personal data, and we do not use it for advertising
            or to build behavioral profiles.
          </p>
        </PolicyBody>

        <PolicyHeading n="5">
          Legal bases for processing (EU / UK users)
        </PolicyHeading>
        <PolicyBody>
          <p>
            If you are in the European Economic Area, the United Kingdom, or
            another jurisdiction with similar laws, we rely on the following
            legal bases under Article 6 of the GDPR (and the UK GDPR
            equivalent):
          </p>
          <PolicyList>
            <li>
              <strong>Performance of a contract</strong> — to provide the
              Service to a workspace customer who has signed up.
            </li>
            <li>
              <strong>Legitimate interests</strong> — to secure our Service,
              prevent abuse, and understand aggregate product usage. We balance
              these interests against your rights and freedoms and use the
              minimum data needed.
            </li>
            <li>
              <strong>Consent</strong> — where required, for example for any
              optional cookies or non-essential analytics. Consent can be
              withdrawn at any time.
            </li>
            <li>
              <strong>Legal obligation</strong> — to comply with applicable
              laws and respond to lawful requests.
            </li>
          </PolicyList>
        </PolicyBody>

        <PolicyHeading n="6">How we share information</PolicyHeading>
        <PolicyBody>
          <p>
            We do not sell personal data. We share limited information with the
            following categories of third parties only as needed to operate the
            Service:
          </p>
          <PolicySubHeading>Subprocessors</PolicySubHeading>
          <div className="overflow-x-auto">
            <table className="my-2 w-full border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="py-2.5 pr-4 text-left font-semibold text-[var(--ink)]">
                    Provider
                  </th>
                  <th className="py-2.5 px-4 text-left font-semibold text-[var(--ink)]">
                    Purpose
                  </th>
                  <th className="py-2.5 pl-4 text-left font-semibold text-[var(--ink)]">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((row) => (
                  <tr
                    key={row.provider}
                    className="border-b border-[var(--line)]"
                  >
                    <td className="py-2.5 pr-4 align-top font-medium text-[var(--ink)]">
                      {row.provider}
                    </td>
                    <td className="py-2.5 px-4 align-top text-[var(--ink-2)]">
                      {row.purpose}
                    </td>
                    <td className="py-2.5 pl-4 align-top text-[var(--ink-2)]">
                      {row.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            We may engage additional subprocessors over time. When we do, we
            will update this list and, where required by law, notify our
            workspace customers in advance so they can object before the change
            takes effect.
          </p>

          <PolicySubHeading>Other disclosures</PolicySubHeading>
          <p>We may also disclose information:</p>
          <PolicyList>
            <li>
              <strong>To comply with law</strong> — for example, in response to
              a valid subpoena, court order, or other lawful government
              request, after taking reasonable steps to verify the request and
              notify the affected customer where legally permitted.
            </li>
            <li>
              <strong>To protect rights and safety</strong> — to prevent fraud,
              security incidents, or harm to users, JustaLab, or the public.
            </li>
            <li>
              <strong>In a corporate transaction</strong> — if JustaLab is
              involved in a merger, acquisition, financing, or sale of assets,
              in which case we will require the receiving party to honor the
              protections in this policy or notify affected users of any
              material changes.
            </li>
          </PolicyList>
        </PolicyBody>

        <PolicyHeading n="7">Cookies and tracking technologies</PolicyHeading>
        <PolicyBody>
          <PolicyList>
            <li>
              <strong>jaw.id</strong> (marketing site): no cookies, no
              analytics, no trackers.
            </li>
            <li>
              <strong>JAW.id dashboard</strong>: uses cookies and local storage
              as needed for authentication (via SuperTokens) and for product
              analytics (via PostHog). These are limited to the dashboard
              surface and are not present on jaw.id or on any end-user-facing
              surface produced by integrators.
            </li>
          </PolicyList>
          <p>
            We do not use third-party advertising cookies, retargeting pixels,
            or cross-site tracking on any of our properties.
          </p>
        </PolicyBody>

        <PolicyHeading n="8">Data retention</PolicyHeading>
        <PolicyBody>
          <p>
            We retain workspace customer data for as long as your workspace is
            active. When you delete your workspace, or when we delete it on
            your request, we remove the associated personal data from our
            active systems immediately and from our backups within{" "}
            <strong>30 days</strong>, after which it is permanently purged.
          </p>
          <p>
            We may retain a minimal record of the deletion event itself (such
            as the fact that a workspace existed and was deleted, and any
            associated invoices or legal records) where required by law, for
            security, or to defend legal claims.
          </p>
          <p>
            End-user data on the blockchain (smart-account addresses, ENS
            subnames, transactions) is public and outside our control, and
            cannot be deleted by us.
          </p>
        </PolicyBody>

        <PolicyHeading n="9">International data transfers</PolicyHeading>
        <PolicyBody>
          <p>
            JustaLab is based in the United States, and our hosting
            infrastructure (AWS, Vercel) is primarily in the United States. If
            you access JAW.id from outside the United States, your information
            will be transferred to, stored in, and processed in the United
            States.
          </p>
          <p>
            For transfers from the European Economic Area, the United Kingdom,
            or Switzerland, we rely on appropriate safeguards required by law,
            including the European Commission&rsquo;s Standard Contractual
            Clauses (SCCs) and equivalent mechanisms. If you would like more
            information about the transfer mechanisms we rely on, contact us at{" "}
            <EmailLink>{CONTACT_EMAIL}</EmailLink>.
          </p>
        </PolicyBody>

        <PolicyHeading n="10">Security</PolicyHeading>
        <PolicyBody>
          <p>
            We take reasonable technical and organizational measures to protect
            the personal data we hold, including encryption in transit (TLS),
            restricted access controls, and minimum-data-collection practices
            throughout our system design.
          </p>
          <p>
            The most important security property of JAW.id, however, is
            architectural: passkeys never leave the user&rsquo;s device, smart
            accounts are self-custodial, and most sensitive operations cannot
            be performed by us even in the event of a compromise of our
            servers.
          </p>
          <p>
            No system is perfectly secure. If we become aware of a personal
            data breach affecting you, we will notify you and, where required,
            the relevant supervisory authority within the timeframes set by
            applicable law (typically 72 hours under the GDPR).
          </p>
        </PolicyBody>

        <PolicyHeading n="11">Your rights</PolicyHeading>
        <PolicyBody>
          <p>
            Depending on where you live, you may have rights regarding your
            personal data, including:
          </p>
          <PolicyList>
            <li>
              The right to <strong>access</strong> the personal data we hold
              about you.
            </li>
            <li>
              The right to <strong>correct</strong> inaccurate or incomplete
              data.
            </li>
            <li>
              The right to <strong>delete</strong> your data (&ldquo;right to
              be forgotten&rdquo;).
            </li>
            <li>
              The right to <strong>restrict</strong> or{" "}
              <strong>object to</strong> certain processing.
            </li>
            <li>
              The right to <strong>portability</strong> — receive your data in
              a structured, machine-readable format.
            </li>
            <li>
              The right to <strong>withdraw consent</strong> at any time, where
              processing is based on consent.
            </li>
            <li>
              The right to <strong>lodge a complaint</strong> with a data
              protection authority in your country.
            </li>
          </PolicyList>
          <p>
            If you are a California resident, you also have rights under the
            California Consumer Privacy Act (CCPA/CPRA), including the right to
            know what personal information we collect, the right to delete it,
            the right to correct it, and the right not to be discriminated
            against for exercising these rights. We do not sell or share
            personal information for cross-context behavioral advertising as
            those terms are defined under the CCPA.
          </p>
          <p>
            To exercise any of these rights, email{" "}
            <EmailLink>{CONTACT_EMAIL}</EmailLink>. We will respond within the
            timeframes required by applicable law (typically within 30 days).
            We may need to verify your identity before fulfilling certain
            requests.
          </p>
          <p>
            If you are an end-user of a product built on JAW.id and your
            request relates to data held by that product (rather than by us
            directly), we will direct you to the operator of that product, who
            is the controller of that data.
          </p>
        </PolicyBody>

        <PolicyHeading n="12">Children</PolicyHeading>
        <PolicyBody>
          <p>
            JAW.id is not directed to children. We do not knowingly collect
            personal data from anyone under the age of 16. If you believe a
            child has provided us with personal data, please contact us at{" "}
            <EmailLink>{CONTACT_EMAIL}</EmailLink> and we will take steps to
            delete it.
          </p>
        </PolicyBody>

        <PolicyHeading n="13">Changes to this policy</PolicyHeading>
        <PolicyBody>
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the &ldquo;Effective date&rdquo;
            at the top of this page and, for changes that materially affect
            workspace customers, notify the affected customer by email or
            through an in-product notice before the changes take effect.
          </p>
        </PolicyBody>

        <PolicyHeading n="14">Contact us</PolicyHeading>
        <PolicyBody>
          <p>
            For any privacy-related questions, requests, or complaints, contact
            us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <EmailLink>{CONTACT_EMAIL}</EmailLink>
            <br />
            <strong>Postal address:</strong>
            <br />
            Torquem Technologies Ltd (dba JustaLab)
            <br />
            71 Omega Drive, Suite 330
            <br />
            Newark, DE 19713-2063
            <br />
            United States
          </p>
        </PolicyBody>
      </article>
    </Section>
  );
}

const SUBPROCESSORS: { provider: string; purpose: string; region: string }[] =
  [
    {
      provider: "Amazon Web Services (AWS)",
      purpose:
        "Application hosting, storage, and supporting infrastructure",
      region: "United States",
    },
    {
      provider: "Vercel",
      purpose: "Frontend hosting for the dashboard and related web surfaces",
      region: "United States",
    },
    {
      provider: "dRPC",
      purpose: "Blockchain RPC node access",
      region: "Global",
    },
    {
      provider: "Pimlico",
      purpose: "ERC-4337 paymaster infrastructure",
      region: "Global",
    },
    {
      provider: "SuperTokens",
      purpose: "Authentication and session management for workspace accounts",
      region: "Self-hosted on AWS",
    },
    {
      provider: "Resend",
      purpose: "Transactional email delivery (account, security, support)",
      region: "United States",
    },
    {
      provider: "PostHog",
      purpose: "Product analytics on the JAW.id dashboard",
      region: "United States",
    },
  ];

const PolicyHeading = ({
  n,
  children,
}: {
  n: string;
  children: React.ReactNode;
}) => (
  <h2
    id={`section-${n}`}
    className="mt-14 mb-5 scroll-mt-24 text-[24px] font-semibold tracking-[-0.02em] text-[var(--ink)] md:text-[26px]"
  >
    <span className="mono mr-3 text-[14px] font-medium text-[var(--ink-3)]">
      {n.padStart(2, "0")}
    </span>
    {children}
  </h2>
);

const PolicySubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-6 mb-3 text-[17px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
    {children}
  </h3>
);

const PolicyBody = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4 text-[15.5px] leading-[1.7] text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)] [&_em]:italic">
    {children}
  </div>
);

const PolicyList = ({ children }: { children: React.ReactNode }) => (
  <ul className="m-0 list-disc space-y-2 pl-6 marker:text-[var(--ink-3)]">
    {children}
  </ul>
);

const EmailLink = ({ children }: { children: string }) => (
  <a
    href={`mailto:${children}`}
    className="font-medium text-[var(--ink)] underline decoration-[var(--ink-3)] underline-offset-4 transition-colors hover:decoration-[var(--ink)]"
  >
    {children}
  </a>
);
