// webhook-tracker.js — Add this ONCE to your global JS file or <head>
(function () {
  const WEBHOOK_URL = "https://n8nadmin.1automation.us/webhook/0cf70a7a-eae6-4ac8-8c0e-030b3571d43b";


  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-download, .btn.btn-download");
    if (!btn) return;

    // Grab topic from the page
    const h1 = document.querySelector("h1");
    const topic = h1 ? h1.innerText.trim() : document.title.trim();

    // Grab the download file URL from the button's href
    const fileUrl = btn.href || btn.getAttribute("href") || "";

    // Fire webhook (non-blocking)
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "workflow_download",
        topic: topic,
        page_url: window.location.href,
        file_url: fileUrl,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true, // ensures it sends even if user navigates away
    }).catch(() => {}); // silent fail — never block the download
  });
})();