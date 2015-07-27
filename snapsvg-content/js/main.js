$(function() {

  // SVG stuff
  var s = Snap("#playground");

  var hLine = s.line(70, 35, 830, 35);
  hLine.attr({
    stroke: "#c6d9ed",
    strokeWidth: 8
  });

  // the length between two points is 152 (the formula: 830-70 / 5)
  var navItems = [
    { top: 35, left: 70, big: 20, small: 10, name: "one" },
    { top: 35, left: 222, big: 20, small: 10, name: "two" },
    { top: 35, left: 374, big: 20, small: 10, name: "three" },
    { top: 35, left: 526, big: 20, small: 10, name: "four" },
    { top: 35, left: 678, big: 20, small: 10, name: "five" },
    { top: 35, left: 830, big: 20, small: 10, name: "six" }
  ];

  var drawTags = function(navItem) {
    // draw circle
    navItem.outerCircle = s.circle(navItem.left, navItem.top, navItem.big);
    navItem.outerCircle.attr({
      fill: "#c6d9ed",
      strokeWidth: 1
    });
    navItem.innerCircle = s.circle(navItem.left, navItem.top, navItem.small);
    navItem.innerCircle.attr({
      fill: "#c6d9ed",
      strokeWidth: 1
    });
    navItem.tag = s.group(navItem.outerCircle, navItem.innerCircle)
  };

  // animation when click the tag
  var activate = function(navItem) {
    navItem.outerCircle.animate({ fill: "00bcd4" }, 800, mina.easeinout);
    navItem.innerCircle.animate({ fill: "#fff" }, 800, mina.easeinout);
  };

  var deactivate = function(navItem) {
    navItem.outerCircle.animate({ fill: "#c6d9ed" }, 800, mina.easeinout);
    navItem.innerCircle.animate({ fill: "#c6d9ed" }, 800, mina.easeinout);
  };

  var changeNavItem = function(navItems, name) {
    var navItem = $.grep(navItems, function(a){ return a.name == name; })[0];
    $.each(navItems, function(i) {
      if (navItems[i] != navItem) {
        deactivate(navItems[i]);
      }
    });
    activate(navItem);
  };

  var changePanel = function(panel) {
    $('.js-panel-content.active').removeClass('active');
    $('.js-panel-content').fadeOut(0).removeClass('active');
    panel.fadeIn(200).addClass('active');

    if ($('.js-panel-content:last').is(panel)) {
      $('.js-panel-nav-next').addClass('disabled');
    } else {
      $('.js-panel-nav-next').removeClass('disabled');
    }

    if ($('.js-panel-content:first').is(panel)) {
      $('.js-panel-nav-prev').addClass('disabled');
    } else {
      $('.js-panel-nav-prev').removeClass('disabled');
    }
  };

  $.each(navItems, function(i) {
    drawTags(navItems[i]);
    navItems[i].tag.click(function(){
      changeNavItem(navItems, navItems[i].name);
      changePanel($('.js-panel-content-' + navItems[i].name));
    });
  });

  // Panel nav
  var firstPanel = $('.js-panel-content').first();
  firstPanel.addClass('active');
  $('.js-panel-nav-prev').addClass('disabled');

  $('.js-panel-nav-prev').click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) return;

    var activePanel = $('.js-panel-content.active');
    var prevPanel = activePanel.prev('.js-panel-content');
    changePanel(prevPanel);
    changeNavItem(navItems, prevPanel.data('step'));
  });

  $('.js-panel-nav-next').click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) return;

    var activePanel = $('.js-panel-content.active');
    var nextPanel = activePanel.next('.js-panel-content');
    changePanel(nextPanel);
    changeNavItem(navItems, nextPanel.data('step'));
  });

  $('.diagram-icon, .diagram-icon-small').click(function(e) {
    changePanel($('.js-panel-content-'+$(this).data('diagram-step')));
    changeNavItem(navItems, $(this).data('diagram-step'));
  });

  changeNavItem(navItems, firstPanel.data('step'));

  activate(navItems[0]);
});

