Feature: collection-service mock server

Scenario: pathMatches('/service-b/v1/calculate') && methodIs('post')
    * def client_encoded_key = bodyPath('$.client_encoded_key')
    * def calculated_block_code = call read('response/post-v1-calculate/js/post-v1-calculate.js')
    * def responseStatus = 200
    * def response = read('response/post-v1-calculate/response-body.json')
    * def responseDelay = 1500
