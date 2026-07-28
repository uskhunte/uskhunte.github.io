/**
 * PORTFOLIO CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * Edit this file to control everything that appears on the portfolio.
 *
 * SECTIONS
 *   To HIDE a section:    enabled: false
 *   To SHOW a section:    enabled: true
 *   To REORDER sections:  change `order` (lower number = higher on page)
 *
 * COLUMNS
 *   Left  column: information, skills, certifications, awards, languages
 *   Right column: experience, education, projects, blog
 *
 * LINKS (person.links)
 *   style: "primary"  → filled green button
 *   style: "outline"  → bordered button
 *   style: "link"     → plain text link
 *   icon: null        → no icon shown before the label
 * ─────────────────────────────────────────────────────────────────
 */

const PORTFOLIO = {

  /* ── Personal Info ─────────────────────────────────────────────
   * These values populate the hero pill, nav bar, and profile card.
   * avatarSrc  — your profile photo (Assets/images/)
   * coverSrc   — banner behind the hero pill (Assets/images/); leave ""
   *              to show the CSS gradient instead
   * experienceStartDate — ISO date string; drives the live "X yrs Y mos"
   *                       counter in the Information card
   * ──────────────────────────────────────────────────────────────── */
  person: {
    name:       "Ujjwal Singh Khunte",
    title:      "Salesforce Developer",
    bio:        "Salesforce Developer specialising in Sales/Experience Cloud, APEX, LWC, AURA, Integration and Lightning Flow.",
    bio2:       "Passionate about learning new concepts of programming and process improvement.", // optional — set to "" to hide
    location:   "Hyderabad, Telangana, India",
    experienceStartDate: "2023-02-02", // ISO format — drives the live counter
    avatarSrc:  "Assets/images/me.jpg",
    coverSrc:   "Assets/images/cover_pic.jpg",

    /* Social / profile links shown in the Profile card */
    links: [
      // style "primary" = filled button (use for your most important link)
      { label: "Connect on LinkedIn",  icon: "Assets/icons/linkedein.svg",    href: "https://www.linkedin.com/in/ujjwalsinghkhunte", style: "primary" },
      // style "outline" = bordered button
      { label: "Follow on Trailhead", icon: "Assets/icons/Trailhead_old.svg", href: "https://www.salesforce.com/trailblazer/uskhunte", style: "outline" },
      // style "link" = plain text link (icon: null = no icon)
      { label: "View GitHub Profile", icon: null, href: "https://github.com/uskhunte", style: "link" },
    ],
  },

  /* ── Sections ───────────────────────────────────────────────────
   * Each key maps to a renderer in index.html (buildSection).
   * All sections share: enabled, order, column, title.
   * Some sections also have: items, trailheadUrl, etc.
   * ──────────────────────────────────────────────────────────────── */
  sections: {

    /* ── LEFT COLUMN ─────────────────────────────────────────────── */

    /* Information card — shows Location + live experience counter.
     * No `items` needed; data comes from person.location and
     * person.experienceStartDate above. */
    information: {
      enabled: true,
      order:   1,
      column:  "left",
      title:   "Information",
    },

    /* Skills & Expertise card — renders each string as a pill badge.
     * Add, remove, or reorder strings freely. */
    skills: {
      enabled: true,
      order:   2,
      column:  "left",
      title:   "Skills & Expertise",
      items: [
        "Salesforce", "Sales Cloud", "Service Cloud", "Experience Cloud",
        "Digital Experience Sites", "APEX", "LWC", "AURA", "REST API",
        "Integration", "Lightning Flow", "HTML 5", "CSS 3", "JavaScript",
        "Postman", "Workbench", "Data Loader", "SFDX CLI", "Git", "GitHub",
        "Azure DevOps", "OwnBackup", "SQL", "ReactJS", "Gearset",
        "Data Cloud", "Agentforce",
      ],
    },

    /* Certifications card — badge images in a 4-column grid.
     * trailheadUrl: every badge links to this Trailhead profile page.
     * src: path to the badge image (Assets/icons/).
     *      If the image fails to load, that cert is silently hidden.
     * To add a cert: append a { src, title } object to items[]. */
    certifications: {
      enabled: true,
      order:   3,
      column:  "left",
      title:   "Certifications",
      trailheadUrl: "https://www.salesforce.com/trailblazer/uskhunte", // all badges link here
      items: [
        { src: "Assets/icons/app-builder.png",         title: "Platform App Builder" },
        { src: "Assets/icons/admin.png",               title: "Administrator" },
        { src: "Assets/icons/pd1.png",                 title: "Platform Developer I" },
        { src: "Assets/icons/data-cloud.png",          title: "Data Cloud Consultant" },
        { src: "Assets/icons/js1.png",                 title: "JavaScript Developer I" },
        { src: "Assets/icons/agentforce_specialist.png", title: "Agentforce Specialist" },
        { src: "Assets/icons/ai_associate.png",        title: "AI Associate" },
      ],
    },

    /* ── RIGHT COLUMN ────────────────────────────────────────────── */

    /* Experience card — timeline of employers.
     *
     * Per job object:
     *   company  — employer name
     *   type     — e.g. "Full-time · 3 yrs 6 mos" (shown under company name)
     *   logo     — company logo path (Assets/company_logos/); null = no logo
     *   from/to  — display strings ("Feb 2023", "Present")
     *   subRoles — career progression within the same company.
     *              Each entry: { title, period, mode?, desc? }
     *              Leave as [] if there was only one role.
     *   highlights — grouped bullet sections, each with:
     *                heading: uppercase label shown as a coloured tag
     *                points:  array of bullet strings
     *
     * To add a new employer: append a new object to items[].
     * To add a promotion:    prepend a new object to subRoles[]. */
    experience: {
      enabled: true,
      order:   1,
      column:  "right",
      title:   "Experience",
      items: [
        {
          company:    "Deloitte",
          role:       "Consultant",
          type:       "Full-time",
          logo:       "Assets/company_logos/Logo_of_Deloitte.svg",
          location:   "Hyderabad, Telangana, India",
          from:       "2023-02-01",
          to:         "present",
          /* subRoles — most recent role first; from/to are ISO dates or "present" */
          subRoles: [
            { title: "Consultant",      from: "2026-06-01", to: "present",    mode: "Hybrid" },
            { title: "Analyst",         from: "2024-02-01", to: "2026-05-31", mode: "On-site", desc: "Salesforce Admin & Developer" },
            { title: "Analyst Trainee", from: "2023-02-01", to: "2024-01-31", mode: "On-site", desc: "Salesforce Developer" },
          ],
          highlights: [
            {
              heading: "Process Automation",
              points: [
                "Automated processes using Lightning Flow, Workflow Rules, Approval Processes, custom LWC, and Apex frameworks, significantly boosting efficiency.",
                "Developed productivity tools that automated repetitive tasks, reducing manual effort and process time.",
              ],
            },
            {
              heading: "Solution Design & Analysis",
              points: [
                "Led requirements gathering, performed comprehensive analyses, designed high-level solutions, and conducted impact assessments.",
                "Conducted case studies utilising advanced AI technologies like OpenAI and Microsoft Copilot to develop innovative client-specific solutions.",
              ],
            },
            {
              heading: "Technical Expertise",
              points: [
                "Worked on Sales, Service and Experience Clouds, delivering robust solutions across these domains.",
                "Optimised Apex Classes, Test Classes, and Asynchronous Apex, improving performance and code quality.",
                "Automated SOQL Queries and Apex Code generation for Unit Testing, ensuring code reliability.",
                "Demonstrated advanced debugging skills in Integration & Apex Classes, resolving critical issues.",
              ],
            },
            {
              heading: "Documentation",
              points: [
                "Created Business Requirements Documents, ETA documents, and comprehensive admin/technical documentation.",
                "Trained and mentored team members on Salesforce Administration and Development.",
              ],
            },
          ],
        },
        {
          company:    "ProWiggle Data Solutions Pvt Ltd",
          role:       "Deep Learning Engineer",
          type:       "Internship",
          logo:       "Assets/company_logos/prowiggle.png",
          location:   "Bhandara, Maharashtra, India · Remote",
          from:       "2021-04-01",
          to:         "2021-07-31",
          subRoles:   [], // single role — no progression to show
          highlights: [
            {
              heading: "Machine Learning",
              points: [
                "Python based Machine Learning model for Cotton Leaf Disease Detection.",
              ],
            },
          ],
        },
        {
          company:    "Xtrude Lab Private Limited",
          role:       "Artificial Intelligence Intern",
          type:       "Internship",
          logo:       null, // no logo available
          location:   "Bilaspur, Chhattisgarh, India · Remote",
          from:       "2020-08-01",
          to:         "2020-09-30",
          subRoles:   [],
          highlights: [
            {
              heading: "AI Development",
              points: [
                "Developed AI Logic for NPC in Game in Unreal Engine 4.",
              ],
            },
          ],
        },
      ],
    },

    /* Education card — institution logo, degree, and year range.
     * logo: path under Assets/images/; null = no logo shown.
     * To add another qualification: append a new object to items[]. */
    education: {
      enabled: true,
      order:   2,
      column:  "right",
      title:   "Education",
      items: [
        {
          institution: "Shri Shankaracharya Technical Campus",
          degree:       "Bachelor of Technology",
          logo:         "Assets/images/logo_dark_sstc.png",
          location:     "Bhilai, Chhattisgarh, India",
          year:         "2018 – 2022",
        },
      ],
    },

    /* ── OPTIONAL SECTIONS (disabled — set enabled: true to show) ── */

    /* Projects card — each project shows name, description, tags, and
     * an optional URL. Flip enabled: true and add objects to items[].
     *
     * Schema:
     *   name        — project name shown as the card heading
     *   description — one or two sentences about what the project does
     *   tags        — array of technology / skill strings shown as badges
     *   url         — (optional) link to GitHub repo, demo, or article
     *
     * To activate: set enabled: true and add real entries to items[]. */
    projects: {
      enabled: false,
      order:   3,
      column:  "right",
      title:   "Projects",
      items: [
        // Uncomment and edit these to show real projects:
        // {
        //   name:        "LWC Reusable Data Table",
        //   description: "Configurable, sortable data table component for Experience Cloud that replaces the standard lightning-datatable with custom cell renderers.",
        //   tags:        ["LWC", "JavaScript", "Experience Cloud"],
        //   url:         "https://github.com/uskhunte/lwc-data-table",
        // },
        // {
        //   name:        "Apex Bulk Trigger Framework",
        //   description: "Handler-based Apex trigger framework supporting before/after events, per-object routing, and easy unit testing without SeeAllData.",
        //   tags:        ["Apex", "Triggers", "Design Patterns"],
        //   url:         "https://github.com/uskhunte/apex-trigger-framework",
        // },
        // {
        //   name:        "Flow Screen Component Library",
        //   description: "Collection of custom LWC screen components for Lightning Flow — date range picker, multi-select lookup, and progress indicator.",
        //   tags:        ["LWC", "Flow", "Screen Components"],
        //   url:         "",  // leave empty string to hide the link
        // },
      ],
    },

    /* Blog / Writing card — links to external posts or articles.
     *
     * Schema:
     *   title       — post title shown as the link text
     *   date        — ISO date string (YYYY-MM-DD); displayed as "15 Mar 2025"
     *   readingTime — free-text estimate shown as a badge (e.g. "5 min read")
     *   url         — full URL to the post (Medium, Dev.to, Trailhead blog, etc.)
     *
     * To activate: set enabled: true and add real entries to items[]. */
    blog: {
      enabled: false,
      order:   4,
      column:  "right",
      title:   "Writing",
      items: [
        // Uncomment and edit these to show real writing:
        // {
        //   title:       "Bulkifying Apex Triggers the Right Way",
        //   date:        "2025-03-15",
        //   readingTime: "5 min read",
        //   url:         "https://medium.com/@uskhunte/bulkifying-apex-triggers",
        // },
        // {
        //   title:       "When to Use a Flow vs Apex: A Practical Guide",
        //   date:        "2025-06-01",
        //   readingTime: "7 min read",
        //   url:         "https://medium.com/@uskhunte/flow-vs-apex",
        // },
      ],
    },

    /* Awards & Recognition card.
     *
     * Schema:
     *   title       — award name (e.g. "Spot Award", "Client Appreciation")
     *   issuer      — who gave the award (company, org, or event)
     *   year        — year as a string (e.g. "2024")
     *   description — (optional) one sentence on why it was given
     *
     * To activate: set enabled: true and add real entries to items[]. */
    awards: {
      enabled: false,
      order:   4,
      column:  "left",
      title:   "Awards & Recognition",
      items: [
        // Uncomment and edit to show awards:
        // {
        //   title:       "Spot Award",
        //   issuer:      "Deloitte USI",
        //   year:        "2024",
        //   description: "Recognised for delivering a critical integration project under a tight deadline.",
        // },
        // {
        //   title:       "Trailblazer of the Month",
        //   issuer:      "Salesforce Community",
        //   year:        "2025",
        //   description: "Community recognition for contributions to the Salesforce developer forum.",
        // },
      ],
    },

    /* Languages card — spoken and written languages.
     *
     * Schema:
     *   name  — language name (e.g. "English", "Hindi")
     *   level — proficiency label: "Native", "Professional", or "Conversational"
     *
     * To activate: set enabled: true and add real entries to items[]. */
    languages: {
      enabled: false,
      order:   5,
      column:  "left",
      title:   "Languages",
      items: [
        // Uncomment and edit to show languages:
        // { name: "English", level: "Professional"  },
        // { name: "Hindi",   level: "Native"        },
        // { name: "Telugu",  level: "Conversational" },
      ],
    },

  }, // end sections
}; // end PORTFOLIO
