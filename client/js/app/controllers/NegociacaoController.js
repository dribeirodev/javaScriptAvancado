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
      "esvazia",
      "ordena",
      "inverteOrdem"
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($("#mensagemView")),
      "text"
    );
    this._ordemAtual = "";
  }

  adiciona(e) {
    e.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.text = "Negociação adicionada com sucesso.";
    this._clearForm();
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    service
      .obterNegociacoes()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.texto = "Negociações do período importadas com sucesso";
      })
      .catch((error) => (this._mensagem.text = error));

    /* 
    // Promisse all - tranferido para negociacaoService

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then((negociacoes) => {
        console.log(negociacoes);
        negociacoes
          .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
          .forEach((negociacao) => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.text = "Negociações importadas com sucesso";
      })
      .catch((err) => (this._mensagem.text = err)); */

    /* 
    
    // Promisse async
  
    service
      .obterNegociacoesDaSemana()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.text = "Negociações importadas com sucesso";
      })
      .catch((err) => (this._mensagem.text = err));

    service
      .obterNegociacoesDaSemanaAnterior()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.text = "Negociações importadas com sucesso";
      })
      .catch((err) => (this._mensagem.text = err));

    service
      .obterNegociacoesDaSemanaRetrasada()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.text = "Negociações importadas com sucesso";
      })
      .catch((err) => (this._mensagem.text = err)); */

    /* 
    // abaixo modelo com callback

    service.obterNegociacoesDaSemana((err, negociacoes) => {
      if (err) {
        this._mensagem.text = err;
        return;
      }

      negociacoes.forEach((negociacao) =>
        this._listaNegociacoes.adiciona(negociacao)
      );
      this._mensagem.text = "Negociações importadas com sucesso";
    });

    service.obterNegociacoesDaSemanaAnterior((err, negociacoes) => {
      if (err) {
        this._mensagem.text = err;
        return;
      }

      negociacoes.forEach((negociacao) =>
        this._listaNegociacoes.adiciona(negociacao)
      );
      this._mensagem.text = "Negociações importadas com sucesso";
    });

    service.obterNegociacoesDaSemanaRetrasada((err, negociacoes) => {
      if (err) {
        this._mensagem.text = err;
        return;
      }

      negociacoes.forEach((negociacao) =>
        this._listaNegociacoes.adiciona(negociacao)
      );
      this._mensagem.text = "Negociações importadas com sucesso";
    }); */
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

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }
}
