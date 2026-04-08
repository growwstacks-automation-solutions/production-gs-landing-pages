(function () {
  // ── Converts Google Drive share/view URLs to a directly embeddable image URL ──
  function resolveImageUrl(url) {
    if (!url || !url.trim()) return null;

    const driveMatch = url.match(
      /drive\.google\.com\/(?:file\/d\/([^/?#]+)|open\?id=([^&]+))/
    );

    if (driveMatch) {
      const fileId = driveMatch[1] || driveMatch[2];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
    }

    return url;
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80";

  function createTemplateCard(item) {
    const resolvedImage = resolveImageUrl(item.image) || fallbackImage;

    return `
      <div class="template-card">
        <div class="card-image">
          <img 
            src="${resolvedImage}" 
            alt="${item.title || "Template"}"
            loading="lazy"
            onerror="this.onerror=null;this.src='${fallbackImage}'"
          />
        </div>
        <div class="card-content">
          <h3>${item.title || ""}</h3>
          <p class="display-title">${item.description || item.displayTitle || ""}</p>
          <div class="card-actions">
            <a href="${item.driveUrl || "#"}" target="_blank" rel="noopener noreferrer">Download Template</a>
          </div>
        </div>
      </div>
    `;
  }

  function applyCardAnimation(container) {
    if (!("IntersectionObserver" in window)) return;

    const cards = container.querySelectorAll(".template-card");

    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = `opacity .5s ease ${i * 70}ms, transform .5s ease ${i * 70}ms`;
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card) => obs.observe(card));
  }

  function renderServiceAppTemplates() {
    const containers = document.querySelectorAll("[data-service-app]");
    if (!containers.length) return;

    if (typeof window.templateData === "undefined" || !Array.isArray(window.templateData)) {
      console.error("templateData is missing. Check if service-app-cart.js is loaded first.");
      return;
    }

    containers.forEach((container) => {
      const appName = (container.dataset.app || "").toLowerCase().trim();
      const initialLimit = parseInt(container.dataset.limit || "9", 10);
      const loadMoreStep = parseInt(container.dataset.loadmore || "9", 10);

      if (!appName) return;

      const filteredTemplates = window.templateData.filter(
        (item) =>
          Array.isArray(item.apps) &&
          item.apps.some((app) => app.toLowerCase().trim() === appName)
      );

      if (!filteredTemplates.length) {
        container.innerHTML = `
          <div class="no-templates">
            <h3>No templates found</h3>
            <p>No templates available for <strong>${appName}</strong>.</p>
          </div>
        `;
        return;
      }

      let visibleCount = initialLimit;

      function renderCards() {
        const visibleTemplates = filteredTemplates.slice(0, visibleCount);
        const hasMore = visibleCount < filteredTemplates.length;

        container.innerHTML = `
          <div class="templates-grid">
            ${visibleTemplates.map(createTemplateCard).join("")}
          </div>
          ${
            hasMore
              ? `
            <div class="show-more-wrap">
              <button class="show-more-btn" type="button">Show More</button>
            </div>
          `
              : ""
          }
        `;

        applyCardAnimation(container);

        const showMoreBtn = container.querySelector(".show-more-btn");
        if (showMoreBtn) {
          showMoreBtn.addEventListener("click", function () {
            visibleCount += loadMoreStep;
            renderCards();
          });
        }
      }

      renderCards();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderServiceAppTemplates);
  } else {
    renderServiceAppTemplates();
  }
})();