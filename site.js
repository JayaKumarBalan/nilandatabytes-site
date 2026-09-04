const menu = document.querySelector(".menu");
const nav = document.querySelector(".main-nav");
if (menu && nav) {
  const closeMenu = () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
  };

  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
    const isOpen = nav.classList.contains("open");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menu.focus();
    }
  });
}

document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

document
  .querySelectorAll(".tech-mark")
  .forEach((mark) => mark.setAttribute("aria-hidden", "true"));

const projectButton = document.querySelector(".interactive-cta");
if (projectButton) {
  projectButton.addEventListener("pointermove", (event) => {
    const box = projectButton.getBoundingClientRect();
    projectButton.style.setProperty("--mx", `${event.clientX - box.left}px`);
    projectButton.style.setProperty("--my", `${event.clientY - box.top}px`);
  });
}

const opsCenter = document.querySelector("#opsCenter");
if (opsCenter) {
  const services = opsCenter.querySelectorAll(".ops-service");
  const dashboard = opsCenter.querySelector(".ops-dashboard");
  const title = document.querySelector("#opsTitle");
  const description = document.querySelector("#opsDescription");
  const kpi = document.querySelector("#opsKpi");
  const kpiLabel = document.querySelector("#opsKpiLabel");
  let selected = opsCenter.querySelector(".ops-service.active");

  const telemetryProfiles = {
    monitoring: [
      ["Query latency", "42 ms", "↓ 18% optimized"],
      ["Database health", "Stable", "✓ Checks passed"],
      ["Active alerts", "0", "● Healthy"],
    ],
    architecture: [
      ["Data model", "Scalable", "✓ Workload aligned"],
      ["Capacity plan", "Defined", "✓ Growth ready"],
      ["Resilience", "Designed", "✓ Failure aware"],
    ],
    development: [
      ["SQL quality", "Reviewed", "✓ Maintainable patterns"],
      ["Pipeline checks", "Passed", "✓ Validation enabled"],
      ["Delivery state", "Ready", "● Production prepared"],
    ],
    optimization: [
      ["Baseline latency", "10.0 s", "● Before tuning"],
      ["Optimized latency", "4.0 s", "↓ Featured engagement"],
      ["Improvement", "Up to 60%", "✓ Highest-impact first"],
    ],
    administration: [
      ["Maintenance plan", "Active", "✓ Scheduled controls"],
      ["Access review", "Current", "✓ Least privilege"],
      ["Coverage", "24/7", "● Options available"],
    ],
    cloud: [
      ["Migration plan", "Ready", "✓ Rollback included"],
      ["Platform fit", "Cloud-ready", "✓ Right-sized design"],
      ["Team enablement", "Practical", "✓ Knowledge transferred"],
    ],
  };

  function showCapability(service, commit = false) {
    services.forEach((item) =>
      item.classList.toggle("active", item === service),
    );
    title.textContent = service.dataset.title;
    description.textContent = service.dataset.description;
    kpi.textContent = service.dataset.kpi;
    kpiLabel.textContent = service.dataset.label;
    applyTelemetry(service.dataset.capability);
    updateActivityLine(service.dataset.capability);
    dashboard.classList.remove("switching");
    void dashboard.offsetWidth;
    dashboard.classList.add("switching");
    if (commit) selected = service;
  }

  services.forEach((service) => {
    service.addEventListener("pointerenter", () => showCapability(service));
    service.addEventListener("focus", () => showCapability(service));
    service.addEventListener("click", () => showCapability(service, true));
  });
  opsCenter.addEventListener("pointerleave", () => showCapability(selected));
  opsCenter.addEventListener("focusout", (event) => {
    if (!opsCenter.contains(event.relatedTarget)) showCapability(selected);
  });

  const latencyCard = document.querySelector("#latencyCard");
  const metricOneLabel = document.querySelector("#metricOneLabel");
  const latencyValue = document.querySelector("#latencyValue");
  const latencyChange = document.querySelector("#latencyChange");
  const healthCard = document.querySelector("#healthCard");
  const metricTwoLabel = document.querySelector("#metricTwoLabel");
  const healthValue = document.querySelector("#healthValue");
  const healthChange = document.querySelector("#healthChange");
  const alertsCard = document.querySelector("#alertsCard");
  const metricThreeLabel = document.querySelector("#metricThreeLabel");
  const alertsValue = document.querySelector("#alertsValue");
  const alertsChange = document.querySelector("#alertsChange");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const activityIcon = document.querySelector("#activityIcon");
  const activityCopy = document.querySelector("#activityCopy");
  const activityTitle = document.querySelector("#activityTitle");
  const activityDetail = document.querySelector("#activityDetail");
  const trainingTechList = document.querySelector("#trainingTechList");
  const activityTime = document.querySelector("#activityTime");

  function updateActivityLine(capability) {
    const isTraining = capability === "cloud";
    activityIcon.textContent = isTraining ? "✦" : "✓";
    activityCopy.hidden = isTraining;
    trainingTechList.hidden = !isTraining;
    activityTime.textContent = isTraining ? "HANDS-ON" : "NOW";
    if (!isTraining) {
      activityTitle.textContent = "Protection running";
      activityDetail.textContent =
        "Monitoring · performance · resilience · cloud readiness";
    }
  }

  function applyTelemetry(capability) {
    const profile = telemetryProfiles[capability];
    if (!profile) return;
    const fields = [
      [metricOneLabel, latencyValue, latencyChange],
      [metricTwoLabel, healthValue, healthChange],
      [metricThreeLabel, alertsValue, alertsChange],
    ];
    fields.forEach((field, index) => {
      field[0].textContent = profile[index][0];
      field[1].textContent = profile[index][1];
      field[2].textContent = profile[index][2];
    });
    [latencyCard, healthCard, alertsCard].forEach((card) => {
      card.classList.remove("is-resolving", "is-resolved");
    });
  }

  function animateNumber(duration, update) {
    const startedAt = performance.now();
    function frame(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      update(eased);
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function resolveCard(card) {
    card.classList.remove("is-resolving");
    card.classList.add("is-resolved");
  }

  function bootOperationsCenter() {
    if (prefersReducedMotion.matches || opsCenter.dataset.booted) return;
    opsCenter.dataset.booted = "true";
    opsCenter.classList.add("is-booting");
    kpi.textContent = "0.00%";
    latencyValue.textContent = "10.0 s";
    latencyChange.textContent = "▲ baseline latency";
    healthValue.textContent = "Assessing…";
    healthChange.textContent = "● analyzing signals";
    alertsValue.textContent = "3";
    alertsChange.textContent = "● Attention needed";
    [latencyCard, healthCard, alertsCard].forEach((card) =>
      card.classList.add("is-resolving"),
    );
    const monitoringIsVisible = () =>
      opsCenter.querySelector(".ops-service.active")?.dataset.capability ===
      "monitoring";

    window.setTimeout(() => {
      animateNumber(1250, (progress) => {
        if (!monitoringIsVisible()) return;
        kpi.textContent = `${(99.99 * progress).toFixed(2)}%`;
      });
    }, 1150);

    window.setTimeout(() => {
      animateNumber(1450, (progress) => {
        if (!monitoringIsVisible()) return;
        const milliseconds = Math.round(10000 - 9958 * progress);
        latencyValue.textContent =
          milliseconds >= 1000
            ? `${(milliseconds / 1000).toFixed(1)} s`
            : `${milliseconds} ms`;
        latencyChange.textContent = `↓ ${Math.round(18 * progress)}% optimized`;
      });
    }, 1450);

    window.setTimeout(() => {
      if (!monitoringIsVisible()) return;
      alertsValue.textContent = "2";
      alertsChange.textContent = "● Resolving signals";
    }, 1750);
    window.setTimeout(() => {
      if (!monitoringIsVisible()) return;
      alertsValue.textContent = "1";
    }, 2200);
    window.setTimeout(() => {
      if (!monitoringIsVisible()) return;
      alertsValue.textContent = "0";
      alertsChange.textContent = "● Healthy";
      resolveCard(alertsCard);
    }, 2700);
    window.setTimeout(() => {
      if (!monitoringIsVisible()) return;
      healthValue.textContent = "Stable";
      healthChange.textContent = "✓ Checks passed";
      resolveCard(healthCard);
    }, 2850);
    window.setTimeout(() => {
      if (monitoringIsVisible()) {
        latencyValue.textContent = "42 ms";
        latencyChange.textContent = "↓ 18% optimized";
        resolveCard(latencyCard);
      }
      opsCenter.classList.remove("is-booting");
    }, 3050);
  }

  if (latencyCard && healthCard && alertsCard) {
    const bootObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        bootObserver.disconnect();
        bootOperationsCenter();
      },
      { threshold: 0.35 },
    );
    bootObserver.observe(opsCenter);
  }
}

const technologyTabs = document.querySelectorAll("[data-tech-tab]");
const technologyPanels = document.querySelectorAll("[data-tech-panel]");

if (technologyTabs.length && technologyPanels.length) {
  function activateTechnologyTab(tab, moveFocus = false) {
    const category = tab.dataset.techTab;
    technologyTabs.forEach((item) => {
      const isActive = item === tab;
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });
    technologyPanels.forEach((panel) => {
      panel.hidden = panel.dataset.techPanel !== category;
    });
    if (moveFocus) tab.focus();
  }

  technologyTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTechnologyTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;
      if (event.key === "ArrowRight")
        nextIndex = (index + 1) % technologyTabs.length;
      if (event.key === "ArrowLeft")
        nextIndex = (index - 1 + technologyTabs.length) % technologyTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = technologyTabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activateTechnologyTab(technologyTabs[nextIndex], true);
    });
  });

  document.querySelectorAll("[data-open-tech]").forEach((link) => {
    link.addEventListener("click", () => {
      const target = [...technologyTabs].find(
        (tab) => tab.dataset.techTab === link.dataset.openTech,
      );
      if (target) activateTechnologyTab(target);
    });
  });
}

const helpType = document.querySelector("#helpType");
const technologyField = document.querySelector("#technologyField");
const formTechOptions = document.querySelector("#formTechOptions");
const selectedTechnologies = document.querySelector("#selectedTechnologies");
const technologyHint = document.querySelector("#technologyHint");
const technologyError = document.querySelector("#technologyError");
const projectForm = document.querySelector("form.form");

if (helpType && technologyField && formTechOptions && selectedTechnologies) {
  const technologyChoices = {
    database: [
      "SQL Server",
      "Azure SQL",
      "Oracle Database",
      "PostgreSQL",
      "MySQL",
      "Firebird",
      "MongoDB",
      "Apache Cassandra",
      "DataStax Cassandra",
      "Firebase",
    ],
    etl: ["SSIS", "Azure Data Factory", "Talend", "Databricks", "Python"],
    reporting: ["SSRS", "Power BI", "Power BI Paginated Reports"],
    cloud: [
      "Azure SQL Managed Instance",
      "Azure Synapse",
      "Azure Databricks",
      "Amazon Web Services",
      "Google Cloud Platform",
      "BigQuery",
      "Snowflake",
    ],
    performance: [
      "SQL Server",
      "Azure SQL",
      "Oracle Database",
      "PostgreSQL",
      "MySQL",
      "Firebird",
      "MongoDB",
      "Apache Cassandra",
      "DataStax Cassandra",
      "Firebase",
    ],
    monitoring: [
      "SQL Server",
      "Azure SQL",
      "Oracle Database",
      "PostgreSQL",
      "MySQL",
      "Firebird",
      "MongoDB",
      "Apache Cassandra",
      "DataStax Cassandra",
      "Firebase",
    ],
    training: [
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "SSIS",
      "Azure Data Factory",
      "Power BI",
      "Azure",
      "GCP",
      "Databricks",
      "Python",
      "SSRS",
      "Snowflake",
    ],
    unsure: [],
  };
  const otherChoice = "Other / Not sure";
  let chosen = new Set();

  function syncTechnologyValue() {
    selectedTechnologies.value = [...chosen].join(", ");
    technologyError.textContent = "";
  }

  function renderTechnologyChoices() {
    chosen = new Set();
    selectedTechnologies.value = "";
    formTechOptions.replaceChildren();
    const category = helpType.value;
    technologyField.disabled = !category;
    technologyHint.textContent = category
      ? "Select one or more technologies."
      : "Choose an area first. You can select more than one technology.";
    if (!category) return;

    [...technologyChoices[category], otherChoice].forEach((technology) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "form-tech-option";
      button.textContent = technology;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        if (chosen.has(technology)) chosen.delete(technology);
        else chosen.add(technology);
        button.setAttribute("aria-pressed", String(chosen.has(technology)));
        syncTechnologyValue();
      });
      formTechOptions.append(button);
    });
  }

  helpType.addEventListener("change", renderTechnologyChoices);
  projectForm?.addEventListener("submit", (event) => {
    if (chosen.size) return;
    event.preventDefault();
    technologyError.textContent = "Select at least one technology.";
    formTechOptions.querySelector("button")?.focus();
  });
}

const aiBriefTrigger = document.querySelector(".ai-brief-trigger");
const aiDrawer = document.querySelector("#nilanAiDrawer");
const aiOverlay = document.querySelector(".ai-drawer-overlay");

if (aiBriefTrigger && aiDrawer && aiOverlay) {
  const closeControls = document.querySelectorAll("[data-ai-close]");
  const typingIndicator = aiDrawer.querySelector("#aiTyping");
  const summary = aiDrawer.querySelector("#aiSummary");
  const guidedContent = aiDrawer.querySelector("#aiGuidedContent");
  const topicButtons = aiDrawer.querySelectorAll("[data-ai-topic]");
  const recommendation = aiDrawer.querySelector("#aiRecommendation");
  const responseTitle = aiDrawer.querySelector("#aiResponseTitle");
  const responseText = aiDrawer.querySelector("#aiResponseText");
  const responseService = aiDrawer.querySelector("#aiResponseService");
  const contactLink = aiDrawer.querySelector(".ai-contact");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastFocus = null;
  let typeTimer = null;
  let closeTimer = null;
  let focusTimer = null;

  const introduction =
    "Nilan DataBytes is a hands-on database engineering partner. We help businesses architect, develop, monitor, administer, tune and modernize business-critical database environments, with practical training and knowledge transfer when teams need it.";

  const answers = {
    performance: {
      title: "Make slow systems responsive again",
      text: "We baseline the workload, analyze execution plans, identify expensive queries, and review indexes and configuration. You receive a prioritized optimization plan focused on measurable bottlenecks.",
      service: "Recommended service: Database Performance Audit",
    },
    monitoring: {
      title: "Detect problems before users feel them",
      text: "We design practical monitoring around availability, workload health, backups, capacity and actionable alerts—then establish reporting and response routines your team can trust.",
      service: "Recommended service: Proactive Database Monitoring",
    },
    administration: {
      title: "Add dependable DBA depth",
      text: "We support routine maintenance, backup and recovery, access controls, patching, capacity planning and incident response for teams that need experienced operational coverage.",
      service: "Recommended service: Managed DBA Services",
    },
    migration: {
      title: "Move with a tested, low-risk plan",
      text: "We assess dependencies, rehearse the migration, design cutover and rollback paths, validate data and workloads, and optimize the new environment after the move.",
      service: "Recommended service: Cloud Migration & Modernization",
    },
    development: {
      title: "Build data solutions that stay maintainable",
      text: "We design schemas, SQL, stored procedures and ETL pipelines with validation, observability and documentation built in—not added after production problems appear.",
      service: "Recommended service: Database & ETL Engineering",
    },
    training: {
      title: "Turn database knowledge into team capability",
      text: "We deliver practical, role-based training for SQL, database operations, ETL and cloud platforms, tailored to the scenarios and systems your team actually works with.",
      service: "Recommended service: Database & Cloud Training",
    },
  };

  function finishIntroduction() {
    typingIndicator.classList.add("is-done");
    guidedContent.hidden = false;
  }

  function typeIntroduction() {
    window.clearTimeout(typeTimer);
    summary.textContent = "";
    typingIndicator.classList.remove("is-done");
    guidedContent.hidden = true;
    recommendation.hidden = true;
    topicButtons.forEach((button) => button.classList.remove("is-active"));

    if (reducedMotion.matches) {
      summary.textContent = introduction;
      finishIntroduction();
      return;
    }

    let index = 0;
    typeTimer = window.setTimeout(function typeNextCharacter() {
      summary.textContent += introduction[index];
      index += 1;
      if (index < introduction.length) {
        typeTimer = window.setTimeout(typeNextCharacter, 7);
      } else {
        finishIntroduction();
      }
    }, 350);
  }

  function openDrawer() {
    window.clearTimeout(closeTimer);
    window.clearTimeout(focusTimer);
    lastFocus = document.activeElement;
    aiOverlay.hidden = false;
    aiDrawer.inert = false;
    aiDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("ai-open");
    typeIntroduction();
    window.requestAnimationFrame(() => {
      aiOverlay.classList.add("is-open");
      aiDrawer.classList.add("is-open");
      focusTimer = window.setTimeout(
        () => aiDrawer.querySelector(".ai-close")?.focus({ preventScroll: true }),
        reducedMotion.matches ? 0 : 430,
      );
    });
  }

  function closeDrawer(restoreFocus = true) {
    window.clearTimeout(typeTimer);
    window.clearTimeout(focusTimer);
    aiOverlay.classList.remove("is-open");
    aiDrawer.classList.remove("is-open");
    aiDrawer.setAttribute("aria-hidden", "true");
    aiDrawer.inert = true;
    document.body.classList.remove("ai-open");
    closeTimer = window.setTimeout(
      () => {
        aiOverlay.hidden = true;
      },
      reducedMotion.matches ? 0 : 360,
    );
    if (restoreFocus && lastFocus instanceof HTMLElement) lastFocus.focus();
  }

  function showRecommendation(button) {
    const answer = answers[button.dataset.aiTopic];
    if (!answer) return;
    topicButtons.forEach((item) =>
      item.classList.toggle("is-active", item === button),
    );
    responseTitle.textContent = answer.title;
    responseText.textContent = answer.text;
    responseService.textContent = answer.service;
    recommendation.hidden = false;
    recommendation.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "nearest",
    });
  }

  aiBriefTrigger.addEventListener("click", openDrawer);
  closeControls.forEach((control) =>
    control.addEventListener("click", () => closeDrawer()),
  );
  topicButtons.forEach((button) =>
    button.addEventListener("click", () => showRecommendation(button)),
  );
  contactLink.addEventListener("click", () => closeDrawer(false));

  document.addEventListener("keydown", (event) => {
    if (!aiDrawer.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [
      ...aiDrawer.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.offsetParent !== null);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
