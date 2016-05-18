(function(module) {

  var profileView = {};

  profileView.handleProjectFilter = function () {
    $('#category-filter').on('change', function () {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]'.fadeIn());
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
    });
  };

  profileView.create = function() {
    var fillData;
    $('#articles').empty();

    fillData = new Project({
      title: $('#project-title').val(),
      author: $('#project-author').val(),
      authorUrl: $('#project-author-url').val(),
      category: $('#project-category').val(),
      additionalNotes: $('#project-notes').val(),
      contributors: $('#project-contributors').val(),
      publishedOn: $('#project-published:checked').length ? new Date() : null
    });

    $('#articles').append(fillData.toHtml());

    $('#export-field').show();
    $('#project-JSON').val(JSON.stringify(fillData) + ',');
  };

  profileView.initIndexPage = function() {
    Project.all.forEach(function(a){
      if($('#category-filter option:contains("' + a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#category-filter-template')));
      };
      $('#articles').append(a.toHtml($('#article-template')));

    });
    profileView.handleProjectFilter();
  };

  module.profileView = profileView;
})(window);
