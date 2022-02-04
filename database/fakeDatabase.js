

const fakeUser = [
    {
        id: 1,
        name: 'Luis',
        lastname: 'ocampo',
        email: 'luis@inmersys.com',
        password: '1234',
        profession: 'arquitecto',
        img: 'imagen',
        country: 'mexico',
        city: 'mexico',
        platform: 'vitromex',
        state: true,
        favorites: [],
        dateUserCreated: 'create'
    },
    {
        id: 2,
        name: 'Isai',
        lastname: 'ocampo',
        email: 's2@live.com',
        password: '11111111',
        profession: 'diseñador',
        img: 'imagen',
        country: 'mexico',
        city: 'mexico',
        platform: 'arko',
        state: true,
        favorites: [],
        dateUserCreated: 'create'
    },
    {
        id: 3,
        name: 'Angel',
        lastname: 'ocampo',
        email: 's2@live.com',
        password: '111111',
        profession: 'otro',
        img: 'imagen',
        country: 'mexico',
        city: 'mexico',
        platform: 'vitromex',
        state: true,
        favorites: [],
        dateUserCreated: 'create'
    },
    {
        id: 4,
        name: 'Enrique',
        lastname: 'ocampo',
        email: 'prueba1@inmersys.com',
        password: '1234',
        profession: 'diseñador',
        img: 'imagen',
        country: 'mexico',
        city: 'mexico',
        platform: 'arko',
        state: false,
        favorites: [],
        dateUserCreated: 'create'
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

const fakeProduct = []
const fakeShop = []
const fakeFavorite = []

module.exports = {
    fakeUser,
    fakeAdmin,
    fakeProduct,
    fakeShop,
    fakeFavorite
}