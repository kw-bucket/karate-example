Feature: lms-adapter mock server

Scenario: pathMatches('/service-a/v1/accounts') && methodIs('get')
    * def x_correlation_id_arr = requestHeaders['x-correlation-id'][0].split('-')
    * def total_item = parseInt(x_correlation_id_arr[karate.sizeOf(x_correlation_id_arr) - 1])
    * def fn_params = {total_item: #(total_item), query_params: #(requestParams)}
    * def fn = call read('response/get-v1-accounts/js/get-v1-accounts.js') fn_params
    * def offset = fn.offset
    * def size = fn.size
    * def accounts = fn.accounts
    * def responseStatus = 200
    * def response = read('response/get-v1-accounts/response-body.json')
    * def responseDelay = 500

Scenario: pathMatches('/service-a/v1/accounts/{accountId}/interest') && methodIs('post')
    * def responseStatus = 200
    * def response = read('response/post-v1-accounts-int/response-body.json')
    * def responseDelay = 500

Scenario: pathMatches('/service-a/v1/credits/code') && methodIs('put')
    * def responseStatus = 200
    * def response = read('response/put-v1-credits-code/response-body.json')
    * def responseDelay = 500

Scenario: pathMatches('/service-a/v1/credits') && methodIs('post')
    * def credits = call read('response/post-v1-credits/js/post-v1-credits.js') bodyPath('$')
    * def responseStatus = 200
    * def response = read('response/post-v1-credits/response-body.json')
    * def responseDelay = 500
