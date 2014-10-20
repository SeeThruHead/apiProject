
//Create The Marvel Module and namespace it, wrap it in a closure (?)
var Marvel = (function() {
  //Private variables.
  var endPoint = 'http://gateway.marvel.com/v1/public/comics',
    publicKey = 'cbd0ec038282397da14d8a94d56bbd74',
    $page = $('#page'),
    template = Handlebars.compile($('#template').html()),
    yearStart,
    results = {},
    order = 'ascending';

  //Initialization methods
  function init(start, end) {
    //initialize the app
    $page.empty();
    yearStart = start;
    if (start > end) {
      order = 'descending';
    }
    bindEvents();
    getData(start, end);
    createContainers(start, end);

  };
  function bindEvents() {
    //Bind event handlers in the UI
  };
  //APP methods
  function getData(start, end) {
    //perform ajax requests
    function getYear(year) {
      var url = "http://gateway.marvel.com/v1/public/comics?limit=100&format=comic&formatType=comic&dateRange="+year+"-01-01%2C"+year+"-12-31&apikey="+publicKey;
      $.get(url).done(function(res) {
        results[year] = res;
        paintData(year);
      });
    };
    if (order === 'descending') {
      for (i=start; i >= end; i--)getYear(i);
    } else {
      for (i = start; i <= end; i++)getYear(i);
    }
  };
  function pickRandom() {
    //pick a random number of comics to display fromeach year
  };
  function refresh(year) {
    //refresh the year with new data
  };

  function createContainers(start, end) {
    //Create the containers for the information to slot into
    //give them numbered id's
    var containers = [],
    $wrapper = $('<div class="wrapper">');
    // create an array of the containers, ill need them later
    if (order === 'ascending') {
      var amount = end - start + 1;
      for (i=0; i < amount;)
        containers.push($('<div class="yearContainer" id="'+ (start + i++) +'">'));
    } else {
      var amount = start - end + 1;
      for (i=0; i < amount;)
        containers.push($('<div class="yearContainer" id="'+ (start - i++) +'">'));
    }
    $wrapper.append(containers);
    $page.append($wrapper);
  };


  function paintData(containerYear) {
    var index = containerYear - yearStart;
    // display the data to the user
    var data = results[containerYear].data.results;
    // console.log(data);
    var comics = []
    $.each(data, function(i) {
      if (data[i].thumbnail && data[i].thumbnail.path != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
        comics.push({
          cover: data[i].thumbnail.path+ '.' + data[i].thumbnail.extension,
          url: data[i].urls[0].url,
          title: data[i].title,
          description: data[i].description
        });
      };
    });
    var templateData = {
      year: containerYear,
      comics: comics
    }
    var currentContainer = $page.find('#'+containerYear);
    currentContainer.append(template(templateData));
    currentContainer.find('a').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeOut();
      $modal = $(this).next('.modal');
      $modal.fadeIn();
      $modal.on('click', function() {
        $(this).fadeOut();
      });
    });
    console.log('Year ' + containerYear + ' has been painted to the dom.');
  };

  //Return public methods
  return {
    run: init,
    // results: results,
  };
})();





//Doc Ready
$(function() {
  $('.menu').load('list.html', function() {
    $('button').on('click', function(e) {
      e.preventDefault();
      Marvel.run(+$('#startYear').val(), +$('#endYear').val());
    });
  });
});



