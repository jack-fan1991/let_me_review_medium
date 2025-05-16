document.getElementById('redirectButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    let newUrl = `https://freedium.cfd/${url}`;
    chrome.tabs.update(tabs[0].id, { url: newUrl });
  });
});
