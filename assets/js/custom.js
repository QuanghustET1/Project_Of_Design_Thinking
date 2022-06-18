// Slider product detail
$(document).ready(function() {
  $('#p-detail-img').lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    vertical: true,
    verticalHeight: 400,
    thumbItem: 5,
    auto: true,
    speed: 1000,
    pause: 4000,
    //     responsive : [
    //     {
    //         breakpoint:991,
    //         settings: {
    //             item:1,
    //           }
    //     }
    // ]
  });
});

$(document).ready(function() {
  //GoTop
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#backToTop').fadeIn('slow');
    } else {
      $('#backToTop').fadeOut('slow');
    }
  });
  $('#backToTop').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// Menu mobile
$(document).ready(function() {
  $('#icon-menu-mobile').on('click', function() {
    $(".menu").toggleClass("show-menu");
  });

  $("#close-menu").on('click', function() {
    $(".menu-mobile").removeClass("show-menu");
  });
});

// Đếm số kí tự trong form bình luận
$(document).ready(function() {
  $(function() {
    $(".p-comment-form textarea").keyup(function() {
      var value = $(this).val();
      ($("#counter").text(value.length + "/100 (Ký tự)"));
    }).keyup();
  });
});

// submit comment
$(document).ready(function() {
  $(".er-comment").hide();
  $(".er-comment-new").hide();
  $(".er-name").hide();
  $(".er-email").hide();

  $("#comment-submit").click(function(e) {
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      } else {
        return true;
      }
    }

    function isComment(comment) {
      var comment_content = document.getElementsByClassName("comment-content");
      for (i = 0; i < comment_content.length; i++) {
        var old_comment = comment_content[i].textContent;
        if (old_comment.indexOf(comment.val()) >= 0 && old_comment.trim().length == comment.val().trim().length || val_comment.val() == false || val_comment.val().length < 100) {
          return false;
        } else {
          return true;
        }
      }
    }

    var val_comment = $(".p-comment-form textarea");
    var val_name = $(".p-comment-form input[type='text']");
    var val_email = $(".p-comment-form input[type='email']");
    var html = `<div class='comment-item'>
                  <div class='comment-info'>
                    <a href='#' class='comment-avatar'>
                      <img src='assets/images/avatar.png' alt=''>
                    </a>
                    <div class='comment-name'>
                      <a href='#'>${val_name.val()}</a>
                      <span>${(new Date).getDate() + '/' + ((new Date).getMonth() + 1) + '/' + (new Date).getFullYear()}</span>
                    </div>
                  </div>
                  <div class='comment-content'>
                   ${val_comment.val()}
                  </div>
                </div>'`;

    if (isComment(val_comment) == false || val_comment.val().length < 100) {
      $(".er-comment").show();
    }
    if (val_name.val() == false) {
      $(".er-name").show();
    }
    if (isEmail(val_email.val()) == false) {
      $(".er-email").show();
    }

    val_comment.keyup(function() {
      if ($(this).val().length >= 100) {
        $(".er-comment").hide();
      }
    });
    val_name.keyup(function() {
      if ($(this).val().length > 0) {
        $(".er-name").hide();
      }
    });
    val_email.keyup(function() {
      if (isEmail(val_email.val()) == true) {
        $(".er-email").hide();
      }
    });

    if (val_comment.val() !== false &&
      val_comment.val().length >= 100 &&
      val_name.val() !== false &&
      isEmail(val_email.val()) == true &&
      isComment(val_comment) !== false) {
      $(html).insertAfter('.p-comment h3');
    }

    e.preventDefault();
  });
});

$(document).ready(function() {
  // Thời gian hiển thị popup trang chủ
  setTimeout(function() {
    $("#popup").show();
  }, 60000);

  // Đóng popup trang chủ
  $(".close-popup").click(function() {
    $("#popup").hide();
  })

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  $(".cart-btn").click(function(e) {
    var new_number = Number($(".counter-cart").text()) + 1;
    $(".counter-cart").text(new_number);
    e.preventDefault();
  });
});

// filter product
$(document).ready(function() {
  $("#select-price").change(function() {
    $(".list-product").css("display", "none");
    $(".list-product-filter").empty();
    var filter_product = $(".list-product .columns");
    for (i = 0; i < filter_product.length; i++) {
      var price = filter_product.eq(i).find(".after-price span").text().split(".").join("");
      if (Number($("#select-price").val()) === 100000 && Number(price) > 0 && Number(price) <= 100000) {
        $(filter_product[i]).clone().appendTo(".list-product-filter");
      } else if (Number($("#select-price").val()) === 200000 && Number(price) > 100000 && Number(price) <= 200000) {
        $(filter_product[i]).clone().appendTo(".list-product-filter");
      } else if (Number($("#select-price").val()) === 500000 && Number(price) > 200000 && Number(price) <= 500000) {
        $(filter_product[i]).clone().appendTo(".list-product-filter");
      } else if (Number($("#select-price").val()) === 1000000 && Number(price) > 500000) {
        $(filter_product[i]).clone().appendTo(".list-product-filter");
      } else if (Number($("#select-price").val()) === 0 && Number(price) > 0) {
        $(filter_product[i]).clone().appendTo(".list-product-filter");
      }
    }
  });

  $("#search-name").keyup(function() {
    $(".list-product").css("display", "none");
    $(".list-product-filter").empty();

    var search_product = $(".list-product .columns");
    for (i = 0; i < search_product.length; i++) {
      var name = search_product.eq(i).find("h3 a").text().toLowerCase();
      if (name.indexOf($("#search-name").val().toLowerCase()) >= 0) {
        $(search_product[i]).clone().appendTo(".list-product-filter");
      };
    }
  });
});

// admin
$(document).ready(function() {
  var product = $(".p-list tbody tr");
  $(".p-number span").text(product.length);
  var btn_delete = $(".p-list tbody .p-delete");
  for (var i = 0; i < product.length; i++) {
    $(btn_delete).eq(i).click(function() {
      $(this).parent().parent().remove();
      $(".p-number span").text((product.length--) - 1);
    });
  }
});