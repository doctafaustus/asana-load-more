chrome.storage.sync.get('alm_hide', function(storage) {
  document.querySelector('#' + storage.alm_hide).checked = true;
});

var form = document.querySelector('form');
form.addEventListener('change', function(e) {
  e.preventDefault();
  var hideTasks = document.querySelector('input[name="hide-tasks"]:checked').value;
  console.log('hideTasks', hideTasks);

  chrome.storage.sync.set({ alm_hide: hideTasks } , function() {
    console.log('storage set');
  });

  sendMessage(hideTasks);
});


function sendMessage(hideTasks) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { hideTasks: hideTasks }, function(response){
      console.log('done');
    });
  });
}