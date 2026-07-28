/**
 * ARTICLES CONFIGURATION — Useful Stuff page
 * ─────────────────────────────────────────────────────────────────
 * Add, remove, or reorder articles here.
 *
 * IMAGES
 *   Put images in: Assets/articles/<slug>/  (jpg / png / gif / webp)
 *   The `slug` value MUST match the folder name exactly.
 *   Each image object: { src: "Assets/articles/<slug>/filename.png", caption: "..." }
 *   caption is optional but recommended — it appears in the lightbox.
 *
 * SECTION TYPES  (controls the coloured left-border style)
 *   "issue"      → red   ⚠   use for error messages / problems
 *   "resolution" → green ✓   use for the fix / solution
 *   "note"       → amber ℹ   use for tips, warnings, caveats
 *   (any other)  → muted ·   use for background / context blocks
 *
 * PUBLISHING
 *   published: true  → visible on the page
 *   published: false → hidden (draft mode)
 *
 * ORDERING
 *   Articles render in the order they appear in this array.
 *   Move an object earlier in the array to promote it.
 * ─────────────────────────────────────────────────────────────────
 */

const ARTICLES = [

  /* ── Article 1 ───────────────────────────────────────────────── */
  {
    slug:      "apex-governor-limits-debug",   // folder name under Assets/articles/
    published: true,
    title:     "Debugging Apex Governor Limit Errors",
    category:  "Apex",                          // shown as the category badge on the card
    date:      "2024-12-01",                    // ISO date — displayed as "1 Dec 2024"
    summary:   "Common governor limit exceptions and how to resolve them quickly.",

    /* sections: rendered top-to-bottom inside the article detail view */
    sections: [
      {
        type:    "issue",                        // red ⚠ heading
        heading: "Issue",
        body:    "System.LimitException: Too many SOQL queries: 101 — thrown at runtime when the 100 synchronous SOQL query limit is exceeded inside a loop.",
        images:  [],
      },
      {
        type:    "resolution",                   // green ✓ heading
        heading: "Resolution",
        body:    "Move SOQL queries outside loops. Use collections (List/Map) to query once and look up values in memory. Enable \"Debug: Show More Details\" in Setup > Debug Logs to pinpoint the callsite.",
        images:  [],
      },
      {
        type:    "note",                         // amber ℹ heading
        heading: "Additional Tips",
        body:    "Use Limits.getQueries() and Limits.getLimitQueries() in your Apex to proactively log usage before hitting the wall.",
        images:  [],
      },
    ],

    tags: ["Apex", "Governor Limits", "Debug", "SOQL"],
  },

  /* ── Article 2 ───────────────────────────────────────────────── */
  {
    slug:      "lwc-wire-refresh",
    published: true,
    title:     "Refreshing @wire Data After a User Action in LWC",
    category:  "LWC",
    date:      "2025-01-15",
    summary:   "How to force a @wire adapter to re-fetch after an imperative Apex call or record save.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "After calling an imperative Apex method that modifies data, the @wire-decorated property on the same component still shows stale values — refreshWireAdapter alone is not enough in all cases.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "Import { refreshApex } from 'lightning/uiRecordApi' and store the raw wire result in a tracked variable (this._wiredResult). After the imperative call resolves, call refreshApex(this._wiredResult).\n\nIf you are using getRecord or getRelatedListRecords, also call notifyRecordUpdateAvailable([{ recordId }]) so the LDS cache is invalidated org-wide for that record.",
        images:  [],
      },
      {
        type:    "note",
        heading: "When to use which",
        body:    "refreshApex — refreshes only the local wire result on this component.\nnotifyRecordUpdateAvailable — invalidates the Lightning Data Service cache across all components on the page.\nUse both together after a DML operation to avoid any component showing stale data.",
        images:  [],
      },
    ],

    tags: ["LWC", "Wire", "refreshApex", "Lightning Data Service"],
  },

  /* ── Article 3 ───────────────────────────────────────────────── */
  {
    slug:      "flow-screen-component-values",
    published: true,
    title:     "Passing Values Between Flow Screens and LWC Components",
    category:  "Flow",
    date:      "2025-03-10",
    summary:   "Getting output values back from a custom LWC screen component into the Flow variable store.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "A custom LWC embedded in a Flow screen does not automatically push its internal property changes back to the Flow. Setting the property from inside the component has no effect on the Flow variable.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "Declare the property with @api so the Flow builder can bind to it, then fire a FlowAttributeChangeEvent to push the updated value upstream:\n\nimport { FlowAttributeChangeEvent } from 'lightning/flowSupport';\n\nhandleChange(event) {\n  this.dispatchEvent(\n    new FlowAttributeChangeEvent('outputValue', event.detail.value)\n  );\n}\n\nIn the Flow builder, map the component's outputValue attribute to a Flow variable under Component > Advanced > Manually assign variables.",
        images:  [],
      },
      {
        type:    "note",
        heading: "Required targets metadata",
        body:    "In the component's .js-meta.xml, the target must be lightning__FlowScreen and output properties must be listed as targetConfig properties with access=\"global\" and role=\"outputOnly\" (or \"inputOutput\" if the Flow should also be able to set them).",
        images:  [],
      },
    ],

    tags: ["Flow", "LWC", "Screen Component", "FlowAttributeChangeEvent"],
  },

  /* ── Article 4 ───────────────────────────────────────────────── */
  {
    slug:      "apex-test-seealldata-false",
    published: true,
    title:     "Writing Apex Tests Without @isTest(SeeAllData=true)",
    category:  "Apex",
    date:      "2025-05-20",
    summary:   "Why relying on real org data in tests causes deployment failures and how to fix it with proper test factories.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "@isTest(SeeAllData=true) lets a test class read live org records, which passes in the source sandbox but fails in target orgs (scratch orgs, fresh sandboxes, production) where that data does not exist. Tests become brittle and deployment-blocking.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "Create a @isTest utility class (e.g. TestDataFactory) that inserts all required records in a @TestSetup method. Each test then queries its own isolated data.\n\n@isTest\npublic class TestDataFactory {\n  public static Account createAccount(String name) {\n    Account a = new Account(Name = name);\n    insert a;\n    return a;\n  }\n}\n\nCall TestDataFactory.createAccount('Test Co') at the start of each test method or inside @TestSetup. This ensures tests are self-contained and pass in any org.",
        images:  [],
      },
      {
        type:    "note",
        heading: "Tip: use @TestSetup for bulk inserts",
        body:    "@TestSetup runs once per test class and its DML is rolled back after each individual test, so records are isolated between tests. Use it for large data sets (e.g. 200 accounts) to avoid hitting DML limits per test method.\n\nAlso ensure mock callouts are set up with Test.setMock() whenever the code under test makes HTTP callouts — otherwise tests throw an UnexpectedException at runtime.",
        images:  [],
      },
    ],

    tags: ["Apex", "Unit Testing", "Test Factory", "Best Practices"],
  },

  /* ── Article 5 ───────────────────────────────────────────────── */
  {
    slug:      "integration-named-credentials",
    published: true,
    title:     "Using Named Credentials for Secure External Callouts",
    category:  "Integration",
    date:      "2025-06-05",
    summary:   "How Named Credentials remove hardcoded endpoints and credentials from Apex, and how to set them up end-to-end.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "Hardcoding endpoint URLs and auth tokens directly in Apex classes (or even Custom Settings) creates security risks: secrets can appear in debug logs, code reviews, or version control history. They also break when credentials rotate.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "1. In Setup > Named Credentials, create a credential with the endpoint URL and authentication (Basic, OAuth 2.0, JWT, etc.).\n2. In Apex, reference it with callout:CredentialName as the endpoint:\n\nHttpRequest req = new HttpRequest();\nreq.setEndpoint('callout:MyExternalAPI/v1/accounts');\nreq.setMethod('GET');\nHttpResponse res = new Http().send(req);\n\nSalesforce substitutes the real URL and injects the auth header automatically — neither appears in logs or code.",
        images:  [],
      },
      {
        type:    "note",
        heading: "Remote Site Settings vs Named Credentials",
        body:    "You do not need a Remote Site Setting for a Named Credential endpoint — Salesforce trusts it automatically.\nIf you use a Named Credential, you also do not need to call req.setHeader('Authorization', ...) manually; the platform handles it.\nFor OAuth flows, tick \"Generate Authorization Header\" and choose the correct identity type (Named Principal vs Per User).",
        images:  [],
      },
    ],

    tags: ["Integration", "Named Credentials", "Apex", "Security", "HTTP Callout"],
  },

  /* ── Article 6 ───────────────────────────────────────────────── */
  {
    slug:      "soql-relationship-queries",
    published: true,
    title:     "SOQL Relationship Queries: Parent and Child in One Query",
    category:  "SOQL",
    date:      "2025-07-01",
    summary:   "How to fetch parent field values and child records in a single SOQL query to avoid extra round-trips.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "Developers often write two separate queries — one for the parent and one for children — wasting two query slots and increasing code complexity.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "Use dot notation for parent fields and a nested SELECT for child records in a single query:\n\n// Parent fields via dot notation\nList<Contact> contacts = [\n  SELECT Id, Name, Account.Name, Account.Industry\n  FROM Contact\n  WHERE AccountId != null\n];\n\n// Child records via nested subquery\nList<Account> accounts = [\n  SELECT Id, Name,\n    (SELECT Id, LastName, Email FROM Contacts)\n  FROM Account\n  WHERE Industry = 'Technology'\n];\n\n// Access child records from parent\nfor (Account a : accounts) {\n  List<Contact> kids = a.Contacts;\n}",
        images:  [],
      },
      {
        type:    "note",
        heading: "Relationship Names",
        body:    "For standard objects, the child relationship name is the plural API name (Contacts, Opportunities, Cases). For custom objects it ends in __r (e.g. Custom_Child__r). Find the correct name under the parent object's Child Relationships in Object Manager.",
        images:  [],
      },
    ],

    tags: ["SOQL", "Apex", "Relationship Query", "Best Practices"],
  },

  /* ── Article 7 ───────────────────────────────────────────────── */
  {
    slug:      "debug-logs-quick-reference",
    published: true,
    title:     "Salesforce Debug Log Quick Reference",
    category:  "Debug",
    date:      "2025-08-10",
    summary:   "Setting up debug logs, reading the output, and filtering noise to find what actually matters.",

    sections: [
      {
        type:    "issue",
        heading: "Issue",
        body:    "Debug logs are huge and hard to read. Developers waste time scrolling through thousands of lines of SOQL, DML, and system events to find the one System.debug() they care about.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Resolution",
        body:    "1. In Setup > Debug Logs, click New and set the user + expiry.\n2. Set log levels: Apex Code = FINE, all others = ERROR to strip noise.\n3. In Developer Console, use Ctrl+F and search for USER_DEBUG to jump straight to your output.\n4. In VS Code with Salesforce Extensions, use SFDX: Get Apex Debug Logs — the viewer highlights USER_DEBUG lines automatically.\n\nUseful filter keywords:\n  USER_DEBUG          — your System.debug() calls\n  SOQL_EXECUTE_BEGIN  — every SOQL statement fired\n  DML_BEGIN           — every DML operation",
        images:  [],
      },
      {
        type:    "note",
        heading: "Log Levels Cheat Sheet",
        body:    "NONE < ERROR < WARN < INFO < DEBUG < FINE < FINER < FINEST\n\nFor most debugging: Apex Code = FINE, everything else = ERROR. Keeps logs under the 20 MB limit and makes USER_DEBUG entries easy to find.\n\nIf a log gets truncated (*** Skipped X bytes ***), reduce other log levels before cutting Apex Code.",
        images:  [],
      },
    ],

    tags: ["Debug", "Apex", "Developer Console", "Logs"],
  },

  /* ── Article 8 ───────────────────────────────────────────────── */
  {
    slug:      "deployment-checklist",
    published: true,
    title:     "Salesforce Deployment Checklist: Sandbox to Production",
    category:  "Deployment",
    date:      "2025-09-15",
    summary:   "A repeatable checklist to avoid the most common deployment failures when promoting metadata to production.",

    sections: [
      {
        type:    "issue",
        heading: "Common Deployment Failures",
        body:    "1. Missing dependencies — deploying a component that references a field, object, or class not in the package.\n2. Test coverage below 75% — tests that pass locally fail in production due to missing test data.\n3. Hard-coded IDs — RecordType IDs, Queue IDs, or User IDs that differ between sandbox and production.",
        images:  [],
      },
      {
        type:    "resolution",
        heading: "Deployment Checklist",
        body:    "Before deploying:\n  ☐ Run all tests: sf apex run test --synchronous\n  ☐ Validate against target org (--checkonly) first\n  ☐ Check for hard-coded IDs — replace with SOQL lookups or Custom Labels\n  ☐ Verify test factories are org-agnostic (no SeeAllData)\n\nDeploy:\n  sf project deploy start --manifest package.xml --test-level RunLocalTests\n\nAfter deploy:\n  ☐ Smoke-test affected flows and triggers in production\n  ☐ Check Debug Logs for unexpected errors from live traffic",
        images:  [],
      },
      {
        type:    "note",
        heading: "Quick Validation Command",
        body:    "# Validate without deploying (dry run)\nsf project deploy validate --manifest package.xml --test-level RunLocalTests --target-org production\n\n# Quick-deploy using the validated job ID (skips re-running tests)\nsf project deploy quick --job-id <jobId> --target-org production\n\nQuick deploy skips re-running tests, so production deployments finish in seconds once validated.",
        images:  [],
      },
    ],

    tags: ["Deployment", "SFDX", "Best Practices", "CI/CD"],
  },

  /* ── Add more articles below ↓ ─────────────────────────────────
   *
   * Template:
   * {
   *   slug:      "your-slug-here",          // folder: Assets/articles/<slug>/
   *   published: true,                      // false = draft, hidden on page
   *   title:     "Article Title",
   *   category:  "Category",               // e.g. "Apex", "LWC", "Flow", "Integration", "SOQL", "Debug", "Deployment"
   *   date:      "YYYY-MM-DD",
   *   summary:   "One-line summary shown on the card.",
   *   sections: [
   *     { type: "issue",      heading: "Issue",      body: "...", images: [] },
   *     { type: "resolution", heading: "Resolution", body: "...", images: [] },
   *     { type: "note",       heading: "Tips",       body: "...", images: [] },
   *   ],
   *   tags: ["Tag1", "Tag2"],
   * },
   *
   * ─────────────────────────────────────────────────────────────── */

]; // end ARTICLES
