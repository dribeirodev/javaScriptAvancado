class NegociacaoView extends View {
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
            ${model.negociacoes.map(n => `
                <tr>
                    <td>${DateHelper.dateToText(n.data)}</td>
                    <td>${n.quantidade}</td>
                    <td>${n.valor}</td>
                    <td>${n.volume}</td>
                </tr>
            `).join('')}
            </tbody>

            <tfoot>
                <td colspan='3'></td>
                <td>${
            model.negociacoes.reduce((total, n) => total + n.volume, 0.0)
            //abaixo outro modelo mais trabalhoso
            // (() => {
            //     let total = 0;
            //     model.negociacoes.forEach(n => total += n.volume);
            //     return total;
            // })()
            }</td>
            </tfoot>
        </table>
        `;
    }
}