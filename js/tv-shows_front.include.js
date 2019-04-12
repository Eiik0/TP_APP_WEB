(function()
{
  var lib ;
  function NewTVShowCard(tvShow){
    var colonn = $("<div>", {class: "col-md-6 col-xs-12 pb-4"});
    var card = $("<div>", {class: "card"});
    var cardBody = $("<div>", {class:" card-body text-right"});
    var name = tvShow.name;
    var h1 = $("<h1>", {class:"text-right mb-4"}).text(name);
    var img = $("<img>", { "src": tvShow.thumbnail, "alt": tvShow.name, height: "135", class: "float-left"});
    var note = tvShow.score;
    var circle = $("<span>", { class:"rounded-circle bg-dark text-light border p-4"}).text(note);

    cardBody.append(img);
    cardBody.append(h1);
    cardBody.append(circle);
    card.append(cardBody);
    colonn.append(card);

    return colonn;

  }

  function setFrontList()
  {
    
    var results = lib.query();

    var len = results.tvShows.length;
    $("#list").empty();

    for(var i = 0; i < len; i++){

      $("#list").append(NewTVShowCard(results.tvShows[i]));
      }

      $("#pagination").empty();
      for (var i=0; i<results.pagination.pagesNb; i++)
      {
        var label = $("<label>", {class: "btn btn-outline-primary"});
        if ( i == results.pagination.page)
        {
            label.addClass("active")
        }

        var input = $("<input>",{type: "radio", name: "page", value: i }).change(function()
        {
          lib.setCurrentPage($(this).attr("value"));
          setFrontList();
        });
        label.append(input);
        label.append(i+1);

        $("#pagination").append(label);

      }

      for(var i = 0; i < len; i++){

        $("#genres").append(getGenres());
        }
        $("#genres").append(label);
        


  }

  function clearLocalStorage() {
    const lib = new TVShowsLibrary();
    switch (window.location.hash) {
      case "#refresh":
        lib.clearLocalStorage(window.location.href.replace(/#refresh/, ""));
        break;
      case "#clean":
        lib.clearLocalStorage();
        break;
    }
  }

  window.addEventListener("load", function() {
    window.addEventListener("hashchange", clearLocalStorage);
   lib = new TVShowsLibrary();
    $("[name=sort]").change(function() {
      lib.getSortingType();
      lib.setSortingType($(this).attr("value"));
      setFrontList();
    });

    $("[name=order]").change(function() {
      lib.getSortingType();
      lib.setSortingType($(this).attr("value"));
      setFrontList();
    });

    setFrontList();
  });

})();
