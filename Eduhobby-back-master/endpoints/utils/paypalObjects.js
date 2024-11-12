export  const order =  (cost, baseUrl) => ( {
    intent: "CAPTURE",
    purchase_units: [
        {
            items: [
                {
                    name: cost.planName,
                    description: cost.description,
                    quantity: 1,
                    unit_amount: {
                        currency_code: cost.currency,
                        value: cost.price
                    }
                },
            ],

            amount: {
                currency_code: cost.currency,
                value: cost.price,
                breakdown: {
                    item_total: {
                        currency_code: cost.currency,
                        value: cost.price
                    }
                }
            },
        }
    ],
    application_context: {
        return_url: process.env.ENVIRONMENT === 'local' ?
            `${baseUrl}/sucessful-payment?debug=true` :
            `${baseUrl}/sucessful-payment`,
        cancel_url: process.env.ENVIRONMENT === 'local' ?
            `${baseUrl}/cancel-payment?debug=true` :
            `${baseUrl}/cancel-payment`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name:'GENIUS'
    }
} );
