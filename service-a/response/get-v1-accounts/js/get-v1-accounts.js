function f(params) {
    let total_item = params['total_item']
    let request_params = params['query_params']

    let offset = parseInt(request_params['offset'])
    let size = parseInt(request_params['size'])
    let statuses = request_params['statuses'][0].split(',')
    let product_code = request_params['product_code'][0]

    let mock_size = 0
    if (offset < total_item) {
        mock_size = offset + size <= total_item ? size : total_item - offset
    }

    let env = (java.lang.System.getenv('ENV_NAME') || '').toLowerCase()
    let home = env == 'dev' ? '/path/to/env/home' : '.'

    let account_template = read(home + '/response/get-v1-accounts/account.json')
    let product_rv_map = {
        'PRODUCT-A': 'Product-A-R',
        'PRODUCT-B': 'Product-B-R'
    }
    let product_tl_map = {
        'PRODUCT-A': 'PRODUCT-A-T',
        'PRODUCT-B': 'PRODUCT-B-T'
    }

    let accounts = []
    for(let i = 0; i < mock_size; i++) {
        let id = offset + i + 1
        let is_duplicated = Math.floor(Math.random() * (4-1) + 1) == 1 // random one-third
        let is_tl_product = Math.floor(Math.random() * (4-1) + 1) == 1 // random one-third

        let account = {...account_template}

        let account_platform = {...account['platform']}
        account_platform['account_id'] = 'account-id-' + id
        account_platform['account_number'] = 'account-number-' + id
        account_platform['product_code'] = product_code

        account['encoded_key'] = 'acc-' + id
        account['holder_key'] = is_duplicated ? 'cli-duplicated' : 'cli-' + id
        account['state'] = statuses[Math.floor(Math.random() * statuses.length)]
        account['product_name'] = is_tl_product ? product_tl_map[product_code] : product_rv_map[product_code]
        account['product_key'] = 'productkey-' + product_code
        account['platform'] = account_platform

        accounts.push(account)
    }

    return {
        offset: offset,
        size: size,
        accounts: accounts
    }
}
