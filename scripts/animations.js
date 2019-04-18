
var timeout = 700;
var url = 'https://airjordanai.dev:8080/predict';
var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window; 
}();
console.log('is advanced upload: ' + isAdvancedUpload);
var $form = $('#form');
var $label = $('#upload-text');
var showFiles = function(files) {
    console.log($label);
    console.log(files.name);
    //$label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace('{count}', files.length) : files.name);
};
var uploadText = document.getElementById('upload-text');
var droppedFiles = false;
if (isAdvancedUpload) {
    uploadText.innerHTML = 'Drag an image, or click to upload.';
    console.log('is advancedupload');
    $form.addClass('has-advanced-upload');
    $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('drag');
    })
    .on('dragover dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $form.addClass('is-dragover');
        console.log('dragover');
    })
    .on('dragleave dragend drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $form.removeClass('is-dragover');
        console.log('dragleave');
    })
    .on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        droppedFiles = e.originalEvent.dataTransfer.files;
        console.log(e.originalEvent.dataTransfer);
        console.log(droppedFiles);
        showFiles.apply(null, droppedFiles);
        console.log('drop');

        $form.trigger('submit');
    });

} else {
    uploadText.innerHTML = 'Click to upload a shoe.';
        
}
var isMobile = false;
(function(a){if((jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
console.log(isMobile);
if (isMobile) {
    uploadText.innerHTML = 'Tap to take photo.';
}

$('#file').on('change', function(e) {
    droppedFiles = e.target.files;
    console.log('change');
    $form.trigger('submit');
});
$form.on('submit', function(e) {
    $("#file").attr('disabled', 'disabled');
    if ($form.hasClass('is-uploading')) {
        $("#file").attr('disabled', '');
        return false;
    }
    $('#file').css('z-index', '0');
    console.log('submit');
    $('#upload-text').addClass('hide');
    $form.addClass('is-uploading').removeClass('is-error');
    $label.addClass('hide');
    $('.box').addClass('hide-before');
    $('.box').addClass('hide-after');
    $('.loader').removeClass('hide');
    $('#box__uploading').removeClass('box__uploading');

    setTimeout(function() {
        $('#loader').addClass('active');
        
    }, 500);
    //TODO: animate hiding of box
    console.log('on submit');
    if(isAdvancedUpload) {
        e.preventDefault();
        e.stopPropagation();
        console.log('here');
        var formData = new FormData($form.get(0));
        if (droppedFiles) {
            formData.append('image',droppedFiles[0]);
            console.log('dropped files: ' + JSON.stringify(formData));
            console.log(droppedFiles[0]);
            $.ajax({
                'url': url,
                type: 'POST',
                data: formData,
                crossDomain: true,
                xhrFields: {
                    withCredentials: false
                },
                success: function(response, textStatus, jqXHR) {
                    console.log(textStatus);
                    console.log('data: ' +  JSON.stringify(response));
                    setTimeout(function() {
                        $('#loader').removeClass('active') 
                        setTimeout(function() {
                            showResult(response);

                        }, 500)
                    }, 1500);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);

                },
                processData: false,
                contentType: false
            });
        }
    } else {
        e.preventDefault();
        e.stopPropagation();

    }
});
function showResult(response) {
    $form.trigger('reset');
    $form.removeClass('is-error');
    $('#box__uploading').addClass('box__uploading');
    var success = response['success'];
    $('.loader').addClass('hide');
        
    if (success) {
        $('.box__success').css('display', 'block');
        $('#failure').addClass('hide');
        $('#success').removeClass('hide');
        $('.box__success-button').removeClass('hide');
        $('.box__success-top-text').removeClass('hide');
        setTimeout(function() {
            $('#success').addClass('active');
            $('.box__success-top-text').addClass('active');
            $('.box__success-button').addClass('active');
            
        }, 300);
    } else {
        $('.box__failure').css('display', 'block');
        $('#success').addClass('hide');
        $('#failure').removeClass('hide');
        $('.box__failure-button').removeClass('hide');
        $('.box__failure-top-text').removeClass('hide');
        setTimeout(function() {
            $('#failure').addClass('active');
            $('.box__failure-top-text').addClass('active');
            $('#box__failure-button').addClass('active');
            

        }, 300);
        
    }
}
$('.box__success-button, .box__failure-button').on('click', function() {
    console.log('CLICK');
    if ($(this).attr('id') == 'title-button') {
        setTimeout(function() {
            document.querySelector("meta[name=viewport]").setAttribute(
                'content', 
                'width=device-width');
            document.getElementById('title-container').classList.add('hide');
            upload.classList.remove('hide');
            upload.classList.add('animate-upload');
            $('#upload-text').removeClass('hide');
            $label.text = 'Drag an image in or click to upload';
            $label.removeClass('hide');
            $('.box').removeClass('hide-before');
            $('.box').removeClass('hide-after');
            $('#file').removeAttr('disabled');
            $('#file').css('z-index', '1000');
            $form.removeClass('is-uploading');

        }, 1000);
    } else {
        var selector = '.box__success';
        var success = '#success'; 
        
        console.log($(this));

        if($(this).hasClass('box__failure-button')) {

            selector = '.box__failure';
            success = '#failure';
        }
        var toptext = selector + '-top-text';
        $(this).removeClass('active');
        $(toptext).removeClass('active');
        $(success).removeClass('active');
        var that = this;
        setTimeout(function () {
            $(that).addClass('hide');
            console.log(that);
            $(selector + '-top-text').addClass('hide');
            $(success).addClass('hide');
            
            var intro = document.getElementById('intro');
            var upload = document.getElementById('upload');
            $(upload).addClass('hide');  
            $(intro).removeClass('hide');
            whole.classList.add('active');
            upload.classList.remove('animate-upload');
            setTimeout(function() {
                whole.classList.add('active2'); 
                setTimeout(function() {
                    whole.classList.remove('active2'); 
                    whole.classList.remove('active'); 
                    setTimeout(function() {
                        intro.classList.add('hide');
                        setTimeout(function() {
                            //$("#form").prop('disabled', false);​
                            upload.classList.remove('hide');
                            upload.classList.add('animate-upload');
                            $('#upload-text').removeClass('hide');
                            $label.text = 'Drag an image in or click to upload';
                            $label.removeClass('hide');
                            $('.box').removeClass('hide-before');
                            $('.box').removeClass('hide-after');
                            $('#file').removeAttr('disabled');
                            $('#file').css('z-index', '1000');
                            $form.removeClass('is-uploading');
                        });
                    }, 500);
                }, 700);
            }, 200);

        }, 2000);
    }

    //$(selector).css('display', 'none');
});
window.onload = function() {
    init();
    var whole = document.getElementById('whole'); 
    var left = document.getElementById('left-half');
    var right = document.getElementById('right-half');
    var a = document.getElementById('A');
    var j = document.getElementById('J');
    var a2 = document.getElementById('A2');
    var i = document.getElementById('I');
    var intro = document.getElementById('intro');
    var upload = document.getElementById('upload');
    var title = document.getElementById('title-container');
    document.getElementById('title-button').onclick = function() {
        title.classList.remove('active');
        
    }
    a.classList.add('active');
    setTimeout(function() {
        j.classList.add('active');
        setTimeout(function(){
            a.classList.remove('active');
            a2.classList.add('active');
            setTimeout(function() {
                i.classList.add('active');
                j.classList.remove('active');
                setTimeout(function() { 
                    left.classList.add('active');
                    right.classList.add('active');
                    whole.classList.add('active');
                    setTimeout(function() {
                        whole.classList.add('active2'); 
                        setTimeout(function() {
                            whole.classList.remove('active2'); 
                            whole.classList.remove('active'); 
                            setTimeout(function() {
                                i.classList.add('hide');
                                a2.classList.add('hide');
                                setTimeout(function() {
                                    intro.classList.add('hide');
                                    document.querySelector("meta[name=viewport]").setAttribute(
                                        'content', 
                                        'width=device-width, initial-scale=0.8');
                                    title.classList.remove('hide');
                                    setTimeout(function() {
                                        title.classList.add('active');
                                        
                                        //upload.classList.remove('hide');
                                        //upload.classList.add('animate-upload');
                                        
                                        $form = $('#form');
                                        $label = $('#upload-text');
                                    })
                                }, 500);
                            }, 100);
                        }, timeout);

                    }, 200);
                }, timeout);

            }, timeout);
        }, timeout);
    }, timeout);
    
    
}
function init() {

    var overlay = $('.md-overlay');
    var trigger = $('.md-trigger');
    //var att = trigger.attr('data-modal');
    var modal = $('#modal-1');
    var close = $('.md-close');
    trigger.on('click', function(event) {
        modal.addClass('md-show');
        
        overlay.off( 'click', removeModal);
        overlay.on( 'click', removeModal);

    });
    close.on('click', function(event) {
        event.stopPropagation();
        removeModal();
    });
    function removeModal( hasPerspective ) {
        modal.removeClass('md-show');
    }


}

