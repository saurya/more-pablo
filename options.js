var slider = document.getElementById("frequency");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  var output = document.getElementById("demo");
  output.innerHTML = this.value + " out of 100 page loads"; 
}

// Saves options to chrome.storage
function save_options() {
  var frequency = document.getElementById('frequency').value;
  var blog = document.getElementById('blog').checked;
  var face = document.getElementById('face').checked;
  var tweets = document.getElementById('tweets').checked;
  chrome.storage.sync.set({
    frequency: frequency,
    blog: blog,
    face: face,
    tweets: tweets
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    frequency: 1,
    blog: true,
    face: true,
    tweets: true 
  }, function(items) {
    document.getElementById('frequency').value = items.frequency;
    var output = document.getElementById("demo");
    output.innerHTML = items.frequency + " out of 100 pages"; // Display the default slider value
    document.getElementById('blog').checked = items.blog;
    document.getElementById('face').checked = items.face;
    document.getElementById('tweets').checked = items.tweets;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
