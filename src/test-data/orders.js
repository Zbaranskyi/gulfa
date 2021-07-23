export const tableOrders = [
    {
        id: '#123451',
        name: 'Andrey Smith',
        date: '05/03/2021',
        total: '$23.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
        details: 'View Details'
    },
    {
        id: '#123452',
        name: 'Alex Smith',
        date: '05/03/2021',
        total: '$23.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
        details: 'View Details'
    },
    {
        id: '#123453',
        name: 'Nick Smith',
        date: '05/03/2021',
        total: '$23.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
        details: 'View Details'
    },
    {
        id: '#123454',
        name: 'Oleg Smith',
        date: '05/03/2021',
        total: '$23.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
        details: 'View Details'
    },
    {
        id: '#123455',
        name: 'George Smith',
        date: '05/03/2021',
        total: '$23.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
        details: 'View Details'
    }
]
export const detailOrders = [
    {
        id: '#123451',//
        name: 'Andrey Smith',
        date: '05/03/2021 13:51 PM',
        delivery: '05/03/2021 12:00 - 15:00',
        address: 'Address details',//
        driver: 'Robert Flores',
        deliveryDate: '05/03/2021 12:00 - 15:00',//
        orders: [
            {
                name: 'Buxton Pure Lite',//
                volume: '3 LT',//
                price: '$ 12,99',//
                quantity: 'x2',//
                priceAll: '$ 25,98',
                substription: {
                    date: 'Thursday',
                    time: '12:00 - 15:00'
                }
            },
            {
                name: 'Buxton Pure Lite',
                volume: '5 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: null
            }
        ],
        total: '$99.99',
        payStatus: 'Paid',//
        payMethod: 'Credit Card',
    },
    {
        id: '#123452',
        name: 'Alex Smith',
        date: '05/03/2021 13:51 PM',
        delivery: '05/03/2021 12:00 - 15:00',
        address: 'Address details',
        driver: 'Robert Flores',
        deliveryDate: '05/03/2021 12:00 - 15:00',
        orders: [
            {
                name: 'Buxton Pure Lite',
                volume: '3 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: {
                    date: 'Thursday',
                    time: '12:00 - 15:00'
                }
            },
            {
                name: 'Buxton Pure Lite',
                volume: '5 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: null
            }
        ],
        total: '$99.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
    },
    {
        id: '#123453',
        name: 'Nick Smith',
        date: '05/03/2021 13:51 PM',
        delivery: '05/03/2021 12:00 - 15:00',
        address: 'Address details',
        driver: 'Robert Flores',
        deliveryDate: '05/03/2021 12:00 - 15:00',
        orders: [
            {
                name: 'Buxton Pure Lite',
                volume: '3 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: {
                    date: 'Thursday',
                    time: '12:00 - 15:00'
                }
            },
            {
                name: 'Buxton Pure Lite',
                volume: '5 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: null
            }
        ],
        total: '$99.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
    },
    {
        id: '#123454',
        name: 'Oleg Smith',
        date: '05/03/2021 13:51 PM',
        delivery: '05/03/2021 12:00 - 15:00',
        address: 'Address details',
        driver: 'Robert Flores',
        deliveryDate: '05/03/2021 12:00 - 15:00',
        orders: [
            {
                name: 'Buxton Pure Lite',
                volume: '3 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: {
                    date: 'Thursday',
                    time: '12:00 - 15:00'
                }
            },
            {
                name: 'Buxton Pure Lite',
                volume: '5 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: null
            }
        ],
        total: '$99.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
    },
    {
        id: '#123455',
        name: 'George Smith',
        date: '05/03/2021 13:51 PM',
        delivery: '05/03/2021 12:00 - 15:00',
        address: 'Address details',
        driver: 'Robert Flores',
        deliveryDate: '05/03/2021 12:00 - 15:00',
        orders: [
            {
                name: 'Buxton Pure Lite',
                volume: '3 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: {
                    date: 'Thursday',
                    time: '12:00 - 15:00'
                }
            },
            {
                name: 'Buxton Pure Lite',
                volume: '5 LT',
                price: '$ 12,99',
                quantity: 'x2',
                priceAll: '$ 25,98',
                substription: null
            }
        ],
        total: '$99.99',
        payStatus: 'Paid',
        payMethod: 'Credit Card',
    },
]
export const modelOrder = [
    {
        "id": "12",
        "status": "Created",
        "deliveryDate": "2021-05-05",
        "createDate": "2021-05-05",
        "ordersShopItems": [
            {
                "title": "bottle 1",
                "volume": 1,
                "count": 2,
                "price": 10
            },
            {
                "title": "bottle 2",
                "volume": 1,
                "count": 4,
                "price": 6
            }
        ],
        "customerName": "Alex Test",
        "cityName": "Kharkiv",
        "districtName": "Saltovka",
        "street": "Heroiv Pratsi",
        "building": "12",
        "apartment": "24"
    }
]
