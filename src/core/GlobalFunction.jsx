const GlobalFunction = {
    formatPrice(price, symbol = " FCFA")
    {
        return new Intl.NumberFormat('fr').format(price) + symbol;
    }
}

export default GlobalFunction