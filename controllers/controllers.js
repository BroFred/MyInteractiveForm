angular.module('myApp')
.controller('mainCtrl',function($scope,uuid,$location, $anchorScroll){
  $scope.current={}; //shared scope
  //action functions
  $scope.current.foldCtrl=false;
  var gotoBottom = function() {
      $location.hash('top');
      $anchorScroll();
  };
  var focusCurrent = function(){
    $location.hash($scope.current.Edit);
    $anchorScroll();
  }
  $scope.unfold=function(){
    $scope.current.foldCtrl = true;
  }
  //action functions
  $scope.searchCondition='';
  $scope.searchCatagory='0all';
  $scope.QuestionOptions = {
    general:{
      language: 'en'
    },
    isInline: true
  };
  $scope.answerOptions = {
    general:{
      language: 'en'
    },
    isInline: true
  };
  $scope.quizes=[{
    quizBody:{
      title:null,
      availableOptions:[{id: 1, value:'', isRightAnswer:0},{id: 2, value:'', isRightAnswer:0}]
    },
    isMultiple:0,
    tag:{},
    isComplete:0,
    id:uuid.v4()}];
    //TODO add interactiveId here
  $scope.addQuiz=function(){
    var Uid=uuid.v4();
    $scope.quizes.push({
      quizBody:{
        title:null,
        availableOptions:[{id: 1, value:'', isRightAnswer:0},{id: 2, value:'', isRightAnswer:0}]
      },
      tag:{},
      isMultiple:0,
      isComplete:0,
      id:Uid});
      //TODO add interactiveId here
      $scope.current.Edit=Uid;
      focusCurrent();
  }
  $scope.discardQuiz=function(curr){
    var index=$scope.quizes.findIndex(function(obj){
      return curr.id === obj.id;
    });
    $scope.quizes.splice(index,1);
  }
  $scope.current.Edit='';
  $scope.edit=function(currentEdit){
    if($scope.currentEdit===currentEdit){
      $scope.currentEdit='';
    }
    else{
      $scope.currentEdit=currentEdit;
    }
  }
  // $scope.searchBar= function(query) {
  //   return function(currQuiz){
  //     var temp=currQuiz.isComplete;
  //     switch ($scope.searchCatagory) {
  //       case '0all':
  //         return true;
  //       case '1complete':
  //         return temp ? true:false;
  //       case '2unfinished':
  //         return temp ? false:true;
  //       case '3tag':
  //         return ((!query)||(currQuiz.tag[query]));
  //       case '4choice':
  //         return ((!query)||(currQuiz.quizBody.availableOptions.length==query));
  //       default:
  //         return true;
  //     }
  //   }
  // };
  $scope.divAction=function(func){func.func();};
  $scope.floatbtns=
  {'<span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="color:rgb(91,192,222);"></span>':{func:$scope.addQuiz}
  ,'<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true" style="color:rgb(91,192,222);"></span>':null
  ,'<span class="glyphicon glyphicon-pencil" aria-hidden="true" style="color:rgb(91,192,222);"></span>':{func:focusCurrent}
  ,'<span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true" style="color:rgb(91,192,222);"></span>':{func:gotoBottom}
  ,'<span class="glyphicon glyphicon-zoom-in" aria-hidden="true" style="color:rgb(91,192,222);"></span>':{func:$scope.unfold}
  };
})
.controller('quizController',function($scope,$interval){
  $scope.$watch('current.foldCtrl',function(){
    if($scope.current.foldCtrl===true){
      $scope.isFold=false;
    }
  });
  $scope.isFold=false;
  $scope.foldMe=function(){
    $scope.isFold=!$scope.isFold;
    $scope.current.foldCtrl=false;
  }
  $scope.searchBar= function(query) {
    return function(){
      var currQuiz=$scope.rootQuiz;
      var temp=currQuiz.isComplete;
      if($scope.rootQuiz.id ===$scope.current.Edit){
        return true;
      }
      switch ($scope.searchCatagory) {
        case '0all':
          return true;
        case '1complete':
          return temp ? true:false;
        case '2unfinished':
          return temp ? false:true;
        case '3tag':
          return ((!query)||(currQuiz.tag[query]));
        case '4choice':
          return ((!query)||(currQuiz.quizBody.availableOptions.length==query));
        default:
          return true;
      }
    }
  };
  $scope.discardQuiz=function(curr){
    var index=$scope.quizes.findIndex(function(obj){
      return curr.id === obj.id;
    });
    $scope.quizes.splice(index,1);
  }
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
  $scope.createQuizModel=function(current){
    var arr= [];
    for(var i =1;i<=current.id;i++){
      arr.push({id: i, value:'', isRightAnswer:0});
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
.controller('ckeditorCtrl', ['$scope', function ($scope) {
  //Called when the editor is completely ready.
  $scope.onReady = function () {
    // ...
  };
}]);
