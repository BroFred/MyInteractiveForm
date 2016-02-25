angular.module('myApp')
.controller('mainCtrl',function($scope,uuid){
  $scope.searchCondition='';
  $scope.searchCatagory='0all';
  $scope.current={}; //shared scope
  $scope.QuestionOptions = {
    general:{
      language: 'en',
      height:'100px'
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
      $scope.current.Edit=Uid;
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
  $scope.searchBar= function(query) {
    return function(currQuiz){
      var temp=currQuiz.isComplete;
      switch ($scope.searchCatagory) {
        case '0all':
          return true;
        case '1complete':
          return temp ? true:false;
        case '2unfinished':
          return temp ? false:true;
        case '3tag':
        console.log(query)
          return ((!query)||(currQuiz.tag[query]));
        case '4choice':
          return ((!query)||(currQuiz.quizBody.availableOptions.length==query));
        default:
          return true;
      }
    }
  };
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
