class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  async obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then((periodos) => {
        let negociacoes = periodos.reduce(
          (dados, periodo) => dados.concat(periodo),
          []
        );

        return negociacoes;
      })
      .catch((erro) => {
        throw new Error(erro);
      });
  }

  async obterNegociacoesDaSemana() {
    return this._http
      .get("negociacoes/semana")
      .then((negociacoes) => {
        console.log(negociacoes);
        return negociacoes.map(
          (obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
        );
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Não foi possivel obter as negociações da semana");
      });
  }

  async obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get("negociacoes/anterior")
      .then((negociacoes) => {
        console.log(negociacoes);
        return negociacoes.map(
          (obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
        );
      })
      .catch((err) => {
        console.log(err);
        throw new Error(
          "Não foi possivel obter as negociações da semana anterior"
        );
      });
  }

  async obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get("negociacoes/retrasada")
      .then((negociacoes) => {
        console.log(negociacoes);
        return negociacoes.map(
          (obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
        );
      })
      .catch((err) => {
        console.log(err);
        throw new Error(
          "Não foi possivel obter as negociações da semana retrasada"
        );
      });
  }

  /* 
  
  //  abaixo modelo com callback

  obterNegociacoesDaSemana(cb) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "negociacoes/semana");

    // configuracoes
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log("Obtendo as negociações do servidor");
          cb(
            null,
            JSON.parse(xhr.responseText).map(
              (obj) =>
                new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
            )
          );
        } else {
          console.log(xhr.responseText);
          cb("Não foi possivel obter as negociações da semana", null);
        }
      }
    };

    xhr.send();
  }

  obterNegociacoesDaSemanaAnterior(cb) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "negociacoes/anterior");

    // configuracoes
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log("Obtendo as negociações do servidor");
          cb(
            null,
            JSON.parse(xhr.responseText).map(
              (obj) =>
                new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
            )
          );
        } else {
          console.log(xhr.responseText);
          cb("Não foi possivel obter as negociações da semana anterior", null);
        }
      }
    };

    xhr.send();
  }

  obterNegociacoesDaSemanaRetrasada(cb) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "negociacoes/retrasada");

    // configuracoes
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log("Obtendo as negociações do servidor");
          cb(
            null,
            JSON.parse(xhr.responseText).map(
              (obj) =>
                new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
            )
          );
        } else {
          console.log(xhr.responseText);
          cb("Não foi possivel obter as negociações da semana retrasada", null);
        }
      }
    };

    xhr.send();
  } */
}
