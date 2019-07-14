$(function(){


    
//Validations
var errorName = false;var errorQualification = false;  var errorEmail=false;
var bool = 1;

  $('#name').keyup(function(){

      valName();
  });
   $('#Qualification').keyup(function(){

      valQualification();
  });

 $('#email').keyup(function(){

      valEmail();
  });

  function valName()
  {
      var nameLength = $('#name').val().length;

     if(nameLength <3 || nameLength >20)
     {
       $('#vName').fadeIn('slow').html('Required 3 but less than 20 words').css("color","Red");
       $('#name').css("border-color","Red").fadeIn('slow');
       errorName = true;
       bool = 0;
     }
     else{
       errorName = false;
        $('#name').css("border-color","Green").fadeIn('slow');
        $('#vName').fadeOut();
     }
    
  }



  function valEmail()
  { 
     var ePattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  
    if($('#email').val() =="")
     {
       $('#vEmail').fadeIn('slow').html('Required').css("color","Red");
       $('#email').css("border-color","Red").fadeIn('slow');
       errorEmail = true;
       bool = 0;
     }
     else if(!ePattern.test($('#email').val()))
     {
       $('#vEmail').fadeIn('slow').html('Invalid Email Id').css("color","Red");
       $('#email').css("border-color","Red").fadeIn('slow');
       errorEmail = true;
       bool = 0;
     }
      else{
        errorEmail = false;
        $('#email').css("border-color","Green").fadeIn('slow');
         $('#vEmail').fadeOut();
     }   
  }

  function valQualification()
  {
      var QualificationLength = $('#Qualification').val().length;

     if(QualificationLength <= 2 || QualificationLength > 25 )
     {
       $('#vQualification').fadeIn('slow').html('Required more than 2 and less 20 words').css("color","Red");
       $('#Qualification').css("border-color","Red").fadeIn('slow');
       errorQualification =  true;
       bool = 0;
     }
      else{
       errorQualification = false;
       $('#Qualification').css("border-color","Green").fadeIn('slow');
       $('#vQualification').fadeOut();
     }
  }
  
  $('#btnsubmit').click(function(){

    valName();
    valQualification();
    valEmail();

    if(errorName == false && errorQualification == false && errorEmail ==false)
    {
      post();      
    }
    else
    { 
      return false;
    }

  });

  // Ajax Post
  
  function post(){
        var name = $('#userRegistration #name').val();
        var email = $('#userRegistration #email').val();
        var qualification = $('#userRegistration #Qualification').val();
        var user = {
            name:name,
            email:email,
            qualification: qualification
        }

        $.ajax({
            url:'http://localhost:5000/',
            data:user,
            dataType:'json', 
            type:'POST',
            cache:false,
            success: function(data){
                console.log(data);
                alert('Registered candidate '+ data.name)
            }     
        })
  }

});