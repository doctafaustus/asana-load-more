if (window.location.origin === 'https://app.asana.com') {

  chrome.storage.sync.get('alm_hide', function(storage) {
    addOrRemoveStyle(storage.alm_hide);
  });

  setInterval(function() {
    var loadMoreLink = document.querySelector('.SubtaskGrid-loadMore');
    if (loadMoreLink) loadMoreLink.click();
    markClasses();
  }, 650);

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var message = request.hideTasks;
    addOrRemoveStyle(message);
    return true;
  });

  function addOrRemoveStyle(message) {
    var stylesheet = '.alm-bs-section { display: none !important; }';
    if (message === 'Yes') {
      document.head.insertAdjacentHTML('beforeend', '<style class="alm-style">' + stylesheet + '</style>');
    } else if (message === 'No') {
      [...document.querySelectorAll('.alm-style')].forEach(style => style.remove());
    }
  }

  function markClasses() {
    [...document.querySelectorAll('.TaskGroupHeader-headerContainer span')].forEach(div => {
      if (/(Today|Upcoming|Later)/.test(div.textContent)) {
        div.closest('.TaskGroup--withHeader.TaskGroup--withoutSpreadsheetGridEnabled.TaskGroup').classList.add('alm-bs-section');
      }
    });
  }
}