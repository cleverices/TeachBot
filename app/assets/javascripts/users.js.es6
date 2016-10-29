$(document).on("turbolinks:load", () => {
    $("#edit_user_form").on("ajax:success", function (e, {data}) {
        $("#user_username").text(data.username);
        $("#header_user_link").text(data.username);
        $("#user_email").text(data.email);

    }).bind('ajax:aborted:file', function(event, elements) {

        var Form = new FormData();

        Form.append('user[username]', $("input[name='user[username]']").val().trim());

        Form.append('user[email]', $("input[name='user[email]']").val().trim());

        Form.append('user[avatar]', elements[0].files[0]);

        $.ajax({
            url: event.currentTarget.action,
            type: "PATCH",
            data: Form,
            contentType: false,
            processData: false,
            success: function ({data}) {
                if (data.avatar) {
                    $("#user_avatar").attr('src', data.avatar + '?' + Math.random());
                }
            }
        });

        return false
    });
});