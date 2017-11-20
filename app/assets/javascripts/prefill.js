$(function() {
  $("input[type=submit]").on('click', function(e) {
    e.preventDefault();
    baselineFormUrl = $("#baseline_url").val();
    followupFormUrl = $("#follow_up_url").val();
    // split id, inep and name from school
    id_inep_name = $("#school").val().split(' - ');

    // prefill id
    tfa_3707 = "&tfa_3707=" + $("#school_id").val();
    // prefill inep
    tfa_5 = "&tfa_5=" + id_inep_name[0];
    // prefill school name
    tfa_7 = "&tfa_7=" + id_inep_name[1];
    // prefill person name
    tfa_3719 = "&tfa_3719=" + $("#name").val();
    // prefill person email
    tfa_80 = "&tfa_80=" + $("#email").val();
    // prefill school phone
    tfa_84 = "&tfa_84=" + $("#phone").val();
    // prefill personal phone
    tfa_86 = "&tfa_86=" + $("#personal_phone").val();
    // prefill secretaria
    if(administration == 'Estadual'){
      tfa_3710 = "&tfa_3710=Rede Estadual" + ' de ' + stateName;
      tfa_5734 = "&tfa_5734=Rede Estadual" + ' de ' + stateName;
    }else if (administration == 'Municipal'){
      tfa_3710 = "&tfa_3710=Rede Municipal" + ' de ' + cityName;
      tfa_5734 = "&tfa_5734=Rede Municipal" + ' de ' + cityName;
    }else {
      tfa_3710 = "&tfa_3710=Rede Federal de Ensino do Brasil"
      tfa_5734 = "&tfa_5734=Rede Federal de Ensino do Brasil"
    }
    // prefill deadline
    tfa_3713 = "";
    if(deadline){
      tfa_3713 = "&tfa_3713=" + deadline;
    }

    if(!faParams){
      faParams = "tfa_63=1&tfa_64=1&tfa_65=1&tfa_66=1&tfa_2567=1&tfa_2568=1&";
    }

    if ($(".home.index").length > 0) {
      createSubmission('baseline');
      openForm(baselineFormUrl);
    }else {
      createSubmission('follow_up');
      openForm(followupFormUrl);
    }
  });
});

function createSubmission(form) {
  $.ajax({
    url: '/submissions',
    data: {
      submission:{
        form_name: form,
        school_id: $("#school_id").val(),
        status: 'redirected',
        school_phone: $("#phone").val(),
        submitter_name: $("#name").val(),
        submitter_email: $("#email").val(),
        submitter_phone: $("#personal_phone").val(),
        redirected_at: new Date()
      }
    },
    method: 'POST'
  });
}

function openForm(form_url) {
  window.open(form_url + faParams + tfa_3707 + tfa_7 + tfa_5 + tfa_3719 +
              tfa_80 + tfa_84 + tfa_86 + tfa_3707 + tfa_3710 + tfa_3713 +
              tfa_5734);
}