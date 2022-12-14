<template>
    <div id="template" class="shop">
        <div class="shoplogotemplate">
            <img class="shoplogo" src="../../assets/shop/shoplogo.png"/>
            <button class="cancelbtn" @click="cancel"></button>
        </div>
        <div id="produkte">
            <img class="produktlogo" src="../../assets/shop/produktelogo.png"/>
            <div id="inputprodukte">
                <div class="produkt" v-for="(product, index) in products.items" :key="product.id">
                    <h1>{{product.name.substring(0,15)}}</h1>
                    <img class="productimage" v-bind:src="imagePathFinder(product.img)" />
                    <h1 v-if="99999 > 0">{{product.price}}$</h1>
                    <h1 v-else class="saleout">Ausverkauft</h1>
                    <button class="button buyproduct" v-if="99999 > 0" @click="addProduct(index)"></button>
                    <button class="button buyproduct" v-else disabled @click="addProduct(index)"></button>
                </div>
            </div>
        </div>
        <div id="warenkorb">
            <img class="cartlogo" src="../../assets/shop/warenkorblogo.png"/>
            <div id="inputwarenkorb">
                <div class="cart">
                    <table class="carttable">
                        <tr v-for="(item, index) in cart" :key="item.id">
                            <td align="right"><input class="itemcounter" @change="changeProduct(index,item.counter)" v-model="item.counter" type="number"/></td>
                            <td><h3 class="itemname"> {{products.items[item.id].name}}</h3></td>
                            <td><button class="button deletebutton" style="padding: 0;" @click="removeProduct(index)"><img class="deletebuttonlogo" src="../../assets/shop/substractbutton.png"></button><button class="button deletebutton" style="padding: 0; margin-left: 0.5vh;" @click="deleteProduct(index)"><img class="deletebuttonlogo" src="../../assets/shop/deletebutton.png"></button></td>
                        </tr>
                    </table>
                </div>
                <div class="buybuttoncenter">
                    <h4>Gesamtpreis: {{price}}$</h4>
                    <button class="button buybutton" :disabled="!price" @click="buyproducts"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: "Shop",

    extends: BaseWindow,

    props: {
        data: String
    },

    data() {
        return {
            products: JSON.parse(this.data),
            cart:[],
            find: -1,
            price: 0
        }
    },
    methods: {
        cancel(){
            this.dismiss()
        },
        addProduct(productindex){
            if(this.price < 2000000){
                this.find = this.cart.indexOf(this.cart.find(item => item.id === productindex))
                if(this.find < 0){
                    this.cart.push({id: productindex, itemid:this.products.items[productindex].id, counter:1, counterold:1})
                }else{
                    this.cart[this.find].counter += 1
                    this.cart[this.find].counterold += 1
                }
                this.products.items[productindex].count -= 1
                this.price += this.products.items[productindex].price
            }
        },
        deleteProduct(index){
            this.price -= this.cart[index].counter * this.products.items[this.cart[index].id].price
            this.products.items[this.cart[index].id].count += this.cart[index].counter
            this.cart.splice(index, 1)
        },
        removeProduct(index){
            this.price -= this.products.items[this.cart[index].id].price
            this.products.items[this.cart[index].id].count += 1
            this.cart[index].counter -= 1
            this.cart[index].counterold -= 1
            if(this.cart[index].counter == 0){
                this.cart.splice(index, 1)
            }
        },
        changeProduct(index,counter){
            if(counter < 0){
                counter = 0
                this.cart[index].counter = counter
            }
            if(counter > this.cart[index].counterold){
                this.products.items[this.cart[index].id].count -= (counter - this.cart[index].counterold)
                this.price += (counter - this.cart[index].counterold) * this.products.items[this.cart[index].id].price
            }else{
                this.products.items[this.cart[index].id].count += (this.cart[index].counterold - counter)
                this.price -= (this.cart[index].counterold - counter) * this.products.items[this.cart[index].id].price
            }
            if(this.price > 2000000){
                counter = this.cart[index].counterold
                if(counter > this.cart[index].counter){
                    this.products.items[this.cart[index].id].count -= (counter - this.cart[index].counter)
                    this.price += (counter - this.cart[index].counter) * this.products.items[this.cart[index].id].price
                }else{
                    this.products.items[this.cart[index].id].count += (this.cart[index].counter - counter)
                    this.price -= (this.cart[index].counter - counter) * this.products.items[this.cart[index].id].price
                }
                this.triggerServer("shopBuy", JSON.stringify({
                    shopId: this.shop.id,
                    basket: basketBuy
                }))
                this.cart[index].counter = counter
            }
            this.cart[index].counterold = counter
            if(this.cart[index].counter <= 0){
                this.cart.splice(index, 1)
            }
        },
        buyproducts(){
            var basketBuy = []
            for (let basketItem of this.cart) {
                basketBuy.push({
                    itemId: basketItem.itemid,
                    count: basketItem.counter,
                    price: basketItem.counter * this.products.items[basketItem.id].price
                })
            }
            this.trigger("shopBuy", JSON.stringify({
                    shopId: this.products.id,
                    basket: basketBuy
                })
            )
            this.triggerServer("shopBuy", JSON.stringify({
                    shopId: this.products.id,
                    basket: basketBuy
                })
            )
            this.dismiss()
        },
        imagePathFinder(url) {
            return 'img/itemImages/' + url
        }
    }

}
</script>

<style lang="scss" scoped>

.shop {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 84vh;
        height: 56.25vh;
        background-color: rgba(0,0,0,0.7);
        border-radius: 0.46875vh;
    
    #cancel {
        margin-top: -13.5vh;
        margin-left: 70.695vh;
    }
    #produkte {
        float: left;
        width: 56vh;
        height: 47vh;
        margin-left: 1.782vh;
        margin-top: 1.782vh;
        background-color: rgba(0,0,0,0.2);
        border-radius: 0.46875vh;
    }
    #inputprodukte {
        width: 56vh;
        height: 44vh;
        overflow: auto;
        border-radius: 0.46875vh;
        padding-bottom: 1.5vh;
        text-align: center;
    }
    .cart {
        width: 19.695vh;
        height: 23.445vh;
        overflow: auto;
        color: #ccc;
        border-radius: 0.46875vh;

        input {
            color: grey;
        }
    }
    #warenkorb{
        float: left;
        width: 22.695vh;
        height: 47vh;
        margin-left: 1.782vh;
        margin-top: 1.782vh;
        background-color: rgba(0,0,0,0.2);
        border-radius: 0.46875vh;
        color: #ccc;
    }
    #inputwarenkorb{
        width: 19.695vh;
        height: 30.66vh;
        margin-left: 1.5vh;
        margin-top: 1.5vh;
        border-radius: 0.46875vh;
    }
    .produkt{
        float: left;
        background-color: rgba(0,0,0,0.1);
        border-radius: 0.46875vh;
        border-style: solid;
        border-color: rgba(0,0,0,0.2);
        border-width: 0.09375vh;
        margin-top: 1.5vh;
        margin-left: 1.5vh;
        width: 12vh;
        height: 12.1875vh;
    }
    .productimage{
        height: 3.9375vh;
        width: auto;
    }
    .button{
        background-color: transparent;
        background-repeat: no-repeat;
        border: none;
    }
    .button:disabled{
        opacity: 0.25;
    }
    .buyproduct{
        width: 12vh;
        height: 2.25vh;
        background: url(../../assets/shop/buyproduktlarge.png);
        background-size: cover;
        margin-left: -0.1vh;
    }
    .buybutton{
        width: 13.5945vh;
        height: 3.0945vh;
        margin-top: -0.46875vh;
        background: url(../../assets/shop/buybutton.png);
        background-size: cover;
    }
    .buybuttoncenter{
        text-align: center;
    }
    .saleout{
        color: red;
    }
    h1{
        font-family: Arial;
        font-weight: bold;
        font-size: 1.40625vh;
        color: #ccc;
        margin-top: 0.46875vh;
        margin-bottom: 0.7vh;
    }
    .shoplogotemplate{
        position: relative;
    }
    .shoplogotemplate .cancelbtn{
        background: url(../../assets/shop/shopclose.png);
        background-size: cover;
        background-color: transparent;
        background-repeat: no-repeat;
        position: absolute;
        top: 0%;
        right: 0%;
        border: none;
        width: 3.75vh;
        height: 3vh;
    }
    .itemname{
        font-family: Arial;
        font-weight: bold;
        font-size: 1.21875vh;
        width: 11.7195vh;
    }
    h4{
        font-family: Arial;
        font-weight: bold;
        font-size: 1.21875vh;
        margin-top: 0;
    }
    h3{
        margin: 0;
    }
    .itemcounter{
        font-family: Arial;
        font-weight: bold;
        font-size: 1.21875vh;
        width: 2.3445vh;
    }
    .carttable{
        margin-top: 1.5vh;
    }
    .shoplogo{
        width: 84vh;
    }
    .cancelbutton{
        width: 3.75vh;
        height: 2.907vh;
    }
    .produktlogo{
        width: 56vh;
        height: 4.125vh;
    }
    .cartlogo{
        width: 22.695vh;
        height: 4.125vh;
    }
    .deletebuttonlogo{
        width: 1.40625vh;
        height: 1.40625vh;
    }
    input[type='number'] {
        -moz-appearance:textfield;
        border-bottom-style: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}
</style>

<!-- components.Windows.show("Shop", JSON.stringify({title: 'Bla', id: '1', items: [{id: 1, name: 'Bla', price: 1500},{id: 2, name: 'Bla', price: 1500},{id: 3, name: 'Bla', price: 1500},{id: 4, name: 'Bla', price: 1500}]})) -->