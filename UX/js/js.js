/*-------------------------- PRELOADER ----------------------------*/
$(window).on('load', function () {
    if (screen.width > 780){
          var $preloader = $('#preloader'),
              $svg_anm   = $preloader.find('.preloader__img');
          $svg_anm.fadeOut();
          $preloader.delay(500).fadeOut('slow');
    }
    else {
      $('.preloader').hide();
    }
});

// Показываем\Прячем информацию про юзера   
$('#user_h i').click(function(){
    $('.user_data').slideToggle();
});



// Опции для Таймпикера
var options = { 
    now: "12:35",  
    twentyFour: false, 
    upArrow: 'wickedpicker__controls__control-up', 
    downArrow: 'wickedpicker__controls__control-down', 
    close: 'wickedpicker__close', 
    hoverState: 'hover-state',
    title: 'Pick Time Here',
    showSeconds: false,
    secondsInterval: 1, 
    minutesInterval: 5, 
    beforeShow: null, 
    show: null, 
    clearable: false
}; 

// Клик на иконки с днями недели
$('#mon, #tu, #wed, #th, #fri, #sat, #sun').click(function(){
    // html-код таймпикера
    let day_block = '<div class="mon_icon"></div><div class="time_wrp"><div class="time"><div class="close"></div><div class="work"><div class="work_time_btns w0"><button class="day"><input type="checkbox" checked><i class="fas fa-sun"></i>Day Shift</button><button class="night"><input type="checkbox">Night Shift</button></div><div class="time_from"><h3>From:</h3><input type="text" name="timepicker" class="timepicker"/></div><div class="time_to"><h3>To:</h3><input type="text" name="timepicker" class="timepicker"/></div></div></div></div><button class="add_work_btn">Add work</button>';
    
    if ($('.schedule_select .'+ this.id + ' .close').length == 0){
        $('.schedule_select .'+ this.id).append(day_block).show('slow');
    }

    if($('.schedule_select .'+ this.id + ' .work_time_btns .day input').is(':checked'))
        $('.schedule_select .'+ this.id).css('background', '#eee');
    
    // Запоминаем день недели
    let id = this.id;
    let i = 1;
    // Кнопка "Добавить смену"
    $('.add_work_btn').click(function(){
        $(this).parent().find('.time_wrp').append('<div class="time"><div class="close"></div><div class="work"><div class="work_time_btns w'+i+'"><button class="day"><input type="checkbox" checked><i class="fas fa-sun"></i>Day Shift</button><button class="night"><input type="checkbox">Night Shift</button></div><div class="time_from"><h3>From:</h3><input type="text" name="timepicker" class="timepicker"/></div><div class="time_to"><h3>To:</h3><input type="text" name="timepicker" class="timepicker"/></div></div>');
        
        // Кнопка "Удалить смену"
        $('.day .close').click(function(){
            $(this).parent().slideUp(400);
            $(this).parent().detach();
        });
        // Инициализируем таймпикер
        $('.timepicker').wickedpicker(options);

        // Кнопки Ночная\Дневная смена
        for (let i = 1; i < 7; i++) {
            $('.schedule_select .'+ id + ' .w' + i + ' button.day').click(function(){
                $('.schedule_select .'+ id + ' .w' + i + ' .night input').prop("checked", false);
                $('.schedule_select .'+ id + ' .w' + i + ' .night').css({background: '#ACB3B9', color: '#fff', border: '0.5px solid #495867'});
                $('.schedule_select .'+ id + ' .w' + i + ' button.day').css({background: '#fff', color: '#ACB3B9', border: '1px solid #333'});
                $('.schedule_select .'+ id + ' .w' + i + ' button.day i').css({color: '#F2C55C'});
            });
            $('.schedule_select .'+ id + ' .w' + i + ' button.night').click(function(){
                $('.schedule_select .'+ id + ' .w' + i + ' .day input').prop("checked", false);
                $('.schedule_select .'+ id + ' .w' + i + ' button.night').css({background: '#495867', color: '#fff', border: '1px solid #333'});
                $('.schedule_select .'+ id + ' .w' + i + ' button.day').css({background: '#DDE0E3', color: '#ACB3B9', border: '0.5px solid #DDE0E3'});
                $('.schedule_select .'+ id + ' .w' + i + ' button.day i').css({color: '#ACB3B9'});

            });
        }
        // Подсветка для полей таймпикера
        $('.time_from input').click(function(){
            $('.time_from input').css('border', '2px solid #FE5F55');
        });
        $('.time_to input').click(function(){
            $(this).css('border', '2px solid #FE5F55');
        });
        // Закрыть таймпикер
        $('.wickedpicker__close').click(function(){
            $('.time_from input, .time_to input').css('border', '2px solid #fff');
        });
        i++;
    });
    // Повторение событий для первой смены в дне
    $('.day .close').click(function(){
        $(this).parent().slideUp();
        $(this).parent().detach();
    });
    $('.schedule_select .'+ id + ' .w0 button.day').click(function(){
        $('.schedule_select .'+ id + ' .w0 .night input').prop("checked", false);
        $('.schedule_select .'+ id + ' .w0 .night').css({background: '#ACB3B9', color: '#fff', border: '0.5px solid #495867'});
        $('.schedule_select .'+ id + ' .w0 button.day').css({background: '#fff', color: '#ACB3B9', border: '1px solid #333'});
        $('.schedule_select .'+ id + ' .w0 button.day i').css({color: '#F2C55C'});
    });
    $('.schedule_select .'+ id + ' .w0 button.night').click(function(){
        $('.schedule_select .'+ id + ' .w0 .day input').prop("checked", false);
        $('.schedule_select .'+ id + ' .w0 button.night').css({background: '#495867', color: '#fff', border: '1px solid #333'});
        $('.schedule_select .'+ id + ' .w0 button.day').css({background: '#DDE0E3', color: '#ACB3B9', border: '0.5px solid #DDE0E3'});
        $('.schedule_select .'+ id + ' .w0 button.day i').css({color: '#ACB3B9'});
    });
    $('.timepicker').wickedpicker(options);
    $('.time_from input').click(function(){
        $('.time_from input').css('border', '2px solid #FE5F55');
    });
    $('.time_to input').click(function(){
        $(this).css('border', '2px solid #FE5F55');
    });
    $('.wickedpicker__close').click(function(){
        $('.time_from input, .time_to input').css('border', '2px solid #fff');
    });

    // Показываем кнопку "Сохранить"
    $('.save').show();
});


// Сохранение - собираем результаты
$('#save_btn').click(function() {
    // Сохраняем сюда:
    var schedule = [[], [], [], [], [], [], []];

    $('.schedule_select > .day').each(function(index){
        if ($(this).find('.time_from input').length){
            // Значения времени
            let time_from = $(this).find('.time_from input').toArray();
            let time_to = $(this).find('.time_to input').toArray();
            
            for (let i = 0; i < time_from.length; i++){
                // Если ночная смена разделяем на 2 дня (до 12 ночи первого дгя и с 12 ночи второго)
                if($(this).find('button.night input').is(':checked')) {
                    // Если время не повторяется добавляем его в массив
                    if (!schedule[index].includes(time_from[i].value +' -- '+ '12:00 PM<br>'))
                        schedule[index] += time_from[i].value +' -- '+ '12:00 PM<br>';
                    else
                        alert('You already have such time:: '+'12:00 AM' +' -- '+ time_to[i].value+'!');
                    if (index != 6){
                        if (!schedule[index].includes('12:00 AM' +' -- '+ time_to[i].value + '<br>'))
                            schedule[index+1] += '12:00 AM' +' -- '+ time_to[i].value + '<br>';
                        else
                            alert('You already have such time:: '+'12:00 AM' +' -- '+ time_to[i].value+'!');
                    }
                    else if (index==6){
                        if (!schedule[index].includes('12:00 AM' +' -- '+ time_to[i].value + '<br>'))
                            schedule[0] += '12:00 AM' +' -- '+ time_to[i].value + '<br>';
                        else
                            alert('You already have such time:: '+'12:00 AM' +' -- '+ time_to[i].value+'!');
                    }
                }
                // Если дневная смена
                if (!$(this).find('button.night input').is(':checked')) {
                    if (!schedule[index].includes(time_from[i].value +' -- '+ time_to[i].value + '<br>'))
                        schedule[index] += time_from[i].value +' -- '+ time_to[i].value + '<br>';
                    else
                        alert('You already have such time:: '+'12:00 AM' +' -- '+ time_to[i].value+'!');
                }
            }
        }
    });
    
    // Вывод окошка для подтверждения результатов
    $('.schedule_comfirm .day').each(function(index) {
        if (schedule[index].length > 0) {
            if (index == 0)
                $(this).html('<div class="schedule_day"><p class="day_name">Monday:</p>' + schedule[index] +'</div>');
            else if (index == 1)
                $(this).html('<div class="schedule_day"><p class="day_name">Tuesday:</p>' + schedule[index]+'</div>');
            else if (index == 2)
                $(this).html('<div class="schedule_day"><p class="day_name">Wednesday:</p>' + schedule[index]+'</div>');
            else if (index == 3)
                $(this).html('<div class="schedule_day"><p class="day_name">Thursday:</p>' + schedule[index]+'</div>');
            else if (index == 4)
                $(this).html('<div class="schedule_day"><p class="day_name">Friday:</p>' + schedule[index]+'</div>');
            else if (index == 5)
                $(this).html('<div class="schedule_day"><p class="day_name">Saturday:</p>' + schedule[index]+'</div>');
            else if (index == 6)
                $(this).html('<div class="schedule_day"><p class="day_name">Sunday:</p>' + schedule[index]+'</div>');
        }
    });
    $('.overlay, .schedule_comfirm').fadeIn(200);
    // Возвращаемя, если юзер хочет что-то изменить
    $('#change_schedule_btn').click(function() {
        $('.overlay, .schedule_comfirm').fadeOut(200);
    });
    $('.schedule_comfirm .close').click(function() {
        $('.schedule_comfirm, .overlay').fadeOut(400);
    });

    // Возвращаемся на главную страницу, если все подтверждено
    // Результаты можно вывести там же, в блоке "Расписание"
    $('#confirm_schedule_btn').click(function() {
        window.location.href = 'index.html';
    });
    
});

// Плавный скролл к полям таймпикера
$(document).ready(function(){
$(".days").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 600);
});
});