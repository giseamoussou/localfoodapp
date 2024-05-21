import { Image } from "react-native"

export const COLORS ={
    white:'#ffffff',
    black:'#000000',
    ligthGray:'#838486',
    accent:'#FFC231',
    accentRed:'#FB5D2E',
    accentPink:'F96165'

}
export const Categories ={
    name:'Burger',
    image: require('./images/ice_cream.png'),
    items:[
        {
            name:'Classic Burguer',
            weight:150,
            rating:'4.5',
            price: 99,
            isTopOfTheWeek:false,
            image:require('./images/burger/burger2.jpg'),
            size : 'Large 12"',
            crust: 'Thick Crust',
            delivery:25,
            ingredients:{
                require
            }
    },
    {
        name:'Pizza',
        weight:150,
        rating:'4.2',
        price:99,
        isTopOfTheWeek:false,
        image:require('./images/pizza/pizza1.jpg'),
        size : 'Large Glass"',
        crust: 'Small ice',
        delivery: 5,
        ingredients:{
            require
        }
}
]
    
}