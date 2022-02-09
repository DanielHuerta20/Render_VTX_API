

const fakeUser = [
    {
        id: 1,
        name: 'Luis',
        lastname: 'ocampo',
        email: 'luis@inmersys.com',
        password: '1234',
        profession: 'arquitecto',
        country: 'mexico',
        city: 'mexico',
        state: true,
        dateUserCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 2,
        name: 'Isai',
        lastname: 'ocampo',
        email: 's2@live.com',
        password: '111111',
        profession: 'diseñador',
        country: 'mexico',
        city: 'mexico',
        state: true,
        dateUserCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 3,
        name: 'Angel',
        lastname: 'ocampo',
        email: 'luis@live.com',
        password: '111111',
        profession: 'otro',
        country: 'mexico',
        city: 'mexico',
        state: true,
        dateUserCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 4,
        name: 'Enrique',
        lastname: 'ocampo',
        email: 'prueba1@inmersys.com',
        password: '1234',
        profession: 'diseñador',
        country: 'mexico',
        city: 'mexico',
        state: false,
        dateUserCreated: new Date().toISOString().slice(0,10)
    }
]

const fakeAdmin = [
    {
        id: 1,
        name: 'Luis',
        email: 'luis@inmersys.com',
        password: '1234',
        status: true,
        dateUserCreated: 'create'
    },
    {
        id: 2,
        name: 'Isai',
        email: 'test@admin.com',
        password: '12345556',
        status: true,
        dateUserCreated: 'create'
    },
    {
        id: 3,
        name: 'Angel',
        email: 's2@live.com',
        password: '1234',
        status: true,
        dateUserCreated: 'create'
    },
    {
        id: 4,
        name: 'Enrique',
        email: 'prueba1@inmersys.com',
        password: '1234',
        status: true,
        dateUserCreated: 'create'
    }
]

const fakeProduct = [
    {
        id: 1,
        name: 'producto1',
        description: 'data',
        albedo: 'albedo',
        normal: 'normal',
        roughness: 'roughness',
        sized: '500',
        sizedDefault: '30',
        smallPicture: 'smallPicture',
        available: true,
        isNewProduct: 'isNewProduct',
        family: 'family',
        branding: 'ARKO',
        textureHeight: 'textureHeight',
        textureWidth: 'textureWidth',
        typologies: 'typologies',
        color: 'color',
        finish: 'finish',
        aplications: 'aplications',
        idFromOracle: 'idFromOracle',
        dateCreated: 'dateCreated',
        renders: ['img1', 'img2', 'img3'],
        pzasXpallet: 'pzasXpallet',
        serie: 'serie',
    },
    {
        id: 2,
        name: 'producto2',
        description: 'data',
        albedo: '',
        normal: '',
        roughness: 'roughness',
        sized: '500',
        sizedDefault: '30',
        smallPicture: '',
        available: true,
        isNewProduct: 'isNewProduct',
        family: 'family',
        branding: 'VITROMEX',
        textureHeight: 'textureHeight',
        textureWidth: 'textureWidth',
        typologies: 'typologies',
        color: 'color',
        finish: 'finish',
        aplications: 'aplications',
        idFromOracle: 'idFromOracle',
        dateCreated: 'dateCreated',
        renders: ['img1', 'img2', 'img3'],
        pzasXpallet: 'pzasXpallet',
        serie: 'serie',
    },
    {
        id: 3,
        name: 'producto1',
        description: 'data',
        albedo: 'albedo',
        normal: 'normal',
        roughness: 'roughness',
        sized: '500',
        sizedDefault: '30',
        smallPicture: 'smallPicture',
        available: true,
        isNewProduct: 'isNewProduct',
        family: 'family',
        branding: 'ARKO',
        textureHeight: 'textureHeight',
        textureWidth: 'textureWidth',
        typologies: 'typologies',
        color: 'color',
        finish: 'finish',
        aplications: 'aplications',
        idFromOracle: 'idFromOracle',
        dateCreated: 'dateCreated',
        renders: ['img1', 'img2', 'img3'],
        pzasXpallet: 'pzasXpallet',
        serie: 'serie',
    },
    {
        id: 4,
        name: 'producto1',
        description: 'data',
        albedo: 'albedo',
        normal: 'normal',
        roughness: 'roughness',
        sized: '500',
        sizedDefault: '30',
        smallPicture: 'smallPicture',
        available: false,
        isNewProduct: 'isNewProduct',
        family: 'family',
        branding: 'VITROMEX',
        textureHeight: 'textureHeight',
        textureWidth: 'textureWidth',
        typologies: 'typologies',
        color: 'color',
        finish: 'finish',
        aplications: 'aplications',
        idFromOracle: 'idFromOracle',
        dateCreated: 'dateCreated',
        renders: ['img1', 'img2', 'img3'],
        pzasXpallet: 'pzasXpallet',
        serie: 'serie',
    },

]

const fakeSeries = [
    {
        id: 1,
        name: 'Vinil',
        available: true,
        img: 'img',
        render: ['img1', 'img2'],
        dateCreated: new Date().toISOString().slice(0,10),
        typologie: 'name',
        platform: 'vitromex'
    },
    {
        id: 2,
        name: 'Vinil',
        available: true,
        img: 'img',
        render: ['img1', 'img2'],
        dateCreated: new Date().toISOString().slice(0,10),
        typologie: 'name',
        platform: 'arko'
    },
    {
        id: 3,
        name: 'Vinil',
        available: true,
        img: 'img',
        render: ['img1', 'img2'],
        dateCreated: new Date().toISOString().slice(0,10),
        typologie: 'name',
        platform: 'vitromex'
    },
    {
        id: 4,
        name: 'Vinil',
        available: true,
        img: 'img',
        render: ['img1', 'img2'],
        dateCreated: new Date().toISOString().slice(0,10),
        typologie: 'name',
        platform: 'arko'
    }

]

const fakeFormats = [
    {
        id: 1,
        format: '30',
        rounded: "30.5x30.5",
    },
    {
        id: 2,
        format: '30',
        rounded: "30.5x30.5",
    },
    {
        id: 3,
        format: '30',
        rounded: "30.5x30.5",
    },
    {
        id: 4,
        format: '30',
        rounded: "30.5x30.5",
    },
]

const fakeShop = [
    {
        id: 1,
        name: '',
        country: '',
        state: true,
        city: '',
        suburb: '',
        street: '',
        num: '',
        phone: '',
        status: true,
        lat: '',
        lng: '',
        dateCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 2,
        name: '',
        country: '',
        state: true,
        city: '',
        suburb: '',
        street: '',
        num: '',
        phone: '',
        status: true,
        lat: '',
        lng: '',
        dateCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 3,
        name: '',
        country: '',
        state: true,
        city: '',
        suburb: '',
        street: '',
        num: '',
        phone: '',
        status: true,
        lat: '',
        lng: '',
        dateCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 4,
        name: '',
        country: '',
        state: true,
        city: '',
        suburb: '',
        street: '',
        num: '',
        phone: '',
        status: true,
        lat: '',
        lng: '',
        dateCreated: new Date().toISOString().slice(0,10)
    },
    {
        id: 5,
        name: '',
        country: '',
        state: false,
        city: '',
        suburb: '',
        street: '',
        num: '',
        phone: '',
        status: false,
        lat: '',
        lng: '',
        dateCreated: new Date().toISOString().slice(0,10)
    },
]

const fakeCounter = [
    {
        id:1,
        total:6,
        dates: [{
            date: new Date().toISOString().slice(0,10),
            total: 5
        }],
        platform:'vitromex',
    },
    {
        id:2,
        total:5,
        dates: [{
            date: new Date().toISOString().slice(0,10),
            total: 5
        }],
        platform:'vitromex',
    },
    {
        id:3,
        total:2,
        dates: [{
            date: new Date().toISOString().slice(0,10),
            total: 5
        }],
        platform:'arko',
    },
    {
        id:4,
        total:3,
        dates: [{
            date: new Date().toISOString().slice(0,10),
            total: 5
        }],
        platform:'arko',
    },
    {
        id:5,
        total:4,
        dates: [{
            date: new Date().toISOString().slice(0,10),
            total: 5
        }],
        platform:'arko',
    },
]

module.exports = {
    fakeUser,
    fakeAdmin,
    fakeProduct,
    fakeSeries,
    fakeFormats,
    fakeShop,
    fakeCounter
}