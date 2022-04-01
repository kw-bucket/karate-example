function f(params) {
    let product_codes = params['product_code']
    let customer_thai_id = params['customer_thai_id']

    let env = (java.lang.System.getenv('ENV_NAME') || '').toLowerCase()
    let home = env == 'dev' ? '/path/to/env/home' : '.'

    let credit_template = read(home + '/response/post-v1-credits/credit.json')

    let credits = []
    for (const product_code of product_codes) {
        let credit = {...credit_template}

        let credit_client = {...credit['client']}
        credit_client['encoded_key'] = customer_thai_id

        credit['product_code'] = product_code
        credit['client'] = credit_client

        credits.push(credit)
    }

    return credits
}
