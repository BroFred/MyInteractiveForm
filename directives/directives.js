angular.module('myApp')
.directive('quiz',function(){
  return {
    restrict:'E',
    require: '?ngModel',
    templateUrl : '../template/form.html',
    controller:"quizController",
    link:function(scope,element,attribute){
      var autoSave = function(){
        var len=scope.rootQuiz.quizBody.availableOptions.length;
        var inputCheckBoxArr=$("form[name='quizForm']").find("input[type='checkbox']").splice(0,len);
        var ischecked=false;
        inputCheckBoxArr.map(function(val){ ischecked=(val.checked||ischecked)});
        if(scope.quizForm.$valid&&scope.titleForm.$valid&&ischecked){
          scope.rootQuiz.isComplete=true;
        }
        else{
          scope.rootQuiz.isComplete=false;
        }
        if(scope.readyState){
          console.log('start');
          scope.readyState=0;
          scope.stop =setTimeout(scope.saveTimer,10000);
        }
      }
      scope.$watch('rootQuiz',autoSave,true);
    }
  }
})
.directive('learningTag',function(){
    return {
      restrict:'E',
      templateUrl : '../template/tag.html',
      scope:{
        tags: '=',
        currentTag:'@'
      },
      controller:function($scope){
        $scope.deleteTag=function(){
          delete $scope.tags[$scope.currentTag];
        }
      }
    }
})
.directive('editArea',function(){
  return {
    restrict: 'E',
    scope:{
      options : '=',
      content : '=',
    },
    templateUrl:'../template/editArea.html',
    controller: 'ckeditorCtrl'
  }
});
