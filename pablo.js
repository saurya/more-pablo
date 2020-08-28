var REMINDER_PROBABILITY = 0.01;
var BLOG_ENABLED = true;
var FACE_ENABLED = true;
var TWEETS_ENABLED = true;

chrome.storage.sync.get({
    frequency: 1,
    blog: true,
    face: true,
    tweets: true 
}, function(items) {
    REMINDER_PROBABILITY = items.frequency/100;
    BLOG_ENABLED = items.blog;
    FACE_ENABLED = items.face;
    TWEETS_ENABLED = items.tweets;
    main();
  });

function main() {
if(BLOG_ENABLED && Math.random() < REMINDER_PROBABILITY) {
  $('a').click(function() { window.open('//morepablo.com'); });
}

if(FACE_ENABLED && Math.random() < REMINDER_PROBABILITY) {
  // All images will be replaced with an image of Pablo. Mousing over it will lead to Pablo approaching the screen
  // at an unknown velocity.
  $('img').fadeOut('slow');
  window.setTimeout(
    function(){
      $('img').attr('src', chrome.runtime.getURL("img/pablosmile.jpg"));
      $('img').fadeIn(1000); 
      $('img').hover(
        function(){
        $('img').css("width", "200%");           
        $('img').css("height", "200%");           
      },
      function() {
        $('img').css("width", "");           
        $('img').css("height", "");           
      });
    },200);
}

if(TWEETS_ENABLED && Math.random() < REMINDER_PROBABILITY) {
  $('body').append('<a class="twitter-timeline" href="https://twitter.com/SrPablo?ref_src=twsrc%5Etfw">Tweets by SrPablo</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
}
}
