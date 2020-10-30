class HttpService {
  get(url) {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      // configuracoes
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log("Obtendo as negociações do servidor");
            res(JSON.parse(xhr.responseText));
          } else {
            rej(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }

  post(url, dado) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
    });
  }
}
