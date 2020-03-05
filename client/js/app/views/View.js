class View{
    constructor(e){
        this._element = e;
    }

    template(){
        throw new Error('O método template deve ser implementado.')
    }

    update(model){
        this._element.innerHTML = this.template(model);
    }
}