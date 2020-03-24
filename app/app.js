var client;
$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
            client = _client;
            client.events.on("app.activated",
                function() {
                    client.data.get("currentEntityInfo").then (
                        function(data) {
                          // success output for lead
                          // data: { "currentEntityInfo": { "currentEntityId": 12, "currentEntityType": "lead"}}
                          console.log('Current entity (lead infor) ------', data);
                          var base_url = "https://<%= iparam.subdomain %>.freshsales.io"
                          var headers = { "Authorization": "Token token=<%= iparam.api_key %>", "Content-Type": "application/json"};
                          let url = `${base_url}/api/leads/${data.currentEntityInfo.currentEntityId}`;
                          console.log('-------------------- url --------------------', url, headers);
                          client.request.get(url, {
                            headers
                          }).then((response) =>  {
                              console.log('api lead information success response', response);
                          }).catch(err => {
                              console.log('api lead information error', err);
                          })
                        },
                        function(error) {
                          console.log('Current entity info error -----', error);
                        }
                        );
                });
        });
});

function openModal() {
    client.interface.trigger('showModal', {title: 'Add Integration Action', template: 'modal.html'});
}

function closePopup() {
    client.instance.close();
}
