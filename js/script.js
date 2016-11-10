var myApp  =  angular.module('myApp', ['angularUtils.directives.dirPagination','ui.bootstrap']);

myApp.controller('jsonCtrl', function($scope, $http, Utils){
  $http.get('https://api.mlab.com/api/1/databases/beohar/collections/books?f={"description": 0}&apiKey=b_5fGGEMccYn-IyQ9ZcaXDwtBYOwcipK').success(function (data){
    $scope.books = data;
  });

  $scope.wishlist = [];
  $scope.discount_value = 0;
  $scope.total_value = 0;

  $scope.sort = function(keyname){
    $scope.sortKey = keyname;   //set the sortKey to the param passed
    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  }

  $scope.getTotalBooks = function() {
      return $scope.wishlist.length;    
  }

  $scope.getCartValue = function() {
      return $scope.total_value;
  }

  $scope.reversedMessage = function() {
      return $scope.empName.split("").reverse().join("");
  }
  
 $scope.addBook = function(bookid, book_id, price) {
    $scope.wishlist.push(book_id);
    btnid = "btn_" + bookid;
    $scope.total_value = $scope.total_value + price;
    $scope.discount_value = $scope.total_value - Math.round($scope.total_value / 5);
    $scope[btnid] = true;
 }

 $scope.removeBook = function(bookid, book_id, price) {
    var index = $scope.wishlist.indexOf(book_id);
    $scope.wishlist.splice(index, 1);
    btnid = "btn_" + bookid;
    $scope.total_value = $scope.total_value - price;
    $scope.discount_value = $scope.total_value - Math.round($scope.total_value / 5);
    $scope[btnid] = false;
 }

  $scope.filterbyISBN = function(book_obj) {
    var checkid = $scope.wishlist.indexOf(book_obj.book_id);
    return (checkid >= 0) ? true : false;
  }

  $scope.filterListing = function(book_obj) {
    var checklisting = book_obj.listing;
    return (checklisting == 0) ? false : true;
  }

$scope.getBookInfo = function(book_id, book_description, book_title) {
  document.getElementById("book_img1").src = "bookimg/placeholder4.jpg";
  document.getElementById("book_img2").src = "bookimg/placeholder3.jpg";
  document.getElementById("book_img3").src = "bookimg/desc_back.png";
  var bsrc1 = "bookimg/2016/" + book_id + "_1.jpg";
  var bsrc2 = "bookimg/2016/" + book_id + "_2.jpg";
  var bsrc3 = "bookimg/2016/" + book_id + "_3.jpg";
  document.getElementById("book_info_title").innerHTML = book_title;
  
  Utils.isImage(bsrc1).then(function(test) {
    if(test) {
      document.getElementById("book_img1").src = bsrc1;
    }
    else {
      document.getElementById("book_img1").src = "bookimg/placeholder4.jpg";
    }
  });

  Utils.isImage(bsrc2).then(function(test) {
    if(test) {
      document.getElementById("book_img2").src = bsrc2;
    }
    else {
      document.getElementById("book_img2").src = "bookimg/placeholder3.jpg";
    }
  });
  
  Utils.isImage(bsrc3).then(function(test) {
    if(test) {
      document.getElementById("book_img3").src = bsrc3;
    }
    else {
      document.getElementById("book_img3").src = "bookimg/desc_back.png";
    }
  });
  
    document.getElementById("book_description").innerHTML = book_description;

    return true;
  };
})

.controller('TabController', ['$scope', function($scope) {
    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
       return $scope.tab === tabNum;
    };
}]);

myApp.directive("moreInfo", function() {
    return {
        restrict : "E",
        templateUrl : "views/bookInfo.html"
    };
});

myApp.constant('chunkSize', 50);

  myApp.controller('BookListingController', function($scope, chunkSize) {
      $scope.stockList = [];

      var currentIndex = 0;
      var todayDate = new Date();
      $scope.loadMoreRecords = function() {
          // Mocking stock values 
          // In an real application, data would be retrieved from an
          // external system
          
          var stock;
          var i = 0;
          while (i < chunkSize) {
              currentIndex++;
              var newDate = new Date();
              newDate.setDate(todayDate.getDate() - currentIndex);
              if (newDate.getDay() >= 1 && newDate.getDay() <= 5) {
                  stock = {
                      dateValue: newDate,
                      price: 20.0 + Math.random() * 10
                  };
                  $scope.stockList.push(stock);
                  i++;
              }
          }
      };

      $scope.loadMoreRecords();
  });

  myApp.directive('whenScrollEnds', function() {
      return {
          restrict: "A",
          link: function(scope, element, attrs) {
              var visibleHeight = element.height();
              var threshold = 100;

              element.scroll(function() {
                  var scrollableHeight = element.prop('scrollHeight');
                  var hiddenContentHeight = scrollableHeight - visibleHeight;

                  if (hiddenContentHeight - element.scrollTop() <= threshold) {
                      // Scroll is almost at the bottom. Loading more rows
                      scope.$apply(attrs.whenScrollEnds);
                  }
              });
          }
      };
  });

/*
//err-src="data/bookimg/Placeholder_book.png"
myApp.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        console.log(attrs.src);
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
*/

$(function () {
    $('#myCarousel').carousel({
        interval:2000,
        pause: "false"
    });
    $('#playButton').click(function () {
        $('#myCarousel').carousel('cycle');
    });
    $('#pauseButton').click(function () {
        $('#myCarousel').carousel('pause');
    });
});


myApp.factory('Utils', function($q) {
    return {
        isImage: function(src) {
        
            var deferred = $q.defer();
        
            var image = new Image();
            image.onerror = function() {
                deferred.resolve(false);
            };
            image.onload = function() {
                deferred.resolve(true);
            };
            image.src = src;
        
            return deferred.promise;
        }
    };
});