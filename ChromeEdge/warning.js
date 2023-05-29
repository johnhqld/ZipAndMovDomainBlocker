document.addEventListener("DOMContentLoaded", function() {
    // Get the blocked URL from the query parameter
    const queryString = window.location.search;
    const queriedUrl = new URLSearchParams(queryString);
    const blockedUrl = queriedUrl.get('originalUrl');
    if (blockedUrl) {
      const blockedUrlElement = document.getElementById("blockedUrl");
      if (blockedUrlElement) {
        blockedUrlElement.textContent = 'Something tried to take you to the site:\r\n\r\n' + blockedUrl;
      }
    }

    const proceedAnyway = document.getElementById("proceedAnyway");
    if (proceedAnyway) {
      proceedAnyway.addEventListener("click", function() {
        chrome.runtime.sendMessage({ unblockDomains: true, blockedUrl:blockedUrl });
      });
    }
    proceedAnyway.classList.add("display-none");
    setTimeout(function() {
      proceedAnyway.classList.remove("display-none");
    }, 5000);
  });
  