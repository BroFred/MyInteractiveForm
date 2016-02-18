angular.module('myApp')
.controller('mainCtrl',function($scope,uuid){
  $scope.quizes=[{
    quizBody:{
      title:null,
      availableOptions:[{id: 1, value:null, isRightAnswer:0},{id: 2, value:null, isRightAnswer:0}]
    },
    isMultiple:0,
    tag:{},
    isComplete:false,
    id:uuid.v4()}];
  $scope.addQuiz=function(){
    $scope.quizes.push({
      quizBody:{
        title:null,
        availableOptions:[{id: 1, value:null, isRightAnswer:0},{id: 2, value:null, isRightAnswer:0}]
      },
      tag:{},
      isMultiple:0,
      isComplete:false,
      id:uuid.v4()});
  }
  $scope.discardQuiz=function(curr){
    var index=$scope.quizes.findIndex(function(obj){
      return curr.id === obj.id;
    });
    $scope.quizes.splice(index,1);
  }
})
.controller('quizController',function($scope,$interval){
  $scope.readyState=1;
  $scope.saveTimer = function(){
    this.saveQuiz();
    console.log('stop');
  }.bind($scope);
  $scope.saveQuiz=function(){
    this.readyState=1;
    console.log('saved');
  }.bind($scope);
  $scope.data={
    availableOptions:[
      {id:2,name:"chose two single",isMultiple:0},
      {id:3,name:"chose three single",isMultiple:0},
      {id:4,name:"chose four single",isMultiple:0},
      {id:4,name:"chose four multiple",isMultiple:1},
      {id:5,name:"chose five multiple",isMultiple:1}
    ],
    selectedOption:{id:2,name:"chose two single",isMultiple:0}
  };
  $scope.addTag=function(){
    $scope.rootQuiz.tag[$scope.currentTag.toLowerCase()]=1;
    $scope.currentTag="";
  }
  $scope.createQuizModel=function(current){
    var arr= [];
    for(var i =1;i<=current.id;i++){
      arr.push({id: i, value:null, isRightAnswer:0});
    }
    $scope.rootQuiz.isMultiple=current.isMultiple;
    $scope.rootQuiz.quizBody.availableOptions=arr;
  };
  $scope.changeSelection=function(current){
    if($scope.rootQuiz.isMultiple){
      return;
    }
    for(var i =1;i<=$scope.data.selectedOption.id;i++){
      if($scope.rootQuiz.quizBody.availableOptions[i-1].id==current.id){
        continue;
      }
      else{
        $scope.rootQuiz.quizBody.availableOptions[i-1].isRightAnswer=0;
      }
    }
  }
})
.directive('quiz',function(){
  return {
    restrict:'E',
    require: '?ngModel',
    templateUrl : 'form.html',
    controller:"quizController",
    link:function(scope,element,attribute){
      var autoSave = function(){
        var inputCheckBoxArr=$("form[name='quizForm']").find("input[type='checkbox']").splice(0,2);
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
}).
directive('learningTag',function(){
    return {
      restrict:'E',
      templateUrl : 'tag.html',
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
});
