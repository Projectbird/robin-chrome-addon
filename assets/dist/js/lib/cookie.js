$(document).ready(function(){function e(){$("#welcome").modal(),localStorage.setItem("seen",(new Date).getDate())}function o(){$("#errorModal").modal()}$(function(){window.location.search.indexOf("dave=error")>-1&&o(),localStorage.getItem("seen")==(new Date).getDate()&&e()})});