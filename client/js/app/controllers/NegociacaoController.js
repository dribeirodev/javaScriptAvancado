class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacaoView($("#negociacoesView")),
      "adiciona",
      "esvazia"
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($("#mensagemView")),
      "text"
    );
  }

  adiciona(e) {
    e.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.text = "Negociação adicionada com sucesso.";
    this._clearForm();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.text = "Negociações apagas com sucesso";
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _clearForm() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}
