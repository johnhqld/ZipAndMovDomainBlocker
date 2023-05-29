function blockDomains() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1,2],
    addRules: [
      {
        id: 1,
        priority: 1,
        condition: {
          regexFilter: "(.*\\.zip)(.*)",
          resourceTypes: ["main_frame"],
        },
        action: {
          type: "redirect",
          redirect: {
            regexSubstitution: `chrome-extension://${chrome.runtime.id}/warning.html?originalUrl=\\1`,
          },
        },
      },
      {
        id: 2,
        priority: 1,
        condition: {
          regexFilter: "(.*\\.mov)(.*)",
          resourceTypes: ["main_frame"],
        },
        action: {
          type: "redirect",
          redirect: {
            regexSubstitution: `chrome-extension://${chrome.runtime.id}/warning.html?originalUrl=\\1`,
          },
        },
      },
    ],
  });
}

function unblockDomains() {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [1],
    }
  ).then()
}

chrome.runtime.onInstalled.addListener(() => {
  blockDomains();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.unblockDomains) {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [1],
      },
      () => {
        var blockedUrl = request.blockedUrl;
        chrome.tabs.update(sender.tab.id, { url: blockedUrl });
        setTimeout(function () {
          blockDomains();
        }, 3000);
      }
    )
  }
});