$(document).ready(function() {
    var createUpdateModal = $("#createUpdateModal");

    createUpdateModal.on('hide.bs.modal', function (e) {
        $(this).find('form')[0].reset();
    });

    function setFormState(val){
        createUpdateModal.find("select[name='state'] option").filter(function() {
            //may want to use $.trim in here
            return $(this).text() == val; 
        }).prop('selected', true);
    }

    var formFields = ["firstName",
        "lastName",
        "street",
        "city",
        "state",
        "zip",
        "phone",
        "email"];
    var formCheckboxes = ['how', 'title'];

    var updateContact = function(e){
        var id = $(this).attr("data-id"),
            row = $(this).closest(".contact-row");

        createUpdateModal.find("input[name='contact-id']").val(id);

        for(var i in formFields) {
            var name = formFields[i];
            var val = row.find("td[data-name='" + name + "']").text()
            
            createUpdateModal.find('input[name="' + name + '"]').val(val)
        }
        for(var i in formCheckboxes){
            var field = formCheckboxes[i],
                fvalue = row.find("td[data-name='" + field + "']").text();

            createUpdateModal.find('input[name="' + field + '"]').prop('checked', false);
            createUpdateModal.find('input[name="' + field + '"][value="' + fvalue + '"]').prop('checked', true);
        }        
        setFormState(row.find("td[data-name='state']").text());
        createUpdateModal.modal("show"); // just in case you know... now you can put the bootstrap.js on top
        
    };

    var deleteContact = function(e){
        var id = $(this).attr("data-id")
        $.post("/contacts/delete", {
            id: id
        }).done((function(data) {
            $(this).closest(".contact-row").fadeOut("fast",function(){
                $(this).remove();
            })
         }).bind(this));
    };

    createUpdateModal.find('form').submit(function(e) {
        e.preventDefault();

        var id = $(this).find('input[type="hidden"][name="contact-id"]').val();
    
        $.post(id == "" ? "/contacts/create" : "/contacts/update", $( this ).serialize() ).done((function(data) {
            var id = data.id;
            var row = $('#contacts-table').find("tr[data-id='" + id + "']");
            if(row.length == 0) {
                row = $('<tr data-id="' + id + '" class="contact-row">');
                 
                row.append('<td data-name="title"></td>');
                for(var i in formFields) 
                    row.append('<td data-name="' + formFields[i] + '"></td>');
                
                row.append('<td data-name="how"></td>');
                row.append('<td><button class="btn btn-outline-primary btn-sm update-contact" data-id="' + id + '">Update</button></td>')
                row.append('<td><button class="btn btn-outline-danger btn-sm delete-contact" data-id="' + id + '">Delete</button></td>')

                row.find(".update-contact").on('click', updateContact);
                row.find(".delete-contact").on('click', deleteContact);

                $('#contacts-table tbody').append(row);
            }
            for(var i in formFields) {
                var f = formFields[i];
                row.find('td[data-name="' + f + '"]').html(data[f]);
            }
            for(var i in formCheckboxes) {
                var f = formCheckboxes[i];
                row.find('td[data-name="' + f + '"]').html(data[f]);
            }

            createUpdateModal.modal("hide");
            clearModalForm();
         }).bind(this));

    });

    $(".update-contact").on('click', updateContact);

    $(".delete-contact").on('click', deleteContact);
    
});