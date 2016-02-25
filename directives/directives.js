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
      },
      controller:function($scope){
        $scope.deleteTag=function(key){
          delete $scope.tags[key];
        }
        $scope.addTag=function(){
          $scope.tags[($scope.inputTag||'').toLowerCase()]=1;
          $scope.inputTag='';
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
    replace : true,
    templateUrl:'../template/editArea.html',
    controller: 'ckeditorCtrl',
    link: function(scope,element,attribute){
      var addValidationClass= function(){
        if(this.content){
          //element.find("div[name ='highLight']").attr('style',"outline: 1px solid blue;");
          element.removeClass('has-error')
          element.addClass('has-success');
          element.find("i[name ='validationMark']").removeClass('glyphicon glyphicon-remove-circle');
          element.find("i[name ='validationMark']").addClass('glyphicon glyphicon-ok-circle');
        }
        else{
          //element.find("div[name ='highLight']").attr('style',"outline: 1px solid red;");
          element.removeClass('has-success');
          element.addClass('has-error');
          element.find("i[name ='validationMark']").removeClass('glyphicon glyphicon-ok-circle');
          element.find("i[name ='validationMark']").addClass('glyphicon glyphicon-remove-circle');
        }
      }.bind(scope);
      scope.$watch(function(){return scope.content},addValidationClass);
    }
  }
})
.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml((htmlCode||'').replace(/\p\>/g,'span\>'));
  }
}])
.directive('previewQuiz',function(){
  return {
    resitric :'E',
    templateUrl:'../template/previewQuiz.html'
  }
});
