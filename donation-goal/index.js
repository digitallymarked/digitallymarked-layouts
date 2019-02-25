// Events will be sent when someone followers
// Please use event listeners to run functions.
document.addEventListener('goalLoad', function(obj) {
  // obj.detail will contain information about the current goal
  // this will fire only once when the widget loads

  //Refactor variables
  var target = obj.detail.amount.target,
    current = obj.detail.amount.current,
    title = obj.detail.title,
    setWidth,
    progressBar2Width = $('#progress-bar2').width(),
    oneBarWidth = 100 / target; //Get 1% bar width when Target=100% width;

  $('#title').text(title);
  $('#goal-current').text(current);
  $('#goal-total').text(target);
  $('#percent').text(parseInt(current * oneBarWidth) + '%');

  //Set progressbar width
  if (current >= target) {
    $('#goal-total').css({
      color: '#0087E8',
    });
    setWidth = progressBar2Width - 40;
  } else {
    setWidth = (progressBar2Width / 100) * (current * oneBarWidth);
  }
  $('#progress-bar').width(setWidth);
  $('#progress-number-wrapper').css({
    left: setWidth,
  });
});
document.addEventListener('goalEvent', function(obj) {
  // obj.detail will contain information about the goal
  $.getScript(
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js',
    function() {
      var target = obj.detail.amount.target,
        current = obj.detail.amount.current,
        progressBar = $('#progress-bar'),
        setWidth,
        oneBarWidth = 100 / target, //Get 1% bar width when Target=100% width
        percentage = $('#progress-number-mark'),
        progressWrapper = $('#progress-number-wrapper'),
        tl = new TimelineMax(),
        countM = {
          val: parseInt($('#goal-current').text()),
        },
        countP = {
          val: parseInt($('#percent').text()),
        },
        offset = 'start+=0.2',
        progressBar2Width = $('#progress-bar2').width();

      //Set progressbar width
      if (current >= target) {
        $('#goal-total').animate(
          {
            color: '#0087E8',
          },
          1000,
        );
        setWidth = progressBar2Width;
      } else {
        setWidth = (progressBar2Width / 100) * (current * oneBarWidth);
      }

      function wobble() {
        if (current < target) {
          tl.to(
            percentage,
            0.5,
            {
              rotation: -10,
              transformOrigin: '50% 100%',
              ease: Power1.easeIn,
            },
            'start+=0.3',
          )
            .to(
              percentage,
              0.5,
              {
                rotation: 5,
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
              },
              '-=0.7',
            )
            .to(
              percentage,
              0.3,
              {
                rotation: 0,
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
              },
              '-=0.3',
            );
        }
      }

      tl.to(
        countM,
        1.5,
        {
          val: current,
          roundProps: 'val',
          onUpdate: function() {
            $('#goal-current').text(countM.val);
          },
          ease: Power4.easeInOut,
        },
        'start',
      )
        .to(
          progressBar,
          1.5,
          {
            width: setWidth,
            ease: Power4.easeInOut,
          },
          offset,
        )
        .to(
          progressWrapper,
          1.5,
          {
            left: setWidth,
            ease: Power4.easeInOut,
          },
          offset,
        )
        .to(
          countP,
          1.5,
          {
            val: current * oneBarWidth,
            roundProps: 'val',
            onUpdate: function() {
              $('#percent').text(countP.val + '%');
            },
            ease: Power4.easeInOut,
          },
          offset,
        )
        .call(wobble());
    },
  );
});
