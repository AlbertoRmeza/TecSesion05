/*
    Para crear un objeto se establece una clase y esta a su vez se compone o se crea un CONSTRUCTOR
    con el cual podremos asignarle propiedades al objeto
    Sintaxis basica pafra la creacion de un objeto

    class persona{
        constructor(nombre,edad,genero){
            this.propiedad1 = nombre;
            this.propiedad2 = edad;
            this.propiedad3 = genero;
        }
    }
*/

// Paso 1 - Crear clase libro
class Libro {
    // Se va acrear un constructor que va a recibir parametros asociadoa a las propiedades del objeto
    constructor(precio, titulo, autor){
        // Dentro del constructor se crea objeto, almacena valores de los objetos que se vayan creando
        let propiedades = {titulo, autor, precio}
        let _private = new WeakMap();
        _private.set(this, {propiedades});

        //  Se crearan los metodos para obtener y establecer los valores del objeto
        Object.defineProperties(this,{
            titulo:{
                get(){
                    return _private.get(this).propiedades['titulo'];
                },
                set(nuevoTitulo){
                    _private.get(this).propiedades['titulo'] = nuevoTitulo;
                }
            },
            author:{
                get(){
                    return _private.get(this).propiedades['autor'];
                },
                set(nuevoAutor){
                    _private.get(this).propiedades['autor'] = nuevoAutor;
                }
            },            
            precio:{
                get(){
                    return _private.get(this).propiedades['precio'];
                }
            }
        });
    }

    obtenerTodosLosDatos(){
        console.log(`Titulo: ${this.titulo}, Autor: ${this.author}, Precio: ${this.precio}  `);
    }
};


// Ejemplo de funcionamiento
const libro1 = new Libro(250, 'El niño con pijama de rayas', 'John Boyle');
libro1.obtenerTodosLosDatos();
libro1.titulo = 'El Principito';
libro1.author = 'Antoine de Saint-Eusxepery';
libro1.precio = 450;
libro1.obtenerTodosLosDatos();

// 
// Creacion de la clase Comic que hereda de libro sus propiedades 

class Comic extends Libro{
    // Se crea constructor para llamar a las propiedades del padre
    // Y para una nueva propiedad propia del Comic que son ilustradores
    constructor (precio, titulo, autor,ilustradores ){
        super(precio,titulo,autor)
        this.ilustradores = ilustradores;
    }

    // Se crea clase
    agregarIlustrador(nuevosIlustradores){
        this.ilustradores.push(nuevosIlustradores);
    }

    obtenerTodosLosDatos(){
        super.obtenerTodosLosDatos();
        console.log(`Ilustradores: ${this.ilustradores}`);
    }

}

// Ejemplo de uso
const comic = new Comic(150, 'Spider-man','Stan Lee', ['Steve Ditko']);
comic.agregarIlustrador('John Romita');
comic.obtenerTodosLosDatos();

// Construir la clase carrito compras

class CarritoCompras{
    constructor(){
        this.productos = [];
    }
    // Metodo para agregar productos al carrito
    agregarProducto(cantidad,precio){
        this.productos.push(...Array(cantidad).fill(precio));
    }
    // Metodo para mostrar los productos del carrito
    mostrarProductos(){
        console.log(this.productos);
    }
    // Metodo para calcular el costo total del carrito
    calcTotal(){
        return this.productos.reduce((acumulador, precio)  => acumulador + precio, 0);
    }
    // Metoso para imprimir ticket
    imprimirTicket(){
        console.log(`Total a pagar: ${this,this.calcTotal()}`);
    }
}

// Pruebas
let libro2 = new Libro(100, 'El Principito', 'Saint-Euxepry');
let libro3 = new Libro(200, 'El Clan del Oso Cavernario', 'Auel Jean');
let comic1 = new Comic(50, 'Coraline', 'Neil Gaiman', ['Alondra Diaz', 'Sofia Perez']);
let comic2 = new Comic(100, 'New X-Men', 'Grant Morrison', ['Frank Quietly', 'Juan Perez', 'Joseph Miranda']);

// Se crea carrito de compras
let carrito1 = new CarritoCompras();

// Se agregan productoa al carrito
carrito1.agregarProducto(2,libro2.precio);
carrito1.agregarProducto(3,comic1.precio);
carrito1.agregarProducto(3,libro3.precio);
carrito1.agregarProducto(2,comic2.precio);

// Mostrar los productos
//  Y el ticket de compra
carrito1.mostrarProductos();
carrito1.imprimirTicket();

// Obtenemos los datos
libro2.obtenerTodosLosDatos();
comic.obtenerTodosLosDatos();

