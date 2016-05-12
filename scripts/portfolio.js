var educations = [];
var projects = [];
var aboutJam = {};

function Education (opts) {
  for (key in opts) this[key] = opts[key];
};

Education.prototype.toHtml = function() {
  var $source = $('#education-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

myEducation.forEach(function(educationObject) {
  educations.push(new Education(educationObject));
});

educations.forEach(function(newEducationObject) {
  $('#educations').append(newEducationObject.toHtml());
});

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
