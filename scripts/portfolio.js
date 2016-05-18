(function (module) {

  function Project (props) {
    for (keys in props) {
      this[keys] = props[keys];
    }
  }

  Project.all = [];

  Project.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile(scriptTemplateId.html());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Project.loadAll = function(dataWePassIn) {
    dataWePassIn.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });
    Project.all = dataWePassIn.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(next) {
    if (localStorage.projects) {
      $.ajax ({
        type: 'HEAD',
        url: 'data/projects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll(next);
          } else {
            Project.loadAll(JSON.parse(localStorage.projects));
            next();
          }
        }
      });
    } else {
      Project.getAll(next);
    }
  };

  Project.getAll = function(next) {
    $.getJSON('data/projects.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projects = JSON.stringify(responseData);
      next();
    });
  };

//   function Education (opts) {
//     for (key in opts) {
//       this[key] = opts[key];
//     }
//   };
//
//   Education.all = [];
//
//   Education.prototype.toHtml = function(scriptTemplateId) {
//     var template = Handlebars.compile($source);
//     return template(this);
//   };
//
//   Education.loadAll = function(dataWePassIn) {
//     dataWePassIn.sort(function(a,b) {
//       return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
//     });
//     dataWePassIn.forEach(function(ele) {
//       Education.all.push(new Education(ele));
//     });
//   };
//
// // myEducation.forEach(function(educationObject) {
// //   educations.push(new Education(educationObject));
// // });
//
// // educations.forEach(function(newEducationObject) {
// //   $('#educations').append(newEducationObject.toHtml());
// // });
//
//   Education.fetchAll = function() {
//     if (localStorage.educationInfo) {
//       console.log('hola');
//       Education.loadAll(JSON.parse(localStorage.educationInfo));
//       portfolioView.initIndexPage();
//
//       $.ajax({
//         type: 'GET',
//         url: '/data/educationInfo.json',
//         success: function(data, message, xhr) {
//           var eTag = xhr.getResponseHeader('eTag');
//           console.log(message, eTag);
//         }
//       });
//     } else {
//       $.getJSON('/data/educationInfo.json', function(data) {
//         Education.loadAll(data);
//         console.log('hi');
//         localStorage.educationInfo = JSON.stringify(data);
//         portfolioView.initIndexPage();
//       });
//     }
//   };

/* Great work so far! STRETCH GOAL TIME! Refactor your fetchAll above, or
   get some additional typing practice here. Our main goal in this part of the
   lab will be saving the eTag located in Headers, to see if it's been updated!
  Article.fetchAll = function() {
    if (localStorage.hackerIpsum) {
      // Let's make a request to get the eTag (hint: you may need to use a different
      // jQuery method for this more explicit request).
  } else {}
}
*/
//

// function Project (opts) {
//   this.title = opts.title;
//   this.author = opts.author;
//   this.contributors = opts.contributors;
//   this.category = opts.category;
//   this.authorUrl = opts.authorUrl;
//   this.publishedOn = opts.publishedOn;
//   this.additionalNotes = opts.additionalNotes;
// };
//
// Project.prototype.toHtml = function() {
//   var $newProject = $('article.template').clone();
//   $newProject.attr('data-category', this.category);
//   $newProject.find('h1').text(this.title);
//   $newProject.find('a').text(this.author);
//   $newProject.find('a').text(this.contributors);
//   $newProject.find('a').attr('href', this.authorUrl);
//   $newProject.find('time[pubdate]').text(this.publishedOn);
//   $newProject.find('.article-body').html(this.additionalNotes);
//   $newProject.find('time[pubdate]').attr('title', this.publishedOn);
//
//   // Display the date as a relative number of "days ago":
//   $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
//
//   $newProject.append('<hr>');
//   $newProject.removeClass('template');
//
//   return $newProject;
// };
//
// // Sort our data by date published, descending order
// myProjects.sort(function(a,b) {
//   return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
// });
//
// myProjects.forEach(function(ele) {
//   projects.push(new Project(ele));
// });
//
// projects.forEach(function(a){
//   $('.article.template').append(a.toHtml());
// });
//
// //filter by category
// projects.populateFilters = function() {
//   $('#article').each(function() {
//     if (!$(this).hasClass('.template-work')) {
//       val = $(this).attr('data-category');
//       optionTag = '<option value="' + val + '">' + val + '</option>';
//       if ($('#category-filter option[value="' + val + '"]').length === 0) {
//         $('#category-filter').append(optionTag);
//       };
//     };
//   });
// };
//
// //teaser view
// aboutJam.setTeasers = function() {
//   $('.about-content *:nth-of-type(n + 2)').hide();
//   $('.read-on').on('click', function(e) {
//     e.preventDefault();
//     $('.about-content *:nth-of-type(n + 2)').show();
//     $('.read-on').hide();
//   });
// };
//
// $(document).ready( function(){
//   projects.populateFilters();
//   //aboutJam.setTeasers();
// });
  module.Project = Project;
})(window);
