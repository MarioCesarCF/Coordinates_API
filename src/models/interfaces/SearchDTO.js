export class SearchDTO {
    constructor(nome_fantasia, ramo_atividade, bairro, situacao, limit, skip) {
        this.nome_fantasia = nome_fantasia;
        this.ramo_atividade = ramo_atividade;
        this.bairro = bairro;
        this.situacao = situacao;
    }
}