var timeout = 700;
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
        showFiles(...droppedFiles);
        console.log('drop');

        $form.trigger('submit');
    });

} else {
    uploadText.innerHTML = 'Click to upload a shoe.';
        
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
        var url = "http://localhost:5000/predict";
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
                                setTimeout(function() {
                                    upload.classList.remove('hide');
                                    upload.classList.add('animate-upload');
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

